using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.IO;
using System.Linq;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using nutri.Models;
using nutri.Repositories;

namespace nutri.Controllers
{
    public class PacienteController : Controller
    {
        private NutriRepository _db;

        public PacienteController([FromServices] NutriRepository db)
        {
            _db = db;
        }
        public IActionResult Index()
        {
            return View(_db.FindAllPacientes().Where(e => e.IsDeleted == false));
        }

        public IActionResult Create()
        {
            return View();
        }

        [HttpPost, ValidateAntiForgeryToken]
        public IActionResult Upsert(Paciente paciente)
        {
            if (paciente.Id == 0)
            {
                paciente.DataCriacao = DateTime.Now;
            }
            
            _db.Upsert(paciente);
            
            if (HttpContext.Request.Form.Files.Count > 0)
            {
                var fileName = paciente.Id.ToString() + Path.GetExtension(HttpContext.Request.Form.Files[0].FileName);
                nutri.Util.File.UploadFile(HttpContext.Request.Form.Files[0], fileName);
                paciente.Foto = fileName;
                _db.Upsert(paciente);
            }
            return RedirectToAction("Index");
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }

        public IActionResult Edit(int id)
        {
            Paciente paciente = _db.FindOnePaciente(id);
            return View(paciente);
        }

        public IActionResult Details(int id)
        {
            Paciente paciente = _db.FindOnePaciente(id);
            return View(paciente);
        }

        [HttpDelete]
        public IActionResult Delete(int id)
        {
            var resultado = _db.DeletePaciente(id);
            return new JsonResult(resultado);
        }
    }
}
