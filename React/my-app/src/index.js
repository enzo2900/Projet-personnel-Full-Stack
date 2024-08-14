import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import App from './App.js';
import { BrowserRouter } from "react-router-dom";
import reportWebVitals from './reportWebVitals';

import { verifyToken } from './Class/CompteService.js';
import {Token} from './Class/Token.ts';
const root = ReactDOM.createRoot(document.getElementById('root'));

if (window.performance) {
  console.info("window.performance work's fine on this browser");
}
  if (performance.navigation.type == 1) {
    console.info( "This page is reloaded" );
    console.log(localStorage.getItem("bearer"));
    if(localStorage.getItem("bearer") !== null) {
      console.log(Token.getSingleton().value);
      verifyToken(localStorage.getItem("bearer"),(data)=> {
        console.log(data.available);
        if(data.available ==="false") {
          console.log(data.available);
            localStorage.removeItem("bearer");
            localStorage.removeItem("bearerDuration");
            
        }
        root.render(
          <React.StrictMode>
            <App />
          </React.StrictMode>
        );

      },(error) => {
        console.log(error);
        localStorage.removeItem("bearer");
            localStorage.removeItem("bearerDuration");
            root.render(
              <React.StrictMode>
                <App />
              </React.StrictMode>
            );
      });
    } else {
      root.render(
        
        <React.StrictMode>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </React.StrictMode>
      );
    }
    
  } else {
    console.info( "This page is not reloaded");
  }




// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
