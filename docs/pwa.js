var serverIp = "192.168.1.105"

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

self.addEventListener('install', function(e) {
    e.waitUntil(
        caches.open('static-cache').then(function(cache) {
            return cache.addAll([
                '/',
                '/index.html',
                '/assinatura.html',
                '/assinatura.js',
                '/calculos.js',
                '/pwa.js',
                '/pwa-manifest.json.js',
                '/pwa-service-worker.js',
                '/site.css'
            ]);
        })
    );
});

self.addEventListener('fetch', function (event) {})

let btnAdd = document.getElementById("btnAdd");
let deferredPrompt;

window.addEventListener('beforeinstallprompt', (e) => {
    // Prevent Chrome 67 and earlier from automatically showing the prompt
    e.preventDefault();
    // Stash the event so it can be triggered later.
    deferredPrompt = e;
    // Update UI notify the user they can add to home screen
    btnAdd.style.display = 'block';
  });
  btnAdd.addEventListener('click', (e) => {
    // hide our user interface that shows our A2HS button
    btnAdd.style.display = 'none';
    // Show the prompt
    deferredPrompt.prompt();
    // Wait for the user to respond to the prompt
    deferredPrompt.userChoice
      .then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('User accepted the A2HS prompt');
        } else {
          console.log('User dismissed the A2HS prompt');
        }
        deferredPrompt = null;
      });
  });
  window.addEventListener('appinstalled', (evt) => {
    app.logEvent('a2hs', 'installed');
  });

function checkServer() {
    $.ajax({
        method: "GET",
        url: "https://" + serverIp + ":5000/api/NutriApi/CheckServer/",
        timeout: 5000
    }).done(function (data) {
        console.log("Servidor online!");
        $(".only-online").prop("disabled", false);
    }).fail(function () {
        console.log("Servidor não encontrado");
        $(".only-online").prop("disabled", true);
    });
}

$(document).ready(function () {
    checkServer();
});