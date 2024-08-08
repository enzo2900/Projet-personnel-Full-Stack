import { useContext } from "react";
import { useConnectStatus } from "./Hooks/HooksCompte";
import { TokenContext } from "../TokenP";
import { TokenProvider } from "../TokenP";

export   function Connect(username,password,dataHandler, errorHandler) {
    
    console.log(errorHandler);
    console.log(username);
    useConnectStatus(username,password,(data) => {
        if(data.bearer !== null) {
            localStorage.setItem("bearer",data.bearer);
            console.log(data);
            localStorage.setItem("bearerDuration",parseInt(data.durationMinutes) *60*1000);
            dataHandler();
        }
    },(error)=>errorHandler(error));
}