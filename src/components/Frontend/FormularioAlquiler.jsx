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
    function alterar(e) {
       e.preventDefault();
       let FechaInicio = e.fechaInicio.value;
       let FechaFinal = e.fechaFinal.value;
       FechaInicio = FormarFecha(FechaInicio);
       FechaFinal = FormarFecha(FechaFinal);
       e.fechaInicio.value = FechaInicio;
       e.fechaFinal.value = FechaFinal;
       e.submit();
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
        <div style={{display: "flex", flexDirection: "row"}}>
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
            </table><br/>
        <form action="" method="post" class={"form-group"} style={{width: '50%', overflow: "scroll"}}>
            <input type={"hidden"} value={props.IdAlojamiento} />
            <input type={"hidden"} value={Cookies.get("idCookie")} />
            <input name={"fechaInicio"} type={"date"} class={"form-control"} onChange={Comprovar}/>
            <input name={"fechaFinal"} type={"date"} class={"form-control"} onChange={Comprovar}/><br/>
            <button id={"Boton"} onSubmit={alterar} type={"submit"}  class={"btn btn-primary"} style={{width: "100%"}}>Reserva ya!</button>
        </form>
        </div>
    )
}
export default FormularioAlquiler;