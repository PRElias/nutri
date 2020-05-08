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

function calculaIMC() {
    if ($("#IMC").val() === "") {
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
    for (var i = 0; i < localStorage.length; i++) {

        var paciente = localStorage.getItem(localStorage.key(i));

        $.ajax({
            method: "POST",
            url: "../api/NutriApi/",
            contentType: "application/json",
            dataType: "json",
            data: paciente
        }).done(function () {
            localStorage.removeItem(localStorage.key(i));
        }).fail(function () {
            alert("Erro ao sincronizar. Você está no mesmo WiFi do sistema?");
        });
    }
};

function downloadAssinatura() {
    var download = document.getElementById("download");
    var image = document.getElementById("quadro").toDataURL("image/png")
        .replace("image/png", "image/octet-stream");
    download.setAttribute("href", image);
}

function importAssinatura() {
    var image = document.getElementById("quadro").toDataURL("image/png")
        .replace("image/png", "image/octet-stream");
    
    $.ajax({
        method: "GET",
        url: "../api/NutriApi/SalvaAssinatura/?image=" + image,
        contentType: undefined,
        processData: false
    }).done(function () {
        alert("Salvo com sucesso!");
    }).fail(function () {
        alert("Erro ao sincronizar. Você está no mesmo WiFi do sistema?");
    });    
}


$(document).ready(function () {
    $("#Altura").mask("0.00");

    $("form").submit(function (event) {
        event.preventDefault();
    });

    var largura = document.body.scrollWidth - 30;
    console.log(largura);
    var altura = 300;

    var quadro = document.getElementById("quadro");
    quadro.setAttribute("width", largura);
    quadro.setAttribute("height", altura);

    var ctx = quadro.getContext("2d");

    var desenhando = false;

    quadro.onmousedown = function (evt) {
        ctx.moveTo(evt.clientX, evt.clientY);
        desenhando = true;
    }

    quadro.onmouseup = function () {
        desenhando = false;
    }

    quadro.onmousemove = function (evt) {
        if (desenhando) {
            ctx.lineTo(evt.clientX, evt.clientY);
            ctx.stroke();
        }
    }
});

function startup() {
    var el = document.getElementById("quadro");
    el.addEventListener("touchstart", handleStart, false);
    el.addEventListener("touchend", handleEnd, false);
    el.addEventListener("touchcancel", handleCancel, false);
    el.addEventListener("touchmove", handleMove, false);
}

document.addEventListener("DOMContentLoaded", startup);

var ongoingTouches = [];

function handleStart(evt) {
    evt.preventDefault();
    var el = document.getElementById("quadro");
    var ctx = el.getContext("2d");
    var touches = evt.changedTouches;

    for (var i = 0; i < touches.length; i++) {
        ongoingTouches.push(copyTouch(touches[i]));
        var color = colorForTouch(touches[i]);
        ctx.beginPath();
        ctx.arc(touches[i].pageX, touches[i].pageY, 4, 0, 2 * Math.PI, false);  // a circle at the start
        ctx.fillStyle = color;
        ctx.fill();
    }
}

function handleMove(evt) {
    evt.preventDefault();
    var el = document.getElementById("quadro");
    var ctx = el.getContext("2d");
    var touches = evt.changedTouches;

    for (var i = 0; i < touches.length; i++) {
        var color = colorForTouch(touches[i]);
        var idx = ongoingTouchIndexById(touches[i].identifier);

        if (idx >= 0) {
            ctx.beginPath();
            ctx.moveTo(ongoingTouches[idx].pageX, ongoingTouches[idx].pageY);
            ctx.lineTo(touches[i].pageX, touches[i].pageY);
            ctx.lineWidth = 4;
            ctx.strokeStyle = color;
            ctx.stroke();

            ongoingTouches.splice(idx, 1, copyTouch(touches[i]));  // swap in the new touch record
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
        var color = colorForTouch(touches[i]);
        var idx = ongoingTouchIndexById(touches[i].identifier);

        if (idx >= 0) {
            ctx.lineWidth = 4;
            ctx.fillStyle = color;
            ctx.beginPath();
            ctx.moveTo(ongoingTouches[idx].pageX, ongoingTouches[idx].pageY);
            ctx.lineTo(touches[i].pageX, touches[i].pageY);
            ctx.fillRect(touches[i].pageX - 4, touches[i].pageY - 4, 8, 8);  // and a square at the end
            ongoingTouches.splice(idx, 1);  // remove it; we're done
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

function colorForTouch(touch) {
    var r = touch.identifier % 16;
    var g = Math.floor(touch.identifier / 3) % 16;
    var b = Math.floor(touch.identifier / 7) % 16;
    r = r.toString(16); // make it a hex digit
    g = g.toString(16); // make it a hex digit
    b = b.toString(16); // make it a hex digit
    var color = "#" + r + g + b;
    return color;
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
