import { useContext } from 'react';
import './App.css';
import Login from './components/page/Login';

import { AuthProvider, useAuth } from './constexts/AuthContext';
function App() {

  return (
    <AuthProvider>
      <div className="App">
        <Login />
        {
          console.log(useContext(AuthContext))
        }
      </div>
    </AuthProvider>
  );
}

export default App;
