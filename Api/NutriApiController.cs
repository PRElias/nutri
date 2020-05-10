using System;
using System.IO;
using System.Threading.Tasks;
using System.Drawing;
using Microsoft.AspNetCore.Mvc;
using nutri.DTO;
using nutri.Models;
using nutri.Repositories;
using Microsoft.AspNetCore.Http;
using System.Text;
using System.Collections.Generic;
using System.Linq;

namespace nutri.Api
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class NutriApiController : Controller
    {
        private NutriRepository _db;
        public NutriApiController([FromServices] NutriRepository db)
        {
            _db = db;
        }    
        [HttpPost]
        public async Task<ActionResult<Paciente>> ImportaPaciente(PacienteDTO pacienteDTO)
        {
            //return Task.FromResult<IViewComponentResult>(View(_db.FindAntropometriaForPacient(id).Where(p => p.IsDeleted == false)));
            //var paciente = Task.FromResult<ActionResult<Paciente>>(_db.FindPacienteByName(pacienteDTO.Nome));
            var paciente = _db.FindPacienteByName(pacienteDTO.Nome);
            if (paciente == null)
            {
                paciente = new Paciente();
                paciente.Nome = pacienteDTO.Nome;
                paciente.Idade = pacienteDTO.Idade;
                paciente.Altura = pacienteDTO.Altura;
                paciente.Sexo = pacienteDTO.Sexo;
                paciente.IsDeleted = false;
            }
            else
            {
                paciente.IsDeleted = false;
            }
            _db.Upsert(paciente);
            return CreatedAtAction(nameof(Paciente), new {id = paciente.Id}, paciente);
        }

        [HttpPost]
        public async Task<IActionResult> SalvaAssinatura()
        {
            var image = HttpContext.Request.Form.Files.GetFile("assinatura"); 
            string filename = "assinatura" + Guid.NewGuid() + ".png";
            nutri.Util.File.UploadFile(image, filename);
            var profissional = _db.GetDadosProfissional();
            profissional.Assinatura = filename;
            _db.Upsert(profissional);
            return StatusCode(200);
        }

        public async Task<IActionResult> GetPacientes()
        {
            return Json(_db.FindAllPacientes().Where(e => e.IsDeleted == false));
        }

        public async Task<IActionResult> CheckServer()
        {
            return StatusCode(200);
        }
    }
}