import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import 'firebase/compat/auth';
// import firebase from 'firebase/compat/app';
import firebase from '../../FirebaseConfiguration';

import {
  GoogleAuthProvider,
  FacebookAuthProvider,
  EmailAuthProvider,
} from 'firebase/auth';
import { Card } from 'react-bootstrap';

const uiConfig = {
  signInFlow: 'popup',
  signInSuccessUrl: '/',
  signInOptions: [
    GoogleAuthProvider.PROVIDER_ID,
    FacebookAuthProvider.PROVIDER_ID,
    EmailAuthProvider.PROVIDER_ID,
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
