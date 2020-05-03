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
        #region Construtor
        private readonly IConfiguration _config;
        private static LiteDatabase database;

        public NutriRepository(IConfiguration config)
        {
            database = new LiteDatabase("Database.db");
            _config = config;
        }
        #endregion

        //Pacientes///////////////////////////////////////////
        #region Pacientes
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
        #endregion

        //Atendimento Nutricional //////////////////////////////////////
        #region AtendimentoNutricional
        public IEnumerable<AtendimentoNutricional> FindAtendimentoForAllPacients()
        {
            var atendimentos = database.GetCollection<AtendimentoNutricional>().FindAll().ToList();
            return atendimentos;
        }

        public IEnumerable<AtendimentoNutricional> FindAtendimentoForPacient(int id)
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
        #endregion

        //Antropometria
        #region Antropometria
        public IEnumerable<Antropometria> FindAntropometriaForAllPacients()
        {
            var antropometria = database.GetCollection<Antropometria>().FindAll().ToList();
            return antropometria;
        }

        public IEnumerable<Antropometria> FindAntropometriaForPacient(int id)
        {
            var antropometria = database.GetCollection<Antropometria>().Find(a => a.Paciente.Id == id).ToList();
            return antropometria;
        }

        public Antropometria FindOnentropometria(int id)
        {
            var antropometria = database.GetCollection<Antropometria>().Find(a => a.Id == id).FirstOrDefault();
            return antropometria;
        }

        public bool DeleteAntropometria(int id)
        {
            var antropometria = database.GetCollection<Antropometria>().Find(a => a.Id == id).FirstOrDefault();
            antropometria.IsDeleted = true;
            return Upsert(antropometria);
        }

        public bool Upsert(Antropometria antropometria)
        {
            return database.GetCollection<Antropometria>().Upsert(antropometria);
        }
        #endregion

        //Dados Profissionais ////////////////////////////////////////////////////
        #region Profissional
        public Profissional GetDadosProfissional() 
        {
            var teste = database.GetCollection<Profissional>().FindAll().ToList();
            if (teste.Count == 0)
            {
                Profissional profissional = new Profissional();
                profissional.Id = 1;
                profissional.Nome = "Configure o nome";
                profissional.CRN = "Configure o CRN";
                database.GetCollection<Profissional>().Upsert(profissional);
            }
            return database.GetCollection<Profissional>().Find(x => x.Id == 1).FirstOrDefault();;
        }

        public bool Upsert(Profissional profissional)
        {
            profissional.Id = 1;
            return database.GetCollection<Profissional>().Upsert(profissional);
        }
        #endregion
    }
}
