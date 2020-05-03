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
            _db.Upsert(profissional);
            return RedirectToAction("Edit");
        }
    }
}
