if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('pwa-service-worker.js')
            .then((reg) => {
                console.log('Service worker registered.', reg);
                var button = document.getElementById('pwa-update');
                button.onclick = function() {
                    console.log("App atualizado!")
                    reg.update();
                }
            });
    });
}

function checkServer() {
    $.ajax({
        method: "GET",
        url: "https://localhost:5000/api/NutriApi/CheckServer/"
    }).done(function (data) {
        console.log("Servidor online!");
        $(".only-online").show();
    }).fail(function () {
        console.log("Servidor não encontrado");
        $(".only-online").hide();
    });
}

$(document).ready(function () {
    checkServer();
});