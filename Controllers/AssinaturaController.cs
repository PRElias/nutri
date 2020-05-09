using System;
using Microsoft.AspNetCore.Mvc;
using nutri.Repositories;

namespace nutri.Controllers
{
    public class AssinaturaController : Controller
    {
        private NutriRepository _db;

        public AssinaturaController([FromServices] NutriRepository db)
        {
            _db = db;
        }
        public IActionResult Index()
        {
            return View();
        }

        [HttpPost]
        public IActionResult SalvaAssinatura()
        {
            var image = HttpContext.Request.Form.Files.GetFile("assinatura"); 
            string filename = "assinatura" + Guid.NewGuid() + ".png";
            nutri.Util.File.UploadFile(image, filename);
            var profissional = _db.GetDadosProfissional();
            profissional.Assinatura = filename;
            _db.Upsert(profissional);
            return StatusCode(200);
        }
    }
}