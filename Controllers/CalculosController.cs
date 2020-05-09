using Microsoft.AspNetCore.Mvc;
using nutri.DTO;
using nutri.Models;
using nutri.Repositories;

namespace nutri.Controllers
{
    public class CalculosController : Controller
    {
        private NutriRepository _db;
        public CalculosController([FromServices] NutriRepository db)
        {
            _db = db;
        }
        public IActionResult Index()
        {
            return View();
        }

        [HttpPost]
        public IActionResult ImportaPaciente(PacienteDTO pacienteDTO)
        {
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

    }
}