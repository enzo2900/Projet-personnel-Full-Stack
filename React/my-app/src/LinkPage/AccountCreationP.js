import React, { useEffect, useState, useContext } from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import serverCall,{makeServerCall}from '../Class/ApiManager';
import { ConnectionData } from '../Class/ConnectionData';
import {CenteredForm,FormRowC, InputEmail, InputPassword, InputText} from '../Component/UiComponent/CenteredForm';
import Login from './Login';
import { DisplayContext } from '../Display';
import { ButtonReturn, ButtonSubmit } from '../Component/UiComponent/Button';
import { createCompte } from '../Class/CompteService';

function  AccountCreationPage() {
    const [username,setUsername] = useState("");
    const [password,setPassword] = useState("");
    const [response,setResponse] = useState("");
    const [passwordConfirm,setPasswordConfirm] = useState("");
    const [email,setEmail] = useState("");
    const [created,setCreated] = useState(false);

    const  {updateDisplay} = useContext(DisplayContext);

    const handleCreation = (e) =>{
        e.preventDefault();
        if(passwordConfirm === password) {
            const objet = {
                "username":username,
                "password":password,
                "email":email
            }
            createCompte(objet,() => {setResponse("Le compte a été créé.");
                setCreated(true);
            }, (error) => setResponse(error ));
        } else {
            setResponse("Les mots de passe ne correspondent pas.");
        }
    }
    function goToConnection() {
        updateDisplay(<Login/>);
    }

    if(created) {
        return (
            <CenteredForm>
                <ButtonReturn onClick={goToConnection} text="Se connecter"/>
                {response}
            </CenteredForm>
        );
    }
    return(
        <div className='centeredOnScreen'>
        <CenteredForm className="contour">
            <h1>Création de compte</h1>
            <form className="left" onSubmit={handleCreation}>

                <FormRowC label="Identifiant* : " id="usernameUser">
                    <InputText onChange={(e)=> setUsername(e.target.value)} id="usernameUser" value={username} />
                </FormRowC>
                <FormRowC label="Mot de passe* : " id="passwordUser">
                    <InputPassword onChange={(e) =>setPassword(e.target.value)} id="passwordUser" value={password}/>
                                </FormRowC>
                <FormRowC label="Mot de passe confirmation* : " id="passwordConfirmUser">
                <InputPassword onChange={(e) =>setPasswordConfirm(e.target.value)} id="passwordConfirmUser" value={passwordConfirm}/>
                
                </FormRowC>
                <FormRowC label="Email : " id="emailUser">
                    <InputEmail onChange={(e)=> setEmail(e.target.value)} value={email} id="emailUser" />
                </FormRowC>

                <div className=" center offset-9 col-3">
                    <ButtonSubmit className="" text="Créer"/>
                </div>

            </form>
            <div className="addSpaceOnTop"></div>
            <ButtonReturn className="takeAllSpace" onClick={goToConnection} text="Se connecter"/>
            {response}
        </CenteredForm>
        </div>
        
    )
}
export default AccountCreationPage;