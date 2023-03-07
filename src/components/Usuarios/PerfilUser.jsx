import {Form, h1, Col, Alert, Badge} from "react-bootstrap";
import {useState} from "react";
import {Link, useHistory, useNavigate} from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";
import bcrypt from 'bcryptjs';
function PerfilUser(props) {

    const navigate = useNavigate();
    const mailCookie = Cookies.get('mailCookie');
    const nombreCookie = Cookies.get('nombreCookie');
    const dniCookie = Cookies.get('dniCookie');
    const direccionCookie = Cookies.get('direccionCookie');
    const telefonoCookie = Cookies.get('telefonoCookie');
    const adminCookie = Cookies.get('adminCookie');
    const propietariCookie = Cookies.get('propietariCookie');
    const apiTokenCookie = Cookies.get('apiTokenCookie');
    const idCookie = Cookies.get('idCookie');
    const contrasenaCookie = Cookies.get('contrasenaCookie');
    const config = {
        headers: {
            Authorization: `Bearer ${apiTokenCookie}`
        }
    };
    const [usuarioSeleccionado, setUsuarioSeleccionado] = useState({
        ID: idCookie,
        DNI: dniCookie,
        nombreCompleto: nombreCookie,
        direccion: direccionCookie,
        correo: mailCookie,
        telefono: telefonoCookie,
        administrador: adminCookie,
        propietari: propietariCookie,
        contrasena: ''
    })
    const [DNI, setDNI] = useState(usuarioSeleccionado?.DNI || '');
    const handleDNIChange = (e) => {
        setDNI(e.target.value);
    };
    const [nombreCompleto, setNombreCompleto] = useState(usuarioSeleccionado?.nombreCompleto || '');
    const handleNombreCompletoChange = (e) => {
        setNombreCompleto(e.target.value);
    };
    const [direccion, setDireccion] = useState(usuarioSeleccionado?.direccion || '');
    const handleDireccionChange = (e) => {
        setDireccion(e.target.value);
    };
    const [correo, setCorreo] = useState(usuarioSeleccionado?.correo || '');
    const handleCorreoChange = (e) => {
        setCorreo(e.target.value);
    };
    const [telefono, setTelefono] = useState(usuarioSeleccionado?.telefono || '');
    const handleTelefonoChange = (e) => {
        setTelefono(e.target.value);
    };
    const [administrador, setAdministrador] = useState(usuarioSeleccionado?.administrador || '');
    const handleAdministradorChange = (e) => {
        setAdministrador(e.target.value);
    };
    const [propietari, setPropietari] = useState(usuarioSeleccionado?.propietari || '');
    const handlePropietariChange = (e) => {
        setPropietari(e.target.value);
    };
    const [contrasena, setContrasena] = useState(usuarioSeleccionado?.contrasena || '');
    const handleContrasenaChange = (e) => {
        setContrasena(e.target.value);
    };

    const handleChange = e => {
        const {name, value} = e.target;
        setUsuarioSeleccionado(prevState => ({
            ...prevState,
            [name]: value
        }))
        console.log(usuarioSeleccionado);
    }

    async function creaUser(){
        console.log(apiTokenCookie)
        console.warn(DNI,nombreCompleto,direccion,correo,telefono,propietari,contrasena)
        let item={DNI,nombreCompleto,direccion,correo,telefono,contrasena}
        let result= await fetch("http://www.rampacom.com/ProyectoFinal/public/api/usuario/modifica/"+ usuarioSeleccionado.ID,{
                method:'PUT',
                headers: {
                    Authorization: 'Bearer ' + apiTokenCookie,
                    'Content-Type': 'application/json'
                },
            body: JSON.stringify(item)
        });
        result = await result.json();
        console.log(apiTokenCookie);
        const adminCookie = Cookies.get('adminCookie');
        console.log(adminCookie);
        navigate("/login")
    }

    const peticionPut = async () => {
        const hashedPassword = bcrypt.hashSync(usuarioSeleccionado.contrasena);
        setUsuarioSeleccionado(prevState => ({
            ...prevState,
            contrasena: hashedPassword
        }));
        console.log(usuarioSeleccionado.ID);
        await axios.put('http://www.rampacom.com/ProyectoFinal/public/api/usuario/modifica/' + usuarioSeleccionado.ID, usuarioSeleccionado, config)
            .then(response => {
                navigate("/login")
            })
    }

    return (
        <div>
            <div className={'col-sm-6 offset-sm-3'}>
                <h1><Badge bg="secondary">Perfil Usuario</Badge></h1>
                <Form.Control type='text' placeholder='DNI'
                              onChange={handleDNIChange}
                              className={"form.control"} value={DNI}/>
                <br/>
                <Form.Control type='text' placeholder='Nombre Completo'
                              onChange={handleNombreCompletoChange}
                              className={"form.control"} value={nombreCompleto}/>
                <br/>
                <Form.Control type='text' placeholder='Direccion'
                              onChange={handleDireccionChange}
                              className={"form.control"} value={direccion}/>
                <br/>
                <Form.Control type='text' placeholder='Mail'
                              onChange={handleCorreoChange}
                              className={"form.control"} value={correo}/>
                <br/>
                <Form.Control type='text' placeholder='Telefono'
                              onChange={handleTelefonoChange}
                              className={"form.control"} value={telefono}/>
                <br/>
                <Form.Control type='text' placeholder='Propietario'
                              onChange={handlePropietariChange}
                              className={"form.control"} value={propietari}/>
                <br/>
                <Form.Control type='text' placeholder='Clave password'
                              onChange={handleContrasenaChange}
                              className={"form.control"} value={contrasena}/>
                <br/>
                <button onClick={creaUser} className={"btn btn-primary"}>Modifica</button>

            </div>
        </div>
    );
}
export default PerfilUser;