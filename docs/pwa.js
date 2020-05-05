if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/service-worker.js')
            .then((reg) => {
                console.log('Service worker registered.', reg);
            });
    });
}

console.log('pwa.js carregado');

var imc, peso, altura;

function calculaIMC() {
    if (peso > 0 && altura > 0) {
        imc.value = peso / (altura * altura);
    }
}

$(document).ready(function () {
    imc = $("IMC");
    peso = $("Peso");
    altura = $("Altura");
    calculaIMC();
});
