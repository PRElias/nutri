$(document).ready(function () {
    

    $("#DataNascimentoInput").datepicker({
        dateFormat: 'dd/mm/yy',
        showButtonPanel: true,
        changeMonth: true,
        changeYear: true,
        showOtherMonths: true,
        selectOtherMonths: true,
        yearRange: "1930:2020",
        currentText: "Hoje",
        closeText: "Fechar"
    });

    //Table
    var colunas = [{
            "data": "id",
            "title": "Id"
            // width: "7%"
        },
        {
            "data": "nome",
            "title": "Nome"
        },
        {
            "data": "idade",
            "title": "Idade",
        },
        {
            "data": "altura",
            "title": "Altura",
            className: "none"
            // width: "12%"
        },
        {
            "data": "peso",
            "title": "Peso",
            className: "none"
        },
        {
            "data": "imc",
            "title": "IMC"
        },
        {
            "data": "telefone",
            "title": "Telefone",
            className: "none"
        },
        {
            "data": "celular",
            "title": "Celular"
        },
        {
            "data": "status",
            "title": "Status",
            className: "none"
        },
        {
            "data": "",
            "title": "Ações"
        }
    ]

    $('#pacientesTable').DataTable({
        columns: colunas
    });

    $('#btnNovoPaciente').prependTo($('.dt-buttons'));

});


function ConfirmDialog(id) {
    $('<div></div>').appendTo('body')
        .html('<div><h6>Tem certeza que deseja excluir? Essa ação não pode ser desfeita!</h6></div>')
        .dialog({
            modal: true,
            closeText: "",
            // title: 'Mensagem de exclusão',
            zIndex: 10000,
            autoOpen: true,
            width: 'auto',
            resizable: false,
            buttons: {
                Sim: function () {
                    $.ajax({
                        type: "DELETE",
                        url: "/Paciente/Delete/" + id
                    });
                    $(this).dialog("close");
                    location.reload(true);
                },
                Não: function () {
                    $(this).dialog("close");
                }
            },
            close: function (event, ui) {
                $(this).remove();
            }
        });
};