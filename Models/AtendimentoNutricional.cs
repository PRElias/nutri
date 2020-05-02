using System;
using System.Collections.Generic;
using nutri.Enums;

namespace nutri.Models
{
    public class AtendimentoNutricional
    {
        public int Id {get; set;}
        public Paciente Paciente {get; set;}
        public string EncaminhadoPor {get; set;}
        public string CID {get; set;}
        public string MotivoConduta {get; set;}
        public string HistoriaClinica {get; set;}
        public Antecedentes Antecedentes {get; set;}
        public string Medicamentos {get; set;}
        public DateTime Data {get; set;}
        public string Hemograma {get; set;}
        public string ColeterolTotal {get; set;}
        public string ColesteolHDL {get; set;}
        public string NaoHDL {get; set;}
        public string ColesterolLDL {get; set;}
        public string VLDL {get; set;}
        public string Trigicerides {get; set;}
        public string Glicemia {get; set;}
        public string HemoglobinaGlicada {get; set;}
        public string Ureia {get; set;}
        public string Creatinina {get; set;}
        public string TGO {get; set;}
        public string TGP {get; set;}
        public bool IsDeleted {get; set;}
    }
}