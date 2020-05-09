var serverip;

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
    //$('form').get(0).reset();
    //formReset();
}

function sincroniza() {
    for (var i = 0; i < localStorage.length; i++) {

        var paciente = localStorage.getItem(localStorage.key(i));

        if (!paciente.includes("http")) {

            $.ajax({
                method: "POST",
                url: serverip + "/api/NutriApi/ImportaPaciente/",
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
}

function downloadAssinatura() {
    var download = document.getElementById("download");
    var image = document.getElementById("quadro").toDataURL("image/png")
        .replace("image/png", "image/octet-stream");
    download.setAttribute("href", image);
}

function abrirTab() {
    var base64URL = document.getElementById("quadro").toDataURL("image/png");
    var win = window.open();
    win.document.write('<iframe src="' + base64URL + '" frameborder="0" style="border:0; top:0px; left:0px; bottom:0px; right:0px; width:100%; height:100%;" allowfullscreen></iframe>');
}

function getConfig() {
    serverip = localStorage.getItem("ip-servidor");
    if (serverip === null) {
        $("#btn-import").prop("disabled", true);
        $("#msg-import").show();
    }
    else {
        $("#inp_ip").val(serverip);
        $("#msg-import").hide();
    }
}

function salvaConfig() {
    localStorage.setItem("ip-servidor", $("#inp_ip").val());
}

$(document).ready(function () {
    $("#Altura").mask("0.00");
    // $("#inp_ip").mask("http://000.000.0.00");

    getConfig();

    $("form").submit(function (event) {
        event.preventDefault();
    });

    var largura = document.body.scrollWidth - 30;
    var altura = 300;

    var quadro = document.getElementById("quadro");
    quadro.setAttribute("width", largura);
    quadro.setAttribute("height", altura);

    var ctx = quadro.getContext("2d");
    //tentando mudar o fundo pra branco
    ctx.fillStyle = "#FFFFFF";

    var desenhando = false;

    quadro.onmousedown = function (evt) {
        ctx.moveTo(evt.clientX - 10, evt.clientY - 115);
        desenhando = true;
    };

    quadro.onmouseup = function () {
        desenhando = false;
    };

    quadro.onmousemove = function (evt) {
        if (desenhando) {
            ctx.lineTo(evt.clientX - 10, evt.clientY - 115);
            ctx.stroke();
        }
    };

    startup();

    $("#myFormAssinatura").submit(function (event) {
        event.preventDefault();
        var image = document.getElementById("quadro").toDataURL("image/png");
        image = image.replace("data:image/png;base64,", "");
        const byteCharacters = atob(image);

        const byteNumbers = new Array(byteCharacters.length);
        for (let i = 0; i < byteCharacters.length; i++) {
            byteNumbers[i] = byteCharacters.charCodeAt(i);
        }

        const byteArray = new Uint8Array(byteNumbers);
        const blob = new Blob([byteArray], { type: "image/png" });
        var formData = new FormData();
        formData.append("assinatura", blob);
        var request = new XMLHttpRequest();
        request.open("POST", serverip + "/api/NutriApi/SalvaAssinatura/");
        request.send(formData);
    });
});

function startup() {
    var el = document.getElementById("quadro");
    el.addEventListener("touchstart", handleStart, false);
    el.addEventListener("touchend", handleEnd, false);
    el.addEventListener("touchcancel", handleCancel, false);
    el.addEventListener("touchmove", handleMove, false);
}

//document.addEventListener("DOMContentLoaded", startup);

var ongoingTouches = [];

function handleStart(evt) {
    evt.preventDefault();
    var el = document.getElementById("quadro");
    var ctx = el.getContext("2d");
    var touches = evt.changedTouches;

    for (var i = 0; i < touches.length; i++) {
        ongoingTouches.push(copyTouch(touches[i]));
        ctx.beginPath();
        ctx.fill();
    }
}

function handleMove(evt) {
    evt.preventDefault();
    var el = document.getElementById("quadro");
    var ctx = el.getContext("2d");
    var touches = evt.changedTouches;

    for (var i = 0; i < touches.length; i++) {
        var idx = ongoingTouchIndexById(touches[i].identifier);

        if (idx >= 0) {
            ctx.beginPath();
            ctx.moveTo(ongoingTouches[idx].pageX - 10, ongoingTouches[idx].pageY - 120);
            ctx.lineTo(touches[i].pageX - 10, touches[i].pageY - 120);
            ctx.lineWidth = 4;
            ctx.strokeStyle = "#000000";
            ctx.stroke();

            ongoingTouches.splice(idx, 1, copyTouch(touches[i]));
        } else {
        }
    }
}

function handleEnd(evt) {
    evt.preventDefault();
    var el = document.getElementById("quadro");
    var ctx = el.getContext("2d");
    var touches = evt.changedTouches;

    for (var i = 0; i < touches.length; i++) {
        var idx = ongoingTouchIndexById(touches[i].identifier);

        if (idx >= 0) {
            ctx.lineWidth = 2;
            ctx.fillStyle = "#FFFFFF";
            ctx.beginPath();
            ctx.moveTo(ongoingTouches[idx].pageX - 10, ongoingTouches[idx].pageY - 120);
            ctx.lineTo(touches[i].pageX - 10, touches[i].pageY - 120);
            ongoingTouches.splice(idx, 1);
        } else {
        }
    }
}

function handleCancel(evt) {
    evt.preventDefault();
    var touches = evt.changedTouches;

    for (var i = 0; i < touches.length; i++) {
        var idx = ongoingTouchIndexById(touches[i].identifier);
        ongoingTouches.splice(idx, 1);  // remove it; we're done
    }
}

function copyTouch({ identifier, pageX, pageY }) {
    return { identifier, pageX, pageY };
}

function ongoingTouchIndexById(idToFind) {
    for (var i = 0; i < ongoingTouches.length; i++) {
        var id = ongoingTouches[i].identifier;

        if (id == idToFind) {
            return i;
        }
    }
    return -1;    // not found
}
