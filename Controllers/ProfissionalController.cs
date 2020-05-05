using System.IO;
using Microsoft.AspNetCore.Mvc;
using nutri.Models;
using nutri.Repositories;

namespace nutri.Controllers
{
    public class ProfissionalController : Controller
    {
        private NutriRepository _db;
        public ProfissionalController([FromServices] NutriRepository db)
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
            if (HttpContext.Request.Form.Files.Count > 0)
            {
                var logoParticular = HttpContext.Request.Form.Files.GetFile("LogoParticular");
                var logoEmpresa = HttpContext.Request.Form.Files.GetFile("LogoEmpresa");

                if (logoParticular != null)
                {
                    nutri.Util.File.UploadFile(logoParticular, logoParticular.FileName);
                    profissional.LogoParticular = logoParticular.FileName;
                }
                if (logoEmpresa != null)
                {
                    nutri.Util.File.UploadFile(logoEmpresa, logoEmpresa.FileName);
                    profissional.LogoEmpresa = logoEmpresa.FileName;
                }
            }
            
            _db.Upsert(profissional);
            return RedirectToAction("Edit");
        }
    }
}
