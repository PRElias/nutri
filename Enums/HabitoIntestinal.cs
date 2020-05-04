using System.ComponentModel.DataAnnotations;

namespace nutri.Enums
{
    public enum HabitoIntestinal {
        [Display(Name="Normal")]
        Normal = 0,
        [Display(Name="Diarréico")]
        Diarreico = 1,
        [Display(Name="Constipante")]
        Constipante = 2,
        [Display(Name="Variado")]
        Variado = 3
    }
}