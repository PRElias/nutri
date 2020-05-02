using LiteDB;
using nutri.Models;
using System.Linq;
using System.Collections.Generic;
using Microsoft.Extensions.Configuration;
using System;

namespace nutri.Repositories
{
    public class NutriRepository
    {
        private readonly IConfiguration _config;
        private static LiteDatabase database;

        public NutriRepository(IConfiguration config)
        {
            database = new LiteDatabase("Database.db");
            _config = config;
        }

        public IEnumerable<Paciente> FindAllPacientes()
        {
            var pacientes = database.GetCollection<Paciente>().FindAll().ToList();
            pacientes.ForEach(p => {p.Idade = calculaIdade(p.DataNascimento); p.IMC = calculaIMC(p.Peso, p.Altura);});
            return pacientes;
        }

        public Paciente FindOnePaciente(int id)
        {
            var paciente = database.GetCollection<Paciente>().Find(x => x.Id == id).FirstOrDefault();
            paciente.Idade = calculaIdade(paciente.DataNascimento);
            paciente.IMC = calculaIMC(paciente.Peso, paciente.Altura);
            //paciente.Foto = database.FileStorage.Download(paciente.FotoId)
            return paciente;
        }

        public bool DeletePaciente(int id)
        {
            var encomenda = database.GetCollection<Paciente>().Find(x => x.Id == id).FirstOrDefault();
            encomenda.IsDeleted = true;
            return Upsert(encomenda);
        }

        public bool Upsert(Paciente paciente)
        {
            return database.GetCollection<Paciente>().Upsert(paciente);
        }

        private int calculaIdade(DateTime dtNascimento)
        {
            int idade = DateTime.Now.Year - dtNascimento.Year;
            if (DateTime.Now.Month < dtNascimento.Month || (DateTime.Now.Month == dtNascimento.Month && DateTime.Now.Day < dtNascimento.Day))
                idade--;

            return idade;
        }

        private decimal calculaIMC(decimal peso, decimal altura)
        {
            var imc = new decimal();
            if (peso > 0 && altura > 0)
            {
                imc = peso / (altura * altura);
            }
            else
            {
                imc = 0;    
            }
            
            return imc;
        }

        public IEnumerable<AtendimentoNutricional> FindForAllPacients()
        {
            var atendimentos = database.GetCollection<AtendimentoNutricional>().FindAll().ToList();
            return atendimentos;
        }

        public IEnumerable<AtendimentoNutricional> FindForPacient(int id)
        {
            var atendimentos = database.GetCollection<AtendimentoNutricional>().Find(a => a.Paciente.Id == id).ToList();
            return atendimentos;
        }

        public AtendimentoNutricional FindOneAtendimento(int id)
        {
            var atendimento = database.GetCollection<AtendimentoNutricional>().Find(a => a.Id == id).FirstOrDefault();
            return atendimento;
        }

        public bool DeleteAtendimento(int id)
        {
            var atendimento = database.GetCollection<AtendimentoNutricional>().Find(a => a.Id == id).FirstOrDefault();
            atendimento.IsDeleted = true;
            return Upsert(atendimento);
        }

        public bool Upsert(AtendimentoNutricional atendimento)
        {
            return database.GetCollection<AtendimentoNutricional>().Upsert(atendimento);
        }
    }
}
