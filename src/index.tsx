import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Provider from 'react-redux/es/components/Provider';
import { store } from './store/store';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Login from './containers/Login';
import Home  from './containers/Home';
import Signup from './containers/Signup';
import Profile from './containers/Profile';
import NotFound from './containers/profile/NotFound';


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const router = createBrowserRouter([
  {
    path: "/",
    element:  <Login></Login>,
  },
  {
    path: "/home",
    element: <Home></Home>,
  },
  {
    path: "/signup",
    element: <Signup></Signup>,
  },
  {
    path: "/profile/:userID",
    element: <Profile></Profile>,
  },
  {
    path: "/profile/notfound",
    element: <NotFound></NotFound>,
  }
]);


root.render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
