import './App.css';
import Home from './Scenes/Home';
import Login from './Scenes/Login';
import '../node_modules/bootstrap-dark-5/dist/css/bootstrap-dark.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js';

import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Signup from './Scenes/Signup';
import { CartProvider } from '../src/components/ContextReducer.js';
import MyOrder from './Scenes/MyOrder.js';


function App() {
  return (

    <CartProvider>
      <Router>
        <div>
          <Routes>
            <Route exact path='/' element={<Home />} />
            <Route exact path='/login' element={<Login />} />
            <Route exact path='/createuser' element={<Signup />} />
            <Route exact path='/myOrder' element ={<MyOrder/>} />
            {/* <Route exact path='/practice' element = {<Practice students={studentsData} studentName={studentName}/>} /> */}

          </Routes>
        </div>

      </Router>
    </CartProvider>
  );
}

export default App;





