using System;
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
        private NutriRepository _db;

        public AtendimentoNutricionalController([FromServices] NutriRepository db)
        {
            _db = db;
        }
        public IActionResult Index()
        {
            return View(_db.FindForAllPacients().Where(e => e.IsDeleted == false));
        }

        public IActionResult Paciente(int id)
        {
            ViewBag.Paciente = _db.FindOnePaciente(id);
            return View(_db.FindForPacient(id));
        }

        public IActionResult Create(int id)
        {
            ViewBag.Antecedentes = Enum.GetValues(typeof(Antecedentes));
            ViewBag.Paciente = _db.FindOnePaciente(id);
            return View();
        }

        public IActionResult Upsert(AtendimentoNutricional atendimento)
        {
            int idPaciente = Convert.ToInt32(TempData["PacienteId"]);
            atendimento.Paciente = _db.FindOnePaciente(idPaciente);
            _db.Upsert(atendimento);
            var routeValues = new RouteValueDictionary();
            routeValues.Add("id", idPaciente);
            return RedirectToAction("Paciente", "AtendimentoNutricional", routeValues);
        }

        public IActionResult Details(int id)
        {
            ViewBag.Profissional = _db.GetDadosProfissional().Nome;
            ViewBag.Antecedentes = Enum.GetValues(typeof(Antecedentes));
            var atendimento = _db.FindOneAtendimento(id);
            ViewBag.Paciente = _db.FindOnePaciente(atendimento.Paciente.Id);
            return View(atendimento);
        }
    }
}
