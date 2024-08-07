import React from 'react'

import { useContext } from 'react';

const spinner = document.getElementById("spin");
const root = document.getElementById("root");


async function serverCall (urlServeur = "", methodInfo = "GET", requestBody = null) {
    console.log("wiat");
    const url = 'http://localhost:8080'+urlServeur;
    const methodConst =  methodInfo  ;
    const headersConst =  {
        'Content-Type': 'application/json',
                'Accept': '*/*',
                'Access-Control-Allow-Origin': '*'
    };
    let bodyConst ="";
    console.log({method : methodInfo,headers : {},body : ""});
    if(requestBody !== null) {
        bodyConst =  requestBody;
    }
    const info= {method : methodConst,headers : headersConst,body :bodyConst    };
    console.log(info);
    return call(url,info);
    
}
async function call(url,callInfo) {
    return await fetch(url,callInfo);
}
export async function makeServerCall(connectionDa,dataHandler =null,errorHandler=null) {
    spinner.style.visibility = 'visible';
    root.classList.add("loading");
    try{
        console.log(connectionDa.data);
        console.log(connectionDa.method);
        console.log(connectionDa.urlServeur);
        const response = await serverCall(connectionDa.urlServeur,connectionDa.method,connectionDa.data);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const resultRequest = await response.json();
        spinner.style.visibility = 'hidden';
        root.classList.remove("loading");
        if(dataHandler !== null) {
            dataHandler(resultRequest);
        }

    } catch (error) {
        root.classList.remove("loading");
        spinner.style.visibility = 'hidden';
        if(errorHandler !== null) {
            errorHandler(error + "Impossible de se connecter, un problème peut survenir au niveau du serveur. Veuillez réessayer plus tard.");
        }
        
    }
        
} 

export default serverCall;
