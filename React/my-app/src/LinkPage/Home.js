import React, { useContext } from "react";
import { DisplayContext } from "../Display";
import Login from "./Login";
export default function Home() {

    const updateDisplay = useContext(DisplayContext);
    if(localStorage.getItem("bearer") === null) {
        updateDisplay(<Login/>);
    }
    return(
        <>
            Home Accees
        </>
    );
}