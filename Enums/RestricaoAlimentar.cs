using System.ComponentModel.DataAnnotations;

namespace nutri.Enums
{
    public enum ResticaoAlimentar {
        [Display(Name="Vegetarianismo")]
        Vegetarianismo = 0,
        [Display(Name="Veganismo")]
        Veganismo = 1,
        [Display(Name="Ovolactovegetariano")]
        Ovolactovegetariano = 2,
    }
}