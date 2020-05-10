var online, pacientes;

function getPacientes() {
    $.ajax({
        method: "GET",
        url: "https://" + serverIp + ":5000/api/NutriApi/GetPacientes/",
        contentType: "application/json",
        dataType: "json"
    }).done(function (data) {
        console.table(data);
        
        var _pacienteSelect = document.getElementById("pacienteSelect");

        $.each(pacientes, function(key, value) 
        {
            _pacienteSelect.append('<option value=' + key + '>' + value + '</option>');
        });

    }).fail(function (error) {
        console.log("Erro: " + error);
    });
}

function limpa() {
    $('form').get(0).reset();
}

function calculaIMC() {
    if ($("#IMC").val() === "") {
        $("#IMC").val(($("#Peso").val() / ($("#Altura").val() * $("#Altura").val())));
    }
}

function calculaPesoIdeal() {
    //https://brasilescola.uol.com.br/matematica/peso-ideal.htm
    //formula de Lorentz
    var pesoIdeal = 0.0;
    var altura = $("#Altura").unmask().val();
    pesoIdeal = altura - 100 - ((altura - 150) / 4);
    $("#PesoIdeal").val(pesoIdeal);
}

function calcula() {
    calculaIMC();
    calculaPesoIdeal();
}

$(document).ready(function () {
    $("#Altura").mask("0.00");
    // $("#inp_ip").mask("http://000.000.0.00");

    $("form").submit(function (event) {
        event.preventDefault();
    });

    // checkServer();
    getPacientes();
});

function salvaCache() {
    var paciente = {
        Nome: $("#Nome").val(),
        Idade: $("#Idade").val(),
        Peso: $("#Peso").val(),
        Altura: $("#Altura").val(),
        Sexo: $("#Sexo").val()
    };
    localStorage.setItem(paciente.Nome, JSON.stringify(paciente));
    $('form').get(0).reset();
}

function sincroniza() {
    for (var i = 0; i < localStorage.length; i++) {

        var paciente = localStorage.getItem(localStorage.key(i));

        $.ajax({
            method: "POST",
            url: "https://" + serverIp + ":5000/api/NutriApi/ImportaPaciente/",
            contentType: "application/json",
            dataType: "json",
            data: paciente
        }).done(function () {
            localStorage.removeItem(localStorage.key(i));
        }).fail(function () {
            alert("Erro ao sincronizar. Você está no mesmo WiFi do sistema?");
        });
    }
}