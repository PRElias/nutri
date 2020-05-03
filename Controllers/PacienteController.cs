﻿using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
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
                UploadFile(HttpContext.Request.Form.Files[0], fileName);
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

        

        private bool UploadFile(IFormFile ufile, string fileName)
        {
            if (ufile != null && ufile.Length > 0)
            {
                var filePath = Path.Combine(Directory.GetCurrentDirectory(), @"wwwroot\images", fileName);
                using (var fileStream = new FileStream(filePath, FileMode.Create))
                {
                    ufile.CopyTo(fileStream);
                }
                return true;
            }
            return false;
        }
    }

    public class AtendimentosViewComponent : ViewComponent
    {
        private NutriRepository _db;

        public AtendimentosViewComponent([FromServices] NutriRepository db)
        {
            _db = db;
        }
        public Task<IViewComponentResult> InvokeAsync(int id)
        {
            ViewBag.PacienteId = id;
            return Task.FromResult<IViewComponentResult>(View(_db.FindAtendimentoForPacient(id)));
        }

    }
}