function downloadAssinatura() {
    var download = document.getElementById("download");
    var image = document.getElementById("quadro").toDataURL("image/png")
        .replace("image/png", "image/octet-stream");
    download.setAttribute("href", image);
}

$(document).ready(function () {
    $("#Altura").mask("0.00");

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

    $("#myFormAssinatura").submit(function(event){
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
        request.open("POST", "../Assinatura/SalvaAssinatura");
        request.onerror = function () {
            console.log("Erro ao salvar assinatura");
          };
        request.onreadystatechange = function() {
            if(request.readyState === 4) {
                if(request.status === 200) {
                    alert("Assinatura salva com sucesso");
                    window.location.replace("../Config/Edit");
                }
            }
        }
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
            ctx.moveTo(ongoingTouches[idx].pageX -10, ongoingTouches[idx].pageY - 120);
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