using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Routing;
using nutri.Enums;
using nutri.Models;
using nutri.Repositories;

namespace nutri.Controllers
{
    public class AtendimentoNutricionalController : Controller
    {
        public IActionResult Index([FromServices] NutriRepository db)
        {
            return View(db.FindForAllPacients().Where(e => e.IsDeleted == false));
        }

        public IActionResult Paciente(int id, [FromServices] NutriRepository db)
        {
            ViewBag.Paciente = db.FindOnePaciente(id);
            return View(db.FindForPacient(id));
        }

        public IActionResult Create(int id, [FromServices] NutriRepository db)
        {
            ViewBag.Antecedentes = Enum.GetValues(typeof(Antecedentes));
            ViewBag.Paciente = db.FindOnePaciente(id);
            return View();
        }

        public IActionResult Upsert(AtendimentoNutricional atendimento, [FromServices] NutriRepository db)
        {
            int idPaciente = Convert.ToInt32(TempData["PacienteId"]);
            atendimento.Paciente = db.FindOnePaciente(idPaciente);
            db.Upsert(atendimento);
            var routeValues = new RouteValueDictionary();
            routeValues.Add("id", idPaciente);
            return RedirectToAction("Paciente", "AtendimentoNutricional", routeValues);
        }

        public IActionResult Details(int id, [FromServices] NutriRepository db)
        {
            ViewBag.Antecedentes = Enum.GetValues(typeof(Antecedentes));
            var atendimento = db.FindOneAtendimento(id);
            ViewBag.Paciente = db.FindOnePaciente(atendimento.Paciente.Id);
            return View(atendimento);
        }
    }
}
