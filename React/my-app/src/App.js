import React from 'react';

import { BrowserRouter as Router, Route, Routes, Link} from 'react-router-dom';
import Login from './LinkPage/Login';

import { createContext, useState, useContext } from 'react';
import { DisplayContext,DisplayProvider } from './Display';
const spinner = document.getElementById("spin");
spinner.style.visibility='hidden';
const App = () => {
    return (
        
        <>
            <DisplayProvider initialContent={<Login/>}/>
            
        </>
    );
};

export default App;