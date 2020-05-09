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
            nutri.Util.File.UploadFile(image, "assinatura.png");
            var profissional = _db.GetDadosProfissional();
            profissional.Assinatura = "assinatura.png";
            _db.Upsert(profissional);
            return null;
        }
    }
}