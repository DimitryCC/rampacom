import { Navigate, Outlet } from "react-router-dom";
import Cookies from "js-cookie";

const ProtectedRoutesAdmin = () =>{
    const apiTokenCookie = Cookies.get('apiTokenCookie');
    console.log(apiTokenCookie);
    return (
        apiTokenCookie ? <Outlet/> : <Navigate to="/login" replace />
    )
}

export default ProtectedRoutesAdmin;
