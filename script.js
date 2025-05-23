
if ('serviceWorker' in navigator) {

 window.addEventListener('load', function () {

    navigator.serviceWorker.register('sw.js')
    .then(function (registration) {
      console.log('Service Worker registered:', registration);
    })
    .catch(function (error) {
        console.log(' Error SW:', error);
    });
});
}
