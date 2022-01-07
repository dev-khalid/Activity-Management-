import Login from './components/pages/Login';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/pages/Home';
import PrivateRoute from './components/PrivateRoute';
import { Container } from 'react-bootstrap';
import NavBar from './components/NavBar';
function App() {
  return (
    <Router>
        <NavBar />
      <Container>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
