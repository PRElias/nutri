using System;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Routing;
using nutri.Models;
using nutri.Repositories;

namespace nutri.Components
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
            return View(_db.FindAtendimentoForAllPacients().Where(e => e.IsDeleted == false));
        }

        public IActionResult Create(int id)
        {
            ViewBag.Paciente = _db.FindOnePaciente(id);
            ViewBag.Profissional = _db.GetDadosProfissional();
            return View();
        }

        public IActionResult Upsert(AtendimentoNutricional atendimento)
        {
            int idPaciente = Convert.ToInt32(TempData["PacienteId"]);
            atendimento.Paciente = _db.FindOnePaciente(idPaciente);
            _db.Upsert(atendimento);
            var routeValues = new RouteValueDictionary();
            routeValues.Add("id", idPaciente);
            return RedirectToAction("Details", "Paciente", routeValues);
        }

        public IActionResult Details(int id)
        {
            var Profissional = _db.GetDadosProfissional();
            ViewBag.Profissional = Profissional.Nome;
            ViewBag.LogoEmpresa = Profissional.LogoEmpresa;
            ViewBag.Assinatura = Profissional.Assinatura;
            var atendimento = _db.FindOneAtendimento(id);
            ViewBag.Paciente = _db.FindOnePaciente(atendimento.Paciente.Id);
            return View(atendimento);
        }
        public IActionResult Edit(int id)
        {
            ViewBag.Profissional = _db.GetDadosProfissional().Nome;
            var atendimento = _db.FindOneAtendimento(id);
            ViewBag.Paciente = _db.FindOnePaciente(atendimento.Paciente.Id);
            return View(atendimento);
        }
        [HttpDelete]
        public IActionResult Delete(int id)
        {
            var resultado = _db.DeleteAtendimento(id);
            return new JsonResult(resultado);
        }
    }
}
