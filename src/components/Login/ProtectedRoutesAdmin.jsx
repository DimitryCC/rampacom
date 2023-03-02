import { Navigate, Outlet } from "react-router-dom";
import Cookies from "js-cookie";

const ProtectedRoutesAdmin = () =>{
    const adminCookie = Cookies.get('adminCookie');
    console.log(adminCookie);
    return (
        adminCookie === "1" ? <Outlet/> : <Navigate to="/login" replace />
    )
}

export default ProtectedRoutesAdmin;
