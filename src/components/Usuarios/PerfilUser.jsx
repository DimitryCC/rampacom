import {Form, h1, Col, Alert, Badge} from "react-bootstrap";
import {useState} from "react";
import {Link, useHistory, useNavigate} from "react-router-dom";
import Cookies from "js-cookie";
function PerfilUser(props) {
    const [DNI,setDNI]=useState("");
    const [nombreCompleto,setNombreCompleto]=useState("");
    const [direccion,setDireccion]=useState("");
    const [correo,setCorreo]=useState("");
    const [telefono,setTelefono]=useState("");
    const [contrasena,setContrasena]=useState("");
    const navigate = useNavigate();
    const mailCookie = Cookies.get('mailCookie');
    const nombreCookie = Cookies.get('nombreCookie');
    const dniCookie = Cookies.get('dniCookie');
    const direccionCookie = Cookies.get('direccionCookie');
    const telefonoCookie = Cookies.get('telefonoCookie');

    const idCookie = Cookies.get('idCookie');


    async function creaUser(){
        const apiTokenCookie = Cookies.get('apiTokenCookie');
        console.warn(DNI,nombreCompleto,direccion,correo,telefono,contrasena)
        let item={DNI,nombreCompleto,direccion,correo,telefono,contrasena}
        let result= await fetch("http://www.rampacom.com/ProyectoFinal/public/api/usuario/modifica/"+ idCookie,{
                method:'PUT',
                headers: {
                    Accept: 'application/json',
                    Authentication: 'Bearer ' + apiTokenCookie,
                    'X-Custom-Header': 'header value'
                },
            body: JSON.stringify(item)
        });
        result = await result.json();
        console.log(apiTokenCookie);
        const adminCookie = Cookies.get('adminCookie');
        console.log(adminCookie);
        navigate("/login")
    }

    return (
        <div>
            <div className={'col-sm-6 offset-sm-3'}>
                <br/>
                <h1><Badge bg="secondary">Modifica tu Usuario</Badge></h1>
                <Form.Control type='text' placeholder='DNI'
                              onChange={(e)=>setDNI(e.target.value)}
                              className={"form.control"} value={dniCookie}/>
                <br/>
                <Form.Control type='text' placeholder='Nombre Completo'
                              onChange={(e)=>setNombreCompleto(e.target.value)}
                              className={"form.control"} value={nombreCookie}/>
                <br/>
                <Form.Control type='text' placeholder='Direccion'
                              onChange={(e)=>setDireccion(e.target.value)}
                              className={"form.control"} value={direccionCookie}/>
                <br/>
                <Form.Control type='text' placeholder='Mail'
                              onChange={(e)=>setCorreo(e.target.value)}
                              className={"form.control"} value={mailCookie}/>
                <br/>
                <Form.Control type='text' placeholder='Telefono'
                              onChange={(e)=>setTelefono(e.target.value)}
                              className={"form.control"} value={telefonoCookie}/>
                <br/>
                <Form.Control type='text' placeholder='Clave password'
                              onChange={(e)=>setContrasena(e.target.value)}
                              className={"form.control"} value={contrasena}/>
                <br/>
                <button onClick={creaUser} className={"btn btn-primary"}>Modifica</button>

            </div>
        </div>
    );
}
export default PerfilUser;