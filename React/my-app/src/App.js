import React from 'react';

import { BrowserRouter as Router, Route, Routes, Link} from 'react-router-dom';
import Login from './LinkPage/Login';

import { createContext, useState, useContext } from 'react';
import { DisplayContext,DisplayProvider } from './Display';
import { TokenContext } from './TokenP.js';
import { TokenProvider } from './TokenP.js';
const spinner = document.getElementById("spin");
spinner.style.visibility='hidden';
const App = () => {
    return (
        
        <>
           
            <TokenProvider  > 
            <DisplayProvider initialContent={<Login/>}/>
            </TokenProvider>
            
            
        </>
    );
};

export default App;