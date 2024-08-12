import { useContext } from "react";
import { useConnectStatus } from "./Hooks/HooksCompte";
import { TokenContext } from "../TokenP";
import { TokenProvider } from "../TokenP";
import { ConnectionData } from "./ConnectionData";
import { makeServerCall } from "./ApiManager";
import { Token } from "./Token.ts";
import { isAPassword } from "./Compte.ts";
export   function Connect(username,password,dataHandler, errorHandler) {
    
    console.log(errorHandler);
    console.log(username);
    
    useConnectStatus(username,password,(data) => {
        if(data.bearer !== null) {
            localStorage.setItem("bearer",data.bearer);
            console.log(data);
            localStorage.setItem("bearerDuration",parseInt(data.durationMinutes) *60*1000);
            Token.getSingleton().setValue(data.bearer);
            Token.getSingleton().setDuration(data.durationMinutes*1000*60);
            Token.getSingleton().beginTimer();
            dataHandler();
        }
    },(error)=>errorHandler(error));
}

export function sendPost(text,dataHandler, errorHandler){
    const data =  {
        "mainUserCommentary": text,
    };
    const datas = new ConnectionData("/post/add","PUT",JSON.stringify(data));
    makeServerCall(datas,(dataApi) =>dataHandler(dataApi),(error) =>errorHandler(error));
}
export function createCompte(connectionInfo,dataHandler,errorHandler) {
    console.log(connectionInfo);
    if(!isAPassword(connectionInfo.password)) {
        errorHandler("Le mot de passe doit avoir 8 caractères avec au moins une lettre en majuscule et miniscule, 1 chiffre et 1 caractères spécial.")
        return false;
    }
    const datas = new ConnectionData("/inscription","POST",JSON.stringify(connectionInfo));
    makeServerCall(datas,() => {dataHandler()
    }, (error) => errorHandler(error));
}
export function verifyToken(token,dataHandler,errorHandler){
    const data= {
        "valeur": token
    };
    
    const datas = new ConnectionData("/VerifyToken","POST",JSON.stringify(data));
    makeServerCall(datas,(dataApi) =>dataHandler(dataApi),(error)=> errorHandler(error));
}