import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import 'firebase/compat/auth';
import firebase from 'firebase/compat/app';
import { Card, Container } from 'react-bootstrap';

const config = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSING_SENDER_ID,
  appId: process.env.REACT_APP_ID,
};
firebase.initializeApp(config);
const uiConfig = {
  signInFlow: 'popup',
  signInSuccessUrl: '/',
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    firebase.auth.FacebookAuthProvider.PROVIDER_ID,
    firebase.auth.EmailAuthProvider.PROVIDER_ID,
  ],
};

function Login() {
  return (
    <div className={'d-flex justify-content-center py-3 '}>
      <Card style={{ width: '18rem' }}>
        <Card.Body>
          <Card.Title className={'text-center'}>Login</Card.Title>
          <StyledFirebaseAuth
            uiConfig={uiConfig}
            firebaseAuth={firebase.auth()}
          />
        </Card.Body>
      </Card>
    </div>
  );
}

export default Login;
