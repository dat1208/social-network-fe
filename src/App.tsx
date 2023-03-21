import React from 'react';
import './App.css';
import Login from './containers/Login'
import Home  from './containers/Home';
import 'bootstrap/dist/css/bootstrap.min.css'
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
function App() {
  return (
    <div className="App">
      <Home></Home>
    </div>
  );
  
}
export default App;
