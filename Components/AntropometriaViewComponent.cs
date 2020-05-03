using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using nutri.Repositories;

namespace nutri.Components
{
    public class AntropometriaViewComponent : ViewComponent
    {
        private NutriRepository _db;

        public AntropometriaViewComponent([FromServices] NutriRepository db)
        {
            _db = db;
        }
        public Task<IViewComponentResult> InvokeAsync(int id)
        {
            ViewBag.PacienteId = id;
            return Task.FromResult<IViewComponentResult>(View(_db.FindAntropometriaForPacient(id).Where(p => p.IsDeleted == false)));
        }

    }
}
