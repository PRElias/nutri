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
    salvaCache();
    getPacientes();
}

$(document).ready(function () {
    $("#Altura").mask("0.00");
    // $("#inp_ip").mask("http://000.000.0.00");

    $("form").submit(function (event) {
        event.preventDefault();
    });

    getPacientes();
});

function getPacientes() {
    let select = document.getElementById("pacienteSelect");
    
    if (localStorage.length == 0) {
        $(".pacienteDiv").hide();
    }
    else {
        for (var i = 0; i < localStorage.length; i++) {
            var paciente = JSON.parse(localStorage.getItem(localStorage.key(i)));
            let encontrado = 0;
            
            for (var opt = 0; opt < select.childNodes.length; opt++) {
                if (select.childNodes[opt].value == paciente.Nome) {
                    encontrado++;
                }
            }
            if (encontrado == 0) {
                let opt = document.createElement('option');
                opt.appendChild(document.createTextNode(paciente.Nome));
                opt.value = paciente.Nome;
                select.appendChild(opt);
            }
        }
        // while (select.childNodes.length > 1) {
        //     // select.removeChild(select.lastChild);
        // }
    }
}

function pacienteSelecionado() {

    let selecionado = document.getElementById("pacienteSelect").value;
    let paciente = JSON.parse(localStorage.getItem(selecionado));
    $("#Nome").val(paciente.Nome);
    $("#Idade").val(paciente.Idade);
    $("#Peso").val(paciente.Peso);
    $("#Altura").val(paciente.Altura);
    $("#Sexo").val(paciente.Sexo);
    calcula();
}

function salvaCache() {
    var paciente = {
        Nome: $("#Nome").val(),
        Idade: $("#Idade").val(),
        Peso: $("#Peso").val(),
        Altura: $("#Altura").val(),
        Sexo: $("#Sexo").val()
    };
    localStorage.setItem(paciente.Nome, JSON.stringify(paciente));
    //window.location.reload();
}