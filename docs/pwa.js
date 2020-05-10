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
        url: "https://localhost:5000/api/NutriApi/CheckServer/",
        contentType: "application/json",
        dataType: "json"
    }).done(function (data) {
        $(".only-online").show();
    }).fail(function () {
        $(".only-online").hide();
    });
}