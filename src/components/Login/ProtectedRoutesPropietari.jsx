import { Navigate, Outlet } from "react-router-dom";
import Cookies from "js-cookie";

const ProtectedRoutesPropietari = () =>{
    const propietariCookie = Cookies.get('propietariCookie');
    console.log(propietariCookie);
    return (
        propietariCookie === "1" ? <Outlet/> : <Navigate to="/login" replace />
    )
}

export default ProtectedRoutesPropietari;
