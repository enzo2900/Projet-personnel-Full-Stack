import { useState, useEffect } from "react";
import { ConnectionData } from "../ConnectionData";
import { makeServerCall } from "../ApiManager";
import { isAPassword } from "../Compte.ts";
export function useConnectStatus(username,password,dataHandler,errorHandler) {

    if(!isAPassword(password)) {
        errorHandler("Le mot de passe ou l'identifiant est incorrecte");
        return false;
    }
    const connection =  {
        "username": username,
        "password": password
    };
    const datas = new ConnectionData("/connect","POST",JSON.stringify(connection));

    makeServerCall((datas),(result) =>
            { 
                dataHandler(result)
                    
                },
            (error) =>errorHandler("Le mot de passe ou l'identifiant est incorrecte"));
}