import React from 'react';
import { Route, BrowserRouter as Router } from 'react-router-dom'
import Login from './components/Login'
import SignUp from './components/SignUp'
import Dashboard from './components/Dashboard'

function App() {
  return (
    <div className="App">
      <Router>
        <Route path='/login' component={Login}></Route>
        <Route path='/signup' component={SignUp}></Route>
        <Route path='/dashboard' component={Dashboard}></Route>
      </Router>
    </div>
  );
}

export default App;
