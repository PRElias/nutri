using System;
using System.ComponentModel;

namespace nutri.Enums
{
    [Flags]
    public enum Antecedentes {
        Diabetes = 1,
        [Description("Hipertensão")]
        Hipertensao = 2,
        Hipertrigliciridemia = 3,
        Hipercolesterolemia = 4,
        Hipotireoidismo = 5,
        [Description("Esteatose hepática")]
        EsteatoseHepatica = 6
    }
}