if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('../serviceWorkerSite.js')
      .then((reg) => console.log(`Service Worker Registered`))
      .catch((err) => console.log(`Register Error: ${err}`));
  });
}
