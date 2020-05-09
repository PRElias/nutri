const online;

function checkServer() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status != 200) {
            window.location.replace("https://localhost:5000/Calculos");
            online = false;
        }
        else {
            online = true;
        }
    };
    xhttp.open("GET", "../../Home/CheckServer/", true);
    xhttp.send();
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
    if (!online || online === undefined) {
        checkServer();
        var elsToHide = document.getElementsByClassName("only-online");
        console.table(elsToHide);
        for(var i = 0; i < elsToHide.length; i++){
            elsToHide[i].style.display = "none";
        }
    }
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
            url: "../Calculos/ImportaPaciente/",
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