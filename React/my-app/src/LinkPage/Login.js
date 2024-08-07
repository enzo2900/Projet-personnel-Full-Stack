
import '../App.css';
import React, { useEffect, useState,useContext, createContext } from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import AccountCreationPage from '../LinkPage/AccountCreationP.js';
import App from '../App.js';
import serverCall from '../Class/ApiManager.js';
import { makeServerCall } from '../Class/ApiManager.js';
import  {DisplayContext}  from '../Display.js';
import { ConnectionData } from '../Class/ConnectionData.js';
import {CenteredForm,FormRowC, InputPassword, InputText} from '../Component/UiComponent/CenteredForm';
import Home from '../LinkPage/Home.js';
import { ButtonReturn } from '../Component/UiComponent/Button.js';
import { Connect } from '../Class/CompteService.js';

function Login() {
    
    const changeDisplay = useContext(App);

    const [error, setError] = useState(null);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const  updateDisplay = useContext(DisplayContext);

    

    function goToAccountCreationPage() {
        updateDisplay(<AccountCreationPage />);
    }
    function goToHomePage() {
        updateDisplay(<Home/>);
    }
    const handleConnection = async () => {

        setError(null); // Réinitialiser l'erreur
        await Connect(username, password,goToHomePage,  (error) => setError(error));
    };

        let contentAffiche =  (
            <CenteredForm>
                <FormRowC id="usernameConnect" label="Username : ">
                    <InputText id="usernameConnect" value={username} onChange={(e) => setUsername(e.target.value)}/>
                </FormRowC>
                <FormRowC id="passwordConnect" label="Password : ">
                    <InputPassword id="passwordConnect" value={password} onChange={(e) => setPassword(e.target.value)}/>
                </FormRowC>
                <button onClick={handleConnection}>Connection</button>
                <ButtonReturn onClick={goToAccountCreationPage} text="Create an account"/>
            </CenteredForm>
            
        );


    return (
    <div className="center">
        {contentAffiche}
        <br/>
        <div className="error">{error}</div>

    </div>
    );
}






export default Login;