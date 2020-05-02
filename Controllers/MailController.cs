using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using nutri.Repositories;
using nutri.Services;
using System;
using System.Threading.Tasks;

namespace nutri.Controllers
{
    [AllowAnonymous]
    public class MailController : Controller
    {
        private readonly IEmailSender _emailSender;
        public MailController(IEmailSender emailSender)
        {
            _emailSender = emailSender;
        }
        public IActionResult EnviaEmail()
        {
            return View();
        }

         public async Task SendEncomendaMail(int id, [FromServices] NutriRepository db)
        {
            var paciente = db.FindOnePaciente(id);
            string corpo = "O cardápio para o " + paciente.Nome + " Está pronto, para imprimir, clique aqui <a href='/Encomenda/ConcluiEncomenda/" + paciente.Id + "'>aqui</a> ";
            string assunto = "nutri - encomendas";
            
            try
            {
                await _emailSender.SendEmailAsync(null, assunto, corpo);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}