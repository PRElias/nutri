using System.ComponentModel.DataAnnotations;

namespace nutri.Enums
{
    public enum Mastigacao {
        [Display(Name="Normal")]
        Normal = 0,
        [Display(Name="Rápida")]
        Rapida = 1,
        [Display(Name="Lenta")]
        Lenta = 2,
    }
}