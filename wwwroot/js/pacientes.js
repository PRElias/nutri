$(document).ready(function () {
    // $("#pacientesDetalhes").accordion({
    //     active: false,
    //     collapsible: true,
    //     autoHeight: false
    // });

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
            //0
            "data": "id",
            "title": "",
            width: "5%"
        },
        {
            //1
            "data": "nome",
            "title": "Nome"
        },
        {
            //2
            "data": "idade",
            "title": "Idade",
            className: "none"
        },
        {
            //3
            "data": "altura",
            "title": "Altura",
            className: "none"
        },
        {
            //4
            "data": "peso",
            "title": "Peso",
            className: "none"
        },
        {
            //5
            "data": "imc",
            "title": "IMC",
            className: "none"
        },
        {
            //6
            "data": "telefone",
            "title": "Telefone",
            className: "none"
        },
        {
            //7
            "data": "celular",
            "title": "Celular",
            className: "none"
        },
        {
            //8
            "data": "status",
            "title": "Status",
            className: "none"
        },
        {
            //9
            "data": "",
            "title": "Ações",
            className: "none",
            width: "20%"
        }
    ]
    
    //Removendo a classe none em mobile para exibir o botão + de child rows
    if ($(window).width() >= 700) {
        delete colunas[5].className;
        delete colunas[7].className;
        delete colunas[9].className;
        // delete colunas[0].width;
        // delete colunas[9].width;
    }

    $('#pacientesTable').DataTable({
        columns: colunas,
        bAutoWidth:false,
        columnDefs: [
            { width: 200, targets: 0 }
        ],
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

var acc = document.getElementsByClassName("accordion");
var i;

for (i = 0; i < acc.length; i++) {
  acc[i].addEventListener("click", function() {
    this.classList.toggle("active");
    var panel = this.nextElementSibling;
    if (panel.style.maxHeight) {
      panel.style.maxHeight = null;
    } else {
      panel.style.maxHeight = panel.scrollHeight + "px";
    }
  });
}