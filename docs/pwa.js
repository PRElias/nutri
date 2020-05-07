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


function calcula() {
    $("#IMC").val(($("#Peso").val() / ($("#Altura").val() * $("#Altura").val())));
};

function salvaCache() {
    var paciente = {
        Nome: $("#Nome").val(), 
        Idade: $("#Idade").val(), 
        Peso: $("#Peso").val(), 
        Altura: $("#Altura").val()
    };
    localStorage.setItem(paciente.Nome, JSON.stringify(paciente));
    //$('#form').get(0).reset();
    formReset();
};

//Utilizada essa função por não ser um form HTML real, já que assim ele apagaria ao submeter
function formReset(){
    $(':input','#form')
    .not(':button, :submit, :reset, :hidden')
    .val('')
    .removeAttr('checked')
    .removeAttr('selected');

    $(':input','#calculados')
    .not(':button, :submit, :reset, :hidden')
    .val('')
    .removeAttr('checked')
    .removeAttr('selected');
}

function sincroniza() {
    debugger
    for (var i = 0; i < localStorage.length; i++){

        localStorage.getItem(localStorage.key(i));

        localStorage.removeItem(localStorage.key(i));
    }
};


$(document).ready(function () {
    $("#Altura").mask("0.00");
});