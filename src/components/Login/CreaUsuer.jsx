import {Form, h1, Col, Alert, Badge} from "react-bootstrap";
import {useState} from "react";
import {Link, useHistory, useNavigate} from "react-router-dom";
import Cookies from "js-cookie";
function CreaUser(props) {
    const [DNI,setDNI]=useState("");
    const [nombreCompleto,setNombreCompleto]=useState("");
    const [direccion,setDireccion]=useState("");
    const [correo,setCorreo]=useState("");
    const [telefono,setTelefono]=useState("");
    const [contrasena,setContrasena]=useState("");
    const navigate = useNavigate();

    async function creaUser(){
        console.warn(DNI,nombreCompleto,direccion,correo,telefono,contrasena)
        let item={DNI,nombreCompleto,direccion,correo,telefono,contrasena}
        let result= await fetch("http://www.rampacom.com/ProyectoFinal/public/api/usuario/crea",{
            method:'POST',
            headers:{
                "Content-Type":"application/json",
                "Accept":'application/json'
            },
            body: JSON.stringify(item)
        });
        result = await result.json();
        const apiTokenCookie = Cookies.get('apiTokenCookie');
        console.log(apiTokenCookie);
        const adminCookie = Cookies.get('adminCookie');
        console.log(adminCookie);
        navigate("/login")
    }

    return (
        <div>
            <div className={'col-sm-6 offset-sm-3'}>
                <h1><Badge bg="secondary">Registrate</Badge></h1>
                <Form.Control type='text' placeholder='DNI'
                              onChange={(e)=>setDNI(e.target.value)}
                              className={"form.control"} value={DNI}/>
                <br/>
                <Form.Control type='text' placeholder='Nombre Completo'
                              onChange={(e)=>setNombreCompleto(e.target.value)}
                              className={"form.control"} value={nombreCompleto}/>
                <br/>
                <Form.Control type='text' placeholder='Direccion'
                              onChange={(e)=>setDireccion(e.target.value)}
                              className={"form.control"} value={direccion}/>
                <br/>
                <Form.Control type='text' placeholder='Mail'
                              onChange={(e)=>setCorreo(e.target.value)}
                              className={"form.control"} value={correo}/>
                <br/>
                <Form.Control type='text' placeholder='Telefono'
                              onChange={(e)=>setTelefono(e.target.value)}
                              className={"form.control"} value={telefono}/>
                <br/>
                <Form.Control type='text' placeholder='Clave password'
                              onChange={(e)=>setContrasena(e.target.value)}
                              className={"form.control"} value={contrasena}/>
                <br/>
                <button onClick={creaUser} className={"btn btn-primary"}>Crea el Usuario</button>

            </div>
        </div>
    );
}
export default CreaUser;