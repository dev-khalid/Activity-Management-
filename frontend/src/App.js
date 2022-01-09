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

          <Route
            path="/"
            element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            }
          />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;

//ajke amra  obossoi obossoi mul page er frontend ta ready korbo .
//mul page a ki thakbe . ami simple diye suru korbo .
/**
 * what is simplicity ? 
 *1. amar jodi current goal hisabe kichu na thake tahole amake ekta current goal set up korar button dekhabe
 jeita click korle ekta popup ashbe .
 1.Extended - jodi amar currnet diner jonne kono goal na thake tahole eita check dibe and amake every 10 mins por por notification pathayte thakbe browser a and I will create this for what's app also .
 
 jodi current goal thake set kora tahole eigula hobe arki 
 2.jodi amar current goal thake tahole amake dekhabe je ajker current goal ki . 

 3.current goal thakle ajker dine ami koy hour complete korlam seita add korte bolbe pie chart a. 
 4.current goal update korar ekta button thakbe . 
 5.monthly data take show korbe barchart with different colours [100% complete hoile sobuj na hoile red]


 */
