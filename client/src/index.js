import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from "react-router-dom";
import { UserProvider } from "./Hooks/userContext"

const root = ReactDOM.createRoot( document.getElementById( 'root' ) );
root.render(
  <React.StrictMode>
    <BrowserRouter>
     <UserProvider children={ <App /> } />
    </BrowserRouter>
  </React.StrictMode>
);

