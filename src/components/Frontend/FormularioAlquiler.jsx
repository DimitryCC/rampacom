import dayjs from 'dayjs';
import { StaticDateRangePicker } from '@mui/x-date-pickers-pro/StaticDateRangePicker';
import Cookies from "js-cookie";
import FormarFecha from "../../JS/FormarFecha";
import axios from "axios";
import {useEffect, useState} from "react";
import {forEach} from "react-bootstrap/ElementChildren";

function FormularioAlquiler(props) {
    const [reservas, setRreservas] = useState([]);
    useEffect(()=>{
        axios.get("http://www.rampacom.com/ProyectoFinal/public/api/reserva/aloja/"+props.IdAlojamiento)
            .then(result => {
                setRreservas(result.data.result);
                console.log(result.data.result);
            })
            .catch(error =>{
                console.log(error);
            })
    },[])
    const config = {
        headers: {
            Authorization: `Bearer ${Cookies.get("apiTokenCookie")}`
        }
    };
    function alterar(e) {
            let FechaInicio = e.fechaInicio.value;
            let FechaFinal = e.fechaFinal.value;
            FechaInicio = FormarFecha(FechaInicio);
            FechaFinal = FormarFecha(FechaFinal);
            e.fechaInicio.value = FechaInicio;
            e.fechaFinal.value = FechaFinal;
            axios.post('http://www.rampacom.com/ProyectoFinal/public/api/descripcion/crea', e, config)
            .then(response => {
                window.location.reload(false);
            }).catch(response => console.log(response));
    }
    function Comprovar(e) {
        let form = e.target.value;
        reservas.forEach((reserva)=>{
            if (form < reserva.FechaInicio || form > reserva.FechaFin){
                alert("Esta fecha no es valida!");
            }
        });
    }
    return(
        <div style={{display: "flex", flexDirection: "column",alignItems: "center", textAlign: "center", fontWeight: "bold", margin: "1%", padding: "1%", height: "80vh", justifyContent: "center", border: "15px solid lightgrey", borderRadius: "43px", backgroundColor: "lightblue"}}>
            <h1>Fechas Alquiladas actuales</h1>
            <table style={{width: '50%', height: '500px', overflow: "scroll"}} class={"table table-striped"}>
                <thead>
                    <tr>
                        <th>Fechas Inicio</th>
                        <th>Fecha Final</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        reservas.map((reserva) =>(
                            <tr>
                                <td>{reserva.FechaInicio}</td>
                                <td>{reserva.FechaFin}</td>
                            </tr>
                        ))
                    }
                </tbody>
            </table><br/><br/>
            <a href={"/reservesusuario"}><button id={"Boton"} onSubmit={alterar} type={"button"}  class={"btn btn-primary"} style={{width: "100%"}}>Reserva ya!</button></a>
        </div>
    )
}
export default FormularioAlquiler;