using System.ComponentModel.DataAnnotations;

namespace nutri.Enums
{
    public enum Intensidade {
        [Display(Name="Forte")]
        Forte = 0,
        [Display(Name="Média")]
        Media = 1,
        [Display(Name="Fraca")]
        Fraca = 2,
    }
}