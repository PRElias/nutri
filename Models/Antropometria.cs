using System;
using System.Collections.Generic;
using nutri.Enums;

namespace nutri.Models
{
    public class Antropometria
    {
        public int Id {get; set;}
        public Paciente Paciente {get; set;}
        public DateTime Data {get; set;}
        public string Classificacao {get; set;}
        public decimal Gordura {get; set;}
        public decimal MassaMuscular {get; set;}
        public decimal Agua {get; set;}
        public decimal GorduraAbdominal {get; set;}
        public decimal CircunferenciaAbdominal {get; set;}
        public decimal Cintura {get; set;}
        public decimal Quadril {get; set;}
        public decimal MaiorPeso {get; set;}
        public decimal MenorPeso {get; set;}
        public string Meta {get; set;}
        public string VET {get; set;}
        public string BioImpedancias {get; set;}
        public bool IsDeleted {get; set;}
    }
}