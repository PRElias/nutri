using System.ComponentModel.DataAnnotations;

namespace nutri.Enums
{
    public enum Apetite {
        [Display(Name="Normal")]
        Normal = 0,
        [Display(Name="Aumentado")]
        Aumentado = 1,
        [Display(Name="Diminuído")]
        Diminuido = 2,
    }
}