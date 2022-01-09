import '../Firebase';
import React, { useEffect, useState, useContext } from 'react';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
// import jwt from 'jsonwebtoken';
// import { useCookies } from 'react-cookie';
const AuthContext = React.createContext();

export function AuthProvider({ children }) {
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState();
  // const [cookies, setCookie, removeCookie] = useCookies(['access_token']);
  function logout() {
    const auth = getAuth();
    // removeCookie('access_token');
    return signOut(auth);
  }
  useEffect(() => {
    const auth = getAuth();
    const unregisterAuthObserver = onAuthStateChanged(auth, (user) => { 
      // setCookie({
      //   name: 'access_token',
      //   value: jwt.sign({ userId: user.uid }, process.env.JWT_SECRET, {
      //     exp: process.env.JWT_EXPIRES_IN,
      //   }),
      // });
      setCurrentUser(user);
      setLoading(false);
    });
    return () => unregisterAuthObserver(); // Make sure we un-register Firebase observers when the component unmounts.
  }, []);

  const value = {
    loading,
    currentUser,
    logout,
  };
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
export function useAuth() {
  return useContext(AuthContext);
}
