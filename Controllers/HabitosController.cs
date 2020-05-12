using System;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Routing;
using nutri.Models;
using nutri.Repositories;

namespace nutri.Controllers
{
    public class HabitosController : Controller
    {
        private NutriRepository _db;

        public HabitosController([FromServices] NutriRepository db)
        {
            _db = db;
        }
        public IActionResult Create(int id)
        {
            ViewBag.Paciente = _db.FindOnePaciente(id);
            return View();
        }

        public IActionResult Upsert(Habitos habitos)
        {
            int idPaciente = Convert.ToInt32(TempData["PacienteId"]);
            habitos.Paciente = _db.FindOnePaciente(idPaciente);
            _db.Upsert(habitos);
            var routeValues = new RouteValueDictionary();
            routeValues.Add("id", idPaciente);
            return RedirectToAction("Details", "Paciente", routeValues);
        }

        public IActionResult Details(int id)
        {
            var profissional = _db.GetDadosProfissional();
            ViewBag.Profissional = profissional.Nome;
            ViewBag.LogoEmpresa = profissional.LogoEmpresa;
            ViewBag.Assinatura = profissional.Assinatura;
            var habitos = _db.FindOneHabitos(id);
            ViewBag.Paciente = _db.FindOnePaciente(habitos.Paciente.Id);
            return View(habitos);
        }

        public IActionResult Edit(int id)
        {
            ViewBag.Profissional = _db.GetDadosProfissional().Nome;
            var habitos = _db.FindOneHabitos(id);
            ViewBag.Paciente = _db.FindOnePaciente(habitos.Paciente.Id);
            return View(habitos);
        }
        [HttpDelete]
        public IActionResult Delete(int id)
        {
            var resultado = _db.DeleteHabitos(id);
            return new JsonResult(resultado);
        }
    }
}
