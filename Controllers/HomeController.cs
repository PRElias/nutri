using Microsoft.AspNetCore.Mvc;

namespace nutri.Controllers
{
    public class HomeController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
