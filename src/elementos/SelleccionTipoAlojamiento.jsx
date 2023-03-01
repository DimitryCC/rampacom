import {useEffect, useState} from "react";
import filtroIdioma from "../JS/FiltroIdioma";
import { v4 as uuidv4 } from 'uuid';


function SelleccionTipoAlojamiento({valor,onchange}) {
    const[listaTipos, setListaTipos] = useState([]);
    useEffect(()=>{
       fetch('http://www.rampacom.com/ProyectoFinal/public/api/tipoalojamiento').then(
           response => {
               if(response.status == 200){
                   return response.json();
               }
           }
       ).then(data => {
               setListaTipos(filtroIdioma(data.result.data));
           }).catch(error=> {console.log(error);});
    },[]);
    return(
        <select id={"TipoAlojamiento"} name={"TA"} defaultValue={""}>
            {
                listaTipos.map((opcion)=>(
                    <option key={uuidv4()} value={opcion.ID}>{opcion.nombreTipo}</option>
                ))
            }
            <option key={uuidv4()} value={""}>Selecciona</option>
        </select>
    )
}
export default SelleccionTipoAlojamiento;