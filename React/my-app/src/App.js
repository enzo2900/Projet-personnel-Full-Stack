import React from 'react';

import { BrowserRouter as Router, Route, Routes, Link, useNavigate} from 'react-router-dom';
import Login from './LinkPage/Login';

import { createContext, useState, useContext } from 'react';
import { DisplayContext,DisplayProvider } from './Display';
import { TokenContext } from './TokenP.js';
import { TokenProvider } from './TokenP.js';
import Home from './LinkPage/Home.js';
import { Token } from './Class/Token.ts';
import { RouteLayout } from './Component/RouteLayout.js';

import AccountCreationPage from './LinkPage/AccountCreationP.js';
const spinner = document.getElementById("spin");
spinner.style.visibility='hidden';
Token.getSingleton().setValue(localStorage.getItem("bearer"));
Token.getSingleton().setDuration(parseInt(localStorage.getItem("bearerDuration")));

const App = () => {
        const navigate = useNavigate();
      if(localStorage.getItem("bearer") !== null) {
        console.log(localStorage.getItem("bearer"));
        Token.getSingleton().beginTimer(() => navigate("/"));
        return (<>
                        <Routes >
            <Route path="/" element={<Login/>}/>
            <Route path="CreateAccount" element={<AccountCreationPage/>}/>
            <Route path="Home" element={<Home/>}/>
        </Routes>
                <DisplayProvider></DisplayProvider>
           
               
                
               
                </>
                
                
            
        );
    }
    console.log(localStorage.getItem("bearer"));
    return (
        <>
         <Routes>
            <Route path="/" element={<Login/>}/>
            <Route path="CreateAccount" element={<AccountCreationPage/>}/>
            <Route path="Home" element={<Home/>}/>
        </Routes>
        
        <DisplayProvider></DisplayProvider>
            
            
            </>
            
            
       
    );
};

export default App;