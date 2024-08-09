import { useState, useEffect } from "react";
import { ConnectionData } from "../ConnectionData";
import { makeServerCall } from "../ApiManager";
export function useConnectStatus(username,password,dataHandler,errorHandler) {
    console.log(errorHandler);
    console.log(username);
    const connection =  {
        "username": username,
        "password": password
    };
    const datas = new ConnectionData("/connect","POST",JSON.stringify(connection));

    makeServerCall((datas),(result) =>
            { 
                dataHandler(result)
                    
                },
            (error) =>errorHandler(error));
}