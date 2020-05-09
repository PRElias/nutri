using System.IO;
using Microsoft.AspNetCore.Mvc;
using nutri.Models;
using nutri.Repositories;

namespace nutri.Controllers
{
    public class ConfigController : Controller
    {
        private NutriRepository _db;
        public ConfigController([FromServices] NutriRepository db)
        {
            _db = db;
        }
        public IActionResult Edit()
        {   
            var profissional = _db.GetDadosProfissional();
            return View(profissional);
        }
        
        [HttpPost]
        public IActionResult Upsert(Profissional profissional)
        {
            //if (HttpContext.Request.Form.Files.Count > 0)
            foreach (var arquivo in HttpContext.Request.Form.Files)
            {
                var assinatura = HttpContext.Request.Form.Files.GetFile("Assinatura");
                var logoEmpresa = HttpContext.Request.Form.Files.GetFile("LogoEmpresa");

                if (assinatura != null)
                {
                    nutri.Util.File.UploadFile(assinatura, assinatura.FileName);
                    profissional.Assinatura = assinatura.FileName;
                }
                else
                {
                    profissional.Assinatura = _db.GetDadosProfissional().Assinatura;
                }
                if (logoEmpresa != null)
                {
                    nutri.Util.File.UploadFile(logoEmpresa, logoEmpresa.FileName);
                    profissional.LogoEmpresa = logoEmpresa.FileName;
                }
                else
                {
                    profissional.LogoEmpresa = _db.GetDadosProfissional().LogoEmpresa;
                }
            }
            profissional.Id = 1;
            _db.Upsert(profissional);
            return RedirectToAction("Edit");
        }
    }
}
