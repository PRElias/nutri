if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/nutri/service-worker.js')
            .then((reg) => {
                console.log('Service worker registered.', reg);
            });
    });
}

function addToHomeScreen() {
    // show the install app prompt
    window.promptEvent.prompt();

    // handle the Decline/Accept choice of the user
    window.promptEvent.userChoice.then(function (choiceResult) {
        // hide the prompt banner here
        // …

        if (choiceResult.outcome === 'accepted') {
            console.info('mm User accepted the A2HS prompt');
        } else {
            console.info('mm User dismissed the A2HS prompt');
        }

        window.promptEvent = null;
    });

}

function limpa() {
    $('form').get(0).reset();
};

function calculaIMC(){
    if ($("#IMC").val() === "")
    {
        $("#IMC").val(($("#Peso").val() / ($("#Altura").val() * $("#Altura").val())));
    }
};

function calculaPesoIdeal() {
    //https://brasilescola.uol.com.br/matematica/peso-ideal.htm
    //formula de Lorentz
    var pesoIdeal = 0.0;
    var altura = $("#Altura").unmask().val();
    pesoIdeal = altura - 100 - ((altura - 150) / 4);
    $("#PesoIdeal").val(pesoIdeal);
};

function calcula() {
    calculaIMC();
    calculaPesoIdeal();
    salvaCache();
};

function salvaCache() {
    var paciente = {
        Nome: $("#Nome").val(), 
        Idade: $("#Idade").val(), 
        Peso: $("#Peso").val(), 
        Altura: $("#Altura").val(),
        Sexo: $("#Sexo").val()
    };
    localStorage.setItem(paciente.Nome, JSON.stringify(paciente));
    //$('form').get(0).reset();
    //formReset();
};

//Utilizada essa função por não ser um form HTML real, já que assim ele apagaria ao submeter
// function formReset(){
//     $(':input','#form')
//     .not(':button, :submit, :reset, :hidden')
//     .val('')
//     .removeAttr('checked')
//     .removeAttr('selected');
// }

function sincroniza() {
    debugger
    for (var i = 0; i < localStorage.length; i++){

        var paciente = localStorage.getItem(localStorage.key(i));

        $.ajax({
            method: "POST",
            url: "../api/NutriApi/",
            contentType: "application/json",
            dataType: "json",
            data: paciente
        }).done(function(){
            localStorage.removeItem(localStorage.key(i));
        }).fail(function(){
            alert("Erro ao sincronizar. Você está no mesmo WiFi do sistema?");
        });
    }
};


$(document).ready(function () {
    $("#Altura").mask("0.00");

    $("form").submit(function(event){
        event.preventDefault()
    });
});