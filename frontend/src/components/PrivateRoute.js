//eikhane just amar useAuth ta use kore dekhte hobe je current user ache kina jodi thake tahole amake child take return korte hobe nahole amake login page a redirect korte hobe .
import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import Login from './pages/Login';
export default function PrivateRoute({ children }) {
  const { currentUser } = useAuth();

  return currentUser ? children : <Login />;
}
