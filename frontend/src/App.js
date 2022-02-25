import React, { useEffect } from 'react';
import './App.css';
import Login from './components/pages/Login';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Study from './components/pages/Study';
import PrivateRoute from './components/PrivateRoute';
import { Container } from 'react-bootstrap';
import NavBar from './components/NavBar';
import Target from './components/pages/Target';
import Achievement from './components/pages/Achievement';
import Students from './components/pages/Students';
import Details from './components/pages/Details';
import Exercise from './components/pages/Exercise';
// import swDev from './swDev';
import axios from 'axios';
function App() {
  // useEffect(() => {
  //   const sendToAll = async () => {
  //     await axios.post('api/notification/sendtoall', {
  //       title: 'Khalid vai test korche ',
  //       text: 'ekta hoilei hoilo',
  //       icon: 'https://cms-assets.tutsplus.com/cdn-cgi/image/width=850/uploads/users/523/posts/32694/final_image/tutorial-preview-large.png',
  //     });
  //   };

  //   sendToAll();
  // }, []);

  return (
    <Router>
      <NavBar />
      <Container>
        <Routes>
          <Route
            path="/"
            element={
              <PrivateRoute>
                <Study />
              </PrivateRoute>
            }
          />
          <Route
            path="/exercise"
            element={
              <PrivateRoute>
                <Exercise />
              </PrivateRoute>
            }
          />
          <Route
            path="/study"
            element={
              <PrivateRoute>
                <Study />
              </PrivateRoute>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route
            path="/target"
            element={
              <PrivateRoute>
                <Target />
              </PrivateRoute>
            }
          />
          <Route
            path="/achievement"
            element={
              <PrivateRoute>
                <Achievement />
              </PrivateRoute>
            }
          />
          <Route path="/students" element={<Students />} />
          <Route path="/details" element={<Details />} />
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
