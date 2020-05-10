$(document).ready(function () {
    // $("#pacientesDetalhes").accordion({
    //     active: false,
    //     collapsible: true,
    //     autoHeight: false
    // });
    $("#Altura").mask("0.00");
    calculaIMC();
    calculaPesoIdeal();

    $('#CelularInput').mask('(00) 00000-0000');
});

var acc = document.getElementsByClassName("accordion");
var i;

for (i = 0; i < acc.length; i++) {
    acc[i].addEventListener("click", function () {
        this.classList.toggle("active");
        var panel = this.nextElementSibling;
        if (panel.style.maxHeight) {
            panel.style.maxHeight = null;
        } else {
            panel.style.maxHeight = panel.scrollHeight + "px";
        }
    });
}