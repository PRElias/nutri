using System;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Routing;
using nutri.Models;
using nutri.Repositories;

namespace nutri.Controllers
{
    public class AntropometriaController : Controller
    {
        private NutriRepository _db;

        public AntropometriaController([FromServices] NutriRepository db)
        {
            _db = db;
        }
        public IActionResult Index()
        {
            return View(_db.FindAntropometriaForAllPacients().Where(e => e.IsDeleted == false));
        }

        public IActionResult Create(int id)
        {
            ViewBag.Paciente = _db.FindOnePaciente(id);
            return View();
        }

        public IActionResult Upsert(Antropometria antropometria)
        {
            int idPaciente = Convert.ToInt32(TempData["PacienteId"]);
            antropometria.Paciente = _db.FindOnePaciente(idPaciente);
            _db.Upsert(antropometria);
            var routeValues = new RouteValueDictionary();
            routeValues.Add("id", idPaciente);
            return RedirectToAction("Details", "Paciente", routeValues);
        }

        public IActionResult Details(int id)
        {
            var profissional = _db.GetDadosProfissional();
            ViewBag.Profissional = profissional.Nome;
            ViewBag.Assinatura = profissional.Assinatura;
            ViewBag.LogoEmpresa = profissional.LogoEmpresa;
            var atendimento = _db.FindOneAntropometria(id);
            ViewBag.Paciente = _db.FindOnePaciente(atendimento.Paciente.Id);
            return View(atendimento);
        }

        public IActionResult Edit(int id)
        {
            ViewBag.Profissional = _db.GetDadosProfissional().Nome;
            var atendimento = _db.FindOneAntropometria(id);
            ViewBag.Paciente = _db.FindOnePaciente(atendimento.Paciente.Id);
            return View(atendimento);
        }
        [HttpDelete]
        public IActionResult Delete(int id)
        {
            var resultado = _db.DeleteAntropometria(id);
            return new JsonResult(resultado);
        }
    }
}
