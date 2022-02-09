export default function swDev(payload) {
  const swUrl = `${process.env.PUBLIC_URL}/sw.js`;
  console.log(swUrl); 
  const publicVapidKey =
    'BKSDIGUvwBlG2YZupbSf6lrkQL0RKFoETXmi-BRKyvHe23Q2l2i8nC1MetSkK5HwU8ahaifP0Kn9OKqjQ9_XvCg';
  if ('serviceWorker' in navigator) {
    send().catch((err) => console.error(err));
  }

  //Register sw, register a push, send the push
  async function send() {
    //REgister Service Worker .
    const register = await navigator.serviceWorker.register('/sw.js', {
      scopre: '/',
    });
    console.log('Service Worker Registered');
    //Register Push
    console.log('Registering Push');
    const subscription = await register.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array(publicVapidKey),
    });
    console.log('Sending Push...');
    await fetch('/api/subscribe', {
      method: 'POST',
      body: JSON.stringify({ subscription, payload }),
      headers: {
        'content-type': 'application/json',
      },
    });

    console.log('Push Sent...');
  }

  function urlBase64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
    const base64 = (base64String + padding)
      .replace(/\-/g, '+')
      .replace(/_/g, '/');

    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  }
}
