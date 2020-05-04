using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using nutri.Repositories;

namespace nutri.Components
{
    public class HabitosViewComponent : ViewComponent
    {
        private NutriRepository _db;

        public HabitosViewComponent([FromServices] NutriRepository db)
        {
            _db = db;
        }
        public Task<IViewComponentResult> InvokeAsync(int id)
        {
            ViewBag.PacienteId = id;
            return Task.FromResult<IViewComponentResult>(View(_db.FindHabitosForPacient(id).Where(p => p.IsDeleted == false)));
        }

    }
}
