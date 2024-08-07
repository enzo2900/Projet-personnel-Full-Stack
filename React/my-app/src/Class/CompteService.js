import { useConnectStatus } from "./Hooks/HooksCompte";

export async  function Connect(username,password,dataHandler, errorHandler) {
    console.log(errorHandler);
    console.log(username);
    useConnectStatus(username,password,(data) => {
        if(data.bearer !== null) {
            localStorage.setItem("bearer",data.bearer);
            dataHandler();
        }
    },(error)=>errorHandler(error));
}