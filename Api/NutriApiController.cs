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

        [HttpGet]
        public async Task<bool> SalvaAssinatura(string image)
        {
            //var image = HttpContext.Request.Form.Files.GetFile("assinatura.png"); //Request.Pa ReadFormAsync.Content.ReadAsStringAsync().Result;
            //var image = Request.Form.ToDictionary(x => x.Key, x => x.Value.ToString());
            // string file;
            // foreach (string s in Request.Form.Keys)
            // {
            //     file = s.ToString();
            // }
            string header = "data:image/octet-stream;base64,";
            byte[] bytes = Convert.FromBase64String(image.Substring(header.Length));
            // var file = Convert.FromBase64String(Request.BodyReader.AsStream());
            // byte[] bytes = Encoding.ASCII.GetBytes(Request.BodyReader.AsStream());
            Image imagem;
            using (var ms = new MemoryStream(bytes))
            {
                await Request.Body.CopyToAsync(ms);
                imagem = Image.FromStream(ms);
            }
            imagem.Save("wwwroot/images/assinatura.png", System.Drawing.Imaging.ImageFormat.Png);
            //System.IO.File.WriteAllBytes("wwwroot/images/assinatura.png", bytes);
           
            var profissional = _db.GetDadosProfissional();
            profissional.Assinatura = "assinatura.png";

            _db.Upsert(profissional);
            return true;
        }
    }
}