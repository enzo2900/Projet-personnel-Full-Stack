
import '../App.css';
import React, { useEffect, useState,useContext, createContext } from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import AccountCreationPage from '../LinkPage/AccountCreationP.js';
import App from '../App.js';
import serverCall from '../Class/ApiManager.js';
import { makeServerCall } from '../Class/ApiManager.js';
import  {DisplayContext}  from '../Display.js';
import { ConnectionData } from '../Class/ConnectionData.js';
import {CenteredForm,FormRowC} from '../Component/UiComponent/CenteredForm';
import Home from '../LinkPage/Home.js';

function Login() {
    
    const changeDisplay = useContext(App);

    const [error, setError] = useState(null);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [token, setToken] = useState("");
    const [connected, setConnected] = useState(false);
    const  updateDisplay = useContext(DisplayContext);

    

    function goToAccountCreationPage() {
        updateDisplay(<AccountCreationPage />);
    }
    function goToHomePage() {
        updateDisplay(<Home/>);
    }
    const handleConnection = async () => {
        setError(null); // Réinitialiser l'erreur
        const connection =  {
            "username": username,
            "password": password
        };
        const datas = new ConnectionData("/connect","POST",JSON.stringify(connection));
        console.log(JSON.stringify(username,password));
        console.log(password);
            const resultRequest=makeServerCall(datas,(result) =>
                { 
                    if (result.bearer !== null){
                        localStorage.setItem("bearer","Bearer  "+result.bearer);

                        setToken("Bearer  "+result.bearer);
                        setConnected(true);
                        goToHomePage();
                    }
                }, (error) => setError(error + "Impossible de se connecter, un problème peut survenir au niveau du serveur. Veuillez réessayer plus tard.")
            );
    };

        let contentAffiche =  (
            <CenteredForm>
                <FormRowC id="usernameConnect" label="Username : ">
                    <input type="text" id="usernameConnect" value={username} onChange={(e) => setUsername(e.target.value)}/> <br/>
                </FormRowC>
                <FormRowC id="passwordConnect" label="Password : ">
                    <input type="password" id="passwordConnect" value={password} onChange={(e) => setPassword(e.target.value)}/><br/>
                </FormRowC>
                <button onClick={handleConnection}>Connection</button>
                <button onClick={goToAccountCreationPage}>Create an account</button>
            </CenteredForm>
            
        );
        if(connected) return <div className='center'>Vous êtes connectés : token : {token}</div>


    return (
    <div className="center">
        {contentAffiche}
        <br/>
        <div className="error">{error}</div>
        <div>{JSON.stringify(username)}</div>
    </div>
    );
}






export default Login;