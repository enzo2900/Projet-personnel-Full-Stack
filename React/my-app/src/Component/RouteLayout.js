import { Routes,Route } from "react-router-dom";
import AccountCreationPage from "../LinkPage/AccountCreationP";
import Login from "../LinkPage/Login";
import Home from "../LinkPage/Home";
export function RouteLayout() {
    return (
        <Routes>
            <Route path="/" element={<Login/>}/>
            <Route path="CreateAccount" element={<AccountCreationPage/>}/>
            <Route path="Home" element={<Home/>}/>
            <Route path="*" element={<Login/>}/>
        </Routes>
    );
}