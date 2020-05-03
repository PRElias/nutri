using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using nutri.Repositories;

namespace nutri.Controllers
{
    public class AtendimentosViewComponent : ViewComponent
    {
        private NutriRepository _db;

        public AtendimentosViewComponent([FromServices] NutriRepository db)
        {
            _db = db;
        }
        public Task<IViewComponentResult> InvokeAsync(int id)
        {
            ViewBag.PacienteId = id;
            return Task.FromResult<IViewComponentResult>(View(_db.FindAtendimentoForPacient(id)));
        }

    }
}
