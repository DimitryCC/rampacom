import {Form, h1, Col, Alert, Badge} from "react-bootstrap";
import {useState} from "react";
import {Link, useHistory, useNavigate} from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";
function Login(props) {
    const [correo,setCorreo]=useState("");
    const [contrasena,setContrasena]=useState("");
    const apiTokenCookie= Cookies.get('apiTokenCookie');
    const mystyle = {
        alignItems: 'center',
        textAlign: 'center',
        fontWeight: 'bold',
        margin: '1%',
        padding: '1%',
        height: '80vh',
        justifyContent: 'center',
        border: '15px solid lightgrey',
        borderRadius: '43px 43px 43px 43px',
        backgroundColor: 'lightblue'
    };
    const mystyleLogin = {
        marginTop: '5%',
    };
    const config = {
        headers: {
            Authorization: `Bearer ${apiTokenCookie}`
        }
    };
    const navigate = useNavigate();

    async function login(){
        console.warn(correo,contrasena)
        let item={correo,contrasena}
        let result= await fetch("http://www.rampacom.com/ProyectoFinal/public/api/Log/in",{
            method:'POST',
            headers:{
                "Content-Type":"application/json",
                "Accept":'application/json'
            },
            body: JSON.stringify(item)
        });
        result = await result.json();
        Cookies.set("user-info",JSON.stringify(result));
        Cookies.set("idCookie",result.result.ID);
        Cookies.set("apiTokenCookie",result.result.apiToken);
        Cookies.set("adminCookie",result.result.administrador);
        Cookies.set("mailCookie",result.result.correo);
        Cookies.set("nombreCookie",result.result.nombreCompleto);
        Cookies.set("direccionCookie",result.result.direccion);
        Cookies.set("dniCookie",result.result.DNI);
        Cookies.set("telefonoCookie",result.result.telefono);
        Cookies.set("propietariCookie",result.result.propietari);
        Cookies.set("contrasenaCookie",result.result.contrasena);
        const apiTokenCookie = Cookies.get('apiTokenCookie');
        console.log(apiTokenCookie);
        const adminCookie = Cookies.get('adminCookie');
        console.log(adminCookie);
        if(adminCookie == 0){
            navigate("/inicio")
            window.location.reload(false);
        }
       else if(adminCookie == 1){
            Cookies.set("adminHerr",'Herr. Admin');
            navigate("/adminselect")
            window.location.reload(false);
        }
    }

    const logout = async () => {
        await axios.post('http://www.rampacom.com/ProyectoFinal/public/api/Log/out', apiTokenCookie, config)
            .then(response => {
                Cookies.remove('user-info');
                Cookies.remove('apiTokenCookie');
                Cookies.remove('adminCookie');
                Cookies.remove('nombreCookie');
                Cookies.remove('mailCookie');
                Cookies.remove('direccionCookie');
                Cookies.remove('dniCookie');
                Cookies.remove('telefonoCookie');
                Cookies.remove('adminHerr');
                alert('Hasta Pronto')
                navigate("/inicio")
                window.location.reload(false);
            })
    }

    return (
        <div style={mystyle}>
            <div className={'col-sm-6 offset-sm-3'} style={mystyleLogin}>
            <h1><Badge bg="secondary">Login</Badge></h1>
            <Form.Control type='text' placeholder='correo'
                   onChange={(e)=>setCorreo(e.target.value)}
                   className={"form.control"} value={correo}/>
            <br/>
            <Form.Control type='password' placeholder='password'
                   onChange={(e)=>setContrasena(e.target.value)}
                   className={"form.control"} value={contrasena}/>
            <br/>
            <button onClick={login} className={"btn btn-primary"}>Login</button>
            <button onClick={() => logout()} className={"btn btn-secondary"}>Logout</button>
                <Link to={'/creauser/'}>Registrate</Link>
            </div>
        </div>
    );
}
export default Login;