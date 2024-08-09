import React, { createContext, useContext, useEffect, useState } from 'react';
import { DisplayContext } from './Display';
import Login from './LinkPage/Login';
import serverCall from './Class/ApiManager';
// Créer le contexte

export const TokenContext = createContext();


// Créer un fournisseur de contexte
export const TokenProvider = ({ children}) => {
    let duration  = -1; 
    let interval;
    console.log(duration);
    //TODO change to a more efficient algorithm
    function setDuration (dura) {
        duration = dura;
    }
    if(duration === -1 && localStorage.getItem("bearerDuration") !== null ) {
        duration = parseInt(localStorage.getItem("bearerDuration"));
    }
    
    if(duration <= 0) {
        localStorage.removeItem("bearer");
        localStorage.removeItem("bearerDuration");
        clearInterval(interval);
        duration = -1;
    } else if (duration > 0){
        interval = setInterval(()=>{
            duration = duration -1000;
            localStorage.setItem("bearerDuration",duration);
        },1000);
    }

    return (
        <TokenContext.Provider value={{duration,setDuration}}>
            {children}
        </TokenContext.Provider>
    );
};
