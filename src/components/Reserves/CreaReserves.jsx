import {Form, h1, Col, Alert, Badge} from "react-bootstrap";
import {useState} from "react";
import {Link, useHistory, useNavigate} from "react-router-dom";
import Cookies from "js-cookie";
function CreaReserves(props) {
    const [usuarioId,setUsuarioId]=useState("");
    const [AlojamientoId,setAlojamientoId]=useState("");
    const [FechaInicio,setFechaInicio]=useState("");
    const [FechaFin,setFechaFin]=useState("");

    const navigate = useNavigate();

    async function creaReserves(){
        console.warn(usuarioId,AlojamientoId,FechaInicio,FechaFin)
        const apiTokenCookie = Cookies.get('apiTokenCookie');
        let item={usuarioId,AlojamientoId,FechaInicio,FechaFin}
        let result= await fetch("http://www.rampacom.com/ProyectoFinal/public/api/usuario/crea",{
            method:'POST',
            headers:{
                "Content-Type":"application/json",
                "Accept":'application/json',
                "Authorization": "Bearer" + apiTokenCookie
            },
            body: JSON.stringify(item)
        });
        result = await result.json();
        navigate("/alojamientos")
    }

    return (
        <div>
            <div className={'col-sm-6 offset-sm-3'}>
                <br/>
                <h1><Badge bg="secondary">Crea Una Reserva</Badge></h1>
                <Form.Control type='text' placeholder='Id Del Usuario'
                              onChange={(e)=>setUsuarioId(e.target.value)}
                              className={"form.control"} value={usuarioId}/>
                <br/>
                <Form.Control type='text' placeholder='Id Del Alojamiento'
                              onChange={(e)=>setAlojamientoId(e.target.value)}
                              className={"form.control"} value={AlojamientoId}/>
                <br/>
                <Form.Control type='text' placeholder={new Date().toISOString().substr(0,10)}
                              pattern="\d{4}-\d{2}-\d{2}"
                              onChange={(e)=>setFechaInicio(e.target.value)}
                              className={"form.control"} value={FechaInicio} />
                <br/>
                <Form.Control type='text' placeholder={new Date().toISOString().substr(0,10)}
                              pattern="\d{4}-\d{2}-\d{2}"
                              onChange={(e)=>setFechaFin(e.target.value)}
                              className={"form.control"} value={FechaFin} />
                <br/>
                <button onClick={creaReserves} className={"btn btn-primary"}>Crea la Reserva</button>

            </div>
        </div>
    );
}
export default CreaReserves;