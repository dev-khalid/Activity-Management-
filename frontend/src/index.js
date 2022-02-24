import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { AuthProvider } from './contexts/AuthContext';
import 'bootstrap/dist/css/bootstrap.min.css';
// import axios from 'axios';
// import { getMessaging, getToken, onMessage } from 'firebase/messaging';

// const messaging = getMessaging();
// getToken(messaging, {
//   vapidKey:
//     'BAQYNZDxJORGqZHeXIHvnFa2_rr3LBsKyQOLDRaE0vruP8rCwpnNgx6xSxJkKOByqmcHj2HPlvjWT9MNnjDZ6TI',
// })
//   .then((token) => {
//     //eikhan theke ekta token registration complete korte hobe arki .
//     console.log('Token : ', token);
//     const postFcmToken = async () => {
//       await axios.post('api/notification/storefcmtoken', {
//         token,
//       });
//     };
//     postFcmToken();
//   })
//   .catch((err) => {
//     console.log('whats the error', err);
//   });

ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
