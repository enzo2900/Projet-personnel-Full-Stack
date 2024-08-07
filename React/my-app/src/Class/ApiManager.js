import React from 'react'

import { useContext } from 'react';

const spinner = document.getElementById("spin");
const root = document.getElementById("root");


const fetchWithTimeout = (url, options, timeout = 5000) => {
    return Promise.race([
        fetch(url, options),
        new Promise((_, reject) =>
            setTimeout(() => reject(new Error('Request timed out')), timeout)
        )
    ]);
};
 async function serverCall (urlServeur = "", method = "GET", requestBody = null) {
    if(requestBody === null) {
        return await fetch('http://localhost:8080'+urlServeur, {
            method: method,
            headers: {
                'Content-Type': 'application/json',
                'Accept': '*/*',
                'Access-Control-Allow-Origin': '*'
    
            }
        });
    } else {
        return await fetch('http://localhost:8080'+urlServeur, {
            method: method,
            headers: {
                'Content-Type': 'application/json',
                'Accept': '*/*',
                'Access-Control-Allow-Origin': '*'
    
            },
            body : requestBody
        });
    }
    
}
export async function makeServerCall(connectionData,dataHandler =null,errorHandler=null) {
    spinner.style.visibility = 'visible';
    root.classList.add("loading");
    try{
        console.log(connectionData.data);
        console.log(connectionData.method);
        console.log(connectionData.urlServeur);
        const response = await serverCall(connectionData.urlServeur,connectionData.method,connectionData.data);
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
            errorHandler(error);
        }
        
    }
        
} 

export default serverCall;
