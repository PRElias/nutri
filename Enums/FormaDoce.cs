using System.ComponentModel.DataAnnotations;

namespace nutri.Enums
{
    public enum FormaDoce {
        [Display(Name="Adoçado")]
        Adocado = 0,
        [Display(Name="Não adoçado")]
        NaoAdocado = 1,
        [Display(Name="Adoçante")]
        Adocante = 2,
    }
}