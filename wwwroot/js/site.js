﻿// Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

function addToHomeScreen() {
    // show the install app prompt
    window.promptEvent.prompt();

    // handle the Decline/Accept choice of the user
    window.promptEvent.userChoice.then(function (choiceResult) {
        // hide the prompt banner here
        // …

        if (choiceResult.outcome === 'accepted') {
            console.info('mm User accepted the A2HS prompt');
        } else {
            console.info('mm User dismissed the A2HS prompt');
        }

        window.promptEvent = null;
    });

}


//Notification.requestPermission().then(function(permission) { console.log('permiss', permission)});

// Opções padrão para todas as datatables
$.extend($.fn.dataTable.defaults, {
    pageLength: 50,
    ordering: true,
    responsive: true,
    language: {
        lengthMenu: "Exibe _MENU_ Registros por página",
        search: "",
        searchPlaceholder: "Digite aqui para procurar",
        paginate: {
            "previous": "<",
            "next": ">"
        },
        zeroRecords: "Nada foi encontrado",
        loadingRecords: "<span class='fa-stack fa-lg'><i class='fa fa-spinner fa-spin fa-stack-1x fa-fw'></i></span>",
        info: "Exibindo página _PAGE_ de _PAGES_",
        infoEmpty: "",
        infoFiltered: "(filtrado de _MAX_ regitros totais)",
        emptyTable: "Sem dados"
    },
    dom: 'Bfrtip',
    buttons: [{
        extend: "excelHtml5",
        text: "Download em Excel",
        className: "btn btn-primary",
        init: function (api, node, config) {
            $(node).removeClass('dt-button buttons-excel buttons-html5')
        }
    }]
});

$.extend($.fn.dataTableExt.oSort, {
    "date-range-pre": function (a) {
        var monthArr = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];
        return monthArr.indexOf(a);
    },
    "date-range-asc": function (a, b) {
        return ((a < b) ? -1 : ((a > b) ? 1 : 0));
    },
    "date-range-desc": function (a, b) {
        return ((a < b) ? 1 : ((a > b) ? -1 : 0));
    }
});

$.fn.dataTable.render.multi = function (renderArray) {
    return function (d, type, row, meta) {
        for (var r = 0; r < renderArray.length; r++) {
            d = renderArray[r](d, type, row, meta);
        }

        return d;
    }
}

//window.onresize = function(){ location.reload(); }

var localeData = moment.updateLocale('br', {
    months: [
        "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho",
        "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
    ]
});

$('form').submit(function (e) {
    $(':disabled').each(function (e) {
        $(this).removeAttr('disabled');
    })
    $('#CelularInput').unmask();
});

if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/service-worker.js')
            .then((reg) => {
                console.log('Service worker registered.', reg);
                // var button = document.getElementById('pwa-update');
                // button.onclick = function() {
                //     console.log("App atualizado!")
                //     reg.update();
                // }
            });
    });
}

//window.onbeforeprint = function() {
    //$('link[rel="stylesheet"]').attr('disabled', 'disabled');
    //Não está voltando os botões depois
    //$('body').find('*').attr('style', 'border: none !important');
    //$('input[type=button]').attr('style', 'display: none !important');
    // $('input[type=submit]').attr('style', 'display: none !important');
//};

// window.onbeforeprint = function() {
//     $('body').find('*').removeAttr('style', 'border: none !important');
//     $('input[type=button]').removeAttr('style', 'display: none !important');
//     $('input[type=submit]').removeAttr('style', 'display: none !important');
// };

// window.Notification.requestPermission().then(result => {
//     console.log(result)
//     if (result === 'granted') {
//         alert('Obrigado por aceitar!')
//     }
// });

// window.Notification.requestPermission().then(result => {
//     if (result === 'granted') {
//         navigator.serviceWorker.ready.then(registration => {
//             registration.showNotification('Há encomendas que podem ser entregues', {
//                 body: 'A encomenda...',
//                 tag: 'vibration-sample'
//             });
//         });
//     }
// });


$('.alert .close').on('click', function (e) {
    $(this).parent().hide();
});

$('.alert').hide();

window.onload = function () {
    // this.setInterval(verificaEncomendas, 100000);
}

if (typeof Notification !== 'undefined') {
    // debugger
    // Notification.addEventListener("click", function (event) {
    //     event.preventDefault(); 
    //     console.log('Notification clicked.');
    // });
}

//Cache
// async function addToCache(urls) {
//     const myCache = await window.caches.open('data-cache');
//     await myCache.addAll(urls);
// }

// window.addEventListener('load', () => {
//     addToCache(["https://localhost/Cliente/GetClientes"]);
// });