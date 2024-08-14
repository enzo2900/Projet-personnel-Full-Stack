import { useNavigate } from "react-router-dom"

export function useTokenExpired() {
    const navigate = useNavigate();
    if(localStorage.getItem("bearer")===null) {
        return () =>navigate("/");
    } else {
        return ;
    }
}