using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using nutri.DTO;
using nutri.Models;
using nutri.Repositories;

namespace nutri.Api
{
    [Route("api/[controller]")]
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
            }
            _db.Upsert(paciente);
            return CreatedAtAction(nameof(Paciente), new {id = paciente.Id}, paciente);
        }
    }
}