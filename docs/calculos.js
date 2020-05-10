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