import React, { useEffect, useState, useContext } from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import serverCall,{makeServerCall}from '../Class/ApiManager';
import { ConnectionData } from '../Class/ConnectionData';
import {CenteredForm,FormRowC} from '../Component/UiComponent/CenteredForm';
import Login from './Login';
import { DisplayContext } from '../Display';

function  AccountCreationPage() {
    const [username,setUsername] = useState("");
    const [password,setPassword] = useState("");
    const [response,setResponse] = useState("");
    const [passwordConfirm,setPasswordConfirm] = useState("");
    const [email,setEmail] = useState("");

    const  updateDisplay = useContext(DisplayContext);

    const handleCreation = (e) =>{
        e.preventDefault();
        console.log(document.getElementById("confirmPasswordUser").innerText);
        if(passwordConfirm === password) {
            const objet = {
                "username":username,
                "password":password,
                "email":email
            }
            const datas = new ConnectionData("/inscription","POST",JSON.stringify(objet));
            makeServerCall(datas,() => setResponse("Le compte a été créé."), (error) => setResponse(error + "Impossible de se connecter, un problème peut survenir au niveau du serveur. Veuillez réessayer plus tard."));
        } else {
            setResponse("Les mots de passe ne correspondent pas.");
        }
    }
    function goToConnection() {
        updateDisplay(<Login/>);
    }
    return(
        <CenteredForm>
            <h1>Création de compte</h1>
            <form className="left" onSubmit={handleCreation}>

                <FormRowC label="Identifiant* : " id="usernameUser">
                    <input onChange={(e)=> setUsername(e.target.value)}type="Text" id="usernameUser" value={username} required></input>
                </FormRowC>
                <FormRowC label="Mot de passe* : " id="passwordUser">
                <input onChange={(e) =>setPassword(e.target.value)}type="password" id="passwordUser" value={password} required></input>
                </FormRowC>
                <FormRowC label="Mot de passe confirmation* : " id="passwordConfirmUser">
                <input onChange={(e)=> setPasswordConfirm(e.target.value)} type="password" value={passwordConfirm} id="confirmPasswordUser" required></input>

                </FormRowC>
                <FormRowC label="Email : " id="emailUser">
                <input onChange={(e)=> setEmail(e.target.value)} type="mail" value={email} id="emailUser" ></input>
                </FormRowC>

                <div className="center offset-1 col-11">
                    <input type="submit"></input>
                </div>

            </form>
            <button onClick={goToConnection}>Se connecter</button>
            {response}
        </CenteredForm>
        
    )
}
export default AccountCreationPage;