import {Form, h1, Col, Alert, Badge} from "react-bootstrap";
import {useState} from "react";
import {Link, useHistory, useNavigate} from "react-router-dom";
import Cookies from "js-cookie";
function CreaIdioma(props) {
    const [descripcion,setDescripcion]=useState("");
    const [idiomaID,setIdiomaId]=useState("");
    const [alojamientoId,setAlojamientoId]=useState("");
    const navigate = useNavigate();

    async function creaIdioma(){
        console.warn(descripcion, idiomaID, alojamientoId)
        const apiTokenCookie = Cookies.get('apiTokenCookie');
        let item={descripcion, idiomaID, alojamientoId}
        let result= await fetch("http://www.rampacom.com/ProyectoFinal/public/api/descripcion/crea",{
            method:'POST',
            headers:{
                "Content-Type":"application/json",
                "Accept":'application/json',
                "Authorization": "Bearer" + apiTokenCookie
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
                <h1><Badge bg="secondary">Crea una Descripcion</Badge></h1>
                <Form.Control type='text' placeholder='Descripcion'
                              onChange={(e)=>setDescripcion(e.target.value)}
                              className={"form.control"} value={descripcion}/>
                <br/>
                <Form.Control type='number' placeholder='IdiomaId'
                              onChange={(e)=>setIdiomaId(e.target.value)}
                              className={"form.control"} value={idiomaID}/>
                <br/>
                <Form.Control type='number' placeholder='AlojamientoId'
                              onChange={(e)=>setAlojamientoId(e.target.value)}
                              className={"form.control"} value={alojamientoId}/>
                <br/>
                <button onClick={creaIdioma} className={"btn btn-primary"}>Crea el Usuario</button>

            </div>
        </div>
    );
}
export default CreaIdioma;