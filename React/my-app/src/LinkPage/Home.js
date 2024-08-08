import React, { useContext } from "react";
import { DisplayContext } from "../Display";
import Login from "./Login";
import { TokenContext, TokenProvider } from "../TokenP.js";
import App from "../App.js";
export default function Home() {
const udpateToken = useContext(TokenContext);
console.log(udpateToken);
    const updateDisplay = useContext(DisplayContext);
    console.log(localStorage.getItem("bearerDuration"));
    if(localStorage.getItem("bearer") === null) {
        updateDisplay(<Login/>);
    } else {
        localStorage.setItem("bearerduration",udpateToken);
    }
    return(
        <>
            Home Accees
        </>
    );
}