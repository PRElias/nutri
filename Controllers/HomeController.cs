using Microsoft.AspNetCore.Mvc;

namespace nutri.Controllers
{
    public class HomeController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }

        public IActionResult CheckServer()
        {
            return StatusCode(200);
        }
    }
}
