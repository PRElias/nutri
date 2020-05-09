using System;
using System.Collections.Generic;
using nutri.Enums;

namespace nutri.Models
{
    public class Paciente
    {
        public int Id { get; set; }
        public string Codigo {get; set;}
        public string Nome { get; set; }
        public DateTime DataCriacao { get; set; }
        public DateTime DataNascimento { get; set; }
        public int? Idade { get; set; }
        public decimal? IMC {get; set;}
        public decimal Altura { get; set; }
        public decimal Peso { get; set; }
        public string Telefone { get; set; }
        public string Celular { get; set; }
        public string Foto {get; set;}
        public Status Status { get; set; }
        public string Sexo {get; set;}
        public bool IsDeleted { get; set; }
    }
}