import React from 'react'

import { useContext } from 'react';

const spinner = document.getElementById("spin");
const root = document.getElementById("root");


async function serverCall (urlServeur = "", methodInfo = "GET", requestBody = null) {
    console.log("wiat");
    const url = 'http://192.168.1.14:8080'+urlServeur;
    const methodConst =  methodInfo  ;
    let headersConst;
    if(localStorage.getItem("bearer") !== null) {
        headersConst =  {
            'Content-Type': 'application/json',
                    'Accept': '*/*',
                    'Access-Control-Allow-Origin': '*',
                    'Authorization': "Bearer "+localStorage.getItem("bearer")
    
        };
    } else {
        headersConst =  {
            'Content-Type': 'application/json',
                    'Accept': '*/*',
                    'Access-Control-Allow-Origin': '*'

    
        };
    }
    
    let bodyConst ="";
    let info ;
    console.log({method : methodInfo,headers : {},body : ""});
    if(requestBody !== null) {
        const bodyConst = requestBody;
        info= {method : methodConst,headers : headersConst,body :bodyConst    };
    } else {
        info= {method : methodConst,headers : headersConst   };
    }
    
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
        const response = await serverCall(connectionDa.urlServeur,connectionDa.method,connectionDa.data);
        console.log(response);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        let resultRequest;
        try {
             resultRequest = await response.json();
        }catch(error) {
            resultRequest = "No data";
        }  
        
        spinner.style.visibility = 'hidden';
        root.classList.remove("loading");
        if(dataHandler !== null) {
            dataHandler(resultRequest);
        }

    } catch (error) {
        console.log(error);
        root.classList.remove("loading");
        spinner.style.visibility = 'hidden';
        if(errorHandler !== null) {
            errorHandler(error + "Impossible de se connecter, un problème peut survenir au niveau du serveur. Veuillez réessayer plus tard.");
        }
        
    }
        
} 



export default serverCall;
