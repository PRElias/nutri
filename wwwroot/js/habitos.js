$(document).ready(function () {
    

    $("#DataInput").datepicker({
        dateFormat: 'dd/mm/yy',
        showButtonPanel: true,
        changeMonth: true,
        changeYear: true,
        showOtherMonths: true,
        selectOtherMonths: true ,
        yearRange: "2020:2030",
        currentText: "Hoje",
        closeText: "Fechar"
    });

    //Table
    var colunas = [{
            "data": "id",
            "title": "Id"
        },
        {
            "data": "data",
            "title": "Data",
            render: $.fn.dataTable.render.intlDateTime('en-UK')
        },
        {
            "data": "",
            "title": "Ações"
        }
    ]

    $('#habitosTable').DataTable({
        columns: colunas,
        paging: false,
        bInfo: false
    });

    $('#btnNovoHabitos').prependTo($('#habitosTable_wrapper .dt-buttons'));

});


function DeleteHabitosConfirm(id) {
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
                        url: "/Habitos/Delete/" + id
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