// $.ajaxPrefilter(function (options, originalOptions, jqXHR) {
//     if (options.cache) {
//         var success = originalOptions.success || $.noop,
//             url = originalOptions.url;

//         options.cache = false; //remove jQuery cache as we have our own localStorage
//         options.beforeSend = function () {
//             success(getFromCache(url));
//             return false;
//         }
//         return true;
//     };
//     options.success = function (data, textStatus) {
//         var responseData = JSON.stringify(data);
//         addToCache(url, responseData);
//         if ($.isFunction(success)) success(responseData); //call back to original ajax call
//     };
// });


// var url = "/Cliente/GetClientes";

// async function getFromCache(url) {
//     const myCache = await window.caches.open('data-cache');
//     return await myCache.match(url);
// }


// async function addToCache(urls) {
//     const myCache = await window.caches.open('data-cache');
//     await myCache.addAll(urls);
// }

// window.addEventListener('load', () => {
//     addToCache(["https://localhost/Cliente/GetClientes"]);
// });


