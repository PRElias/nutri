using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using nutri.Enums;

namespace nutri.Models
{
    public class Habitos
    {
        public int Id {get; set;}
        public Paciente Paciente {get; set;}
        public bool IsDeleted {get; set;}
        public DateTime Data {get; set;}
        public bool FazAtividadeFisica {get; set;}
        public IEnumerable<AtividadeFisica> AtividadeFisica {get; set;}
        public string LocalHorarioUltimaRefeicao {get; set;}  
        public string HorarioTrabalhoEscolaFaculdade {get; set;}
        public bool SonoBom {get; set;}
        public string AcordaAs {get; set;}
        public string DormeAs {get; set;}
        public bool Fumante {get; set;}
        public bool ConsomeBebida {get; set;}
        public string BebidaQuais {get; set;}
        public string BebidaFrequencia {get; set;}
        public string BebidaQuantidade {get; set;}
        public bool ConsomeCafe {get; set;}
        public FormaDoce FormaDoce {get; set;}
        public string CafeQuantidade {get; set;}
        public string IngestaoHidrica {get; set;}
        public string HabitoUrinario {get; set;}
        public string LocalPrincipaisRefeicoes {get; set;}
        public string NrPessoasNaCasa {get; set;}
        public string QuemCozinha {get; set;}
        public string QuemCompra {get; set;}
        public Apetite Apetite {get; set;}
        public Mastigacao Mastigacao {get; set;}
        public HabitoIntestinal HabitoIntestinal {get; set;}
        public int FrequenciaEvacuacaoDia {get; set;}
        public int FrequenciaEvacuacaoSemana {get; set;}
        public string BristolConsistencia {get; set;}
        public string BristolFormato {get; set;}
        public string BristolCor {get; set;}
        public Intensidade TPM {get; set;}
        public string Anticoncepcional {get; set;}
        public bool Menopausa {get; set;}
        public string ReposicaoHormonal {get; set;}
        public string FinaisDeSemana {get; set;}
        public string IntoleranciaAlimentar {get; set;}
        public ResticaoAlimentar ResticaoAlimentar {get; set;}
        public string Temperos {get; set;}
        public string Adocantes {get; set;}
    }
}