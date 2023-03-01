import {useEffect, useState} from "react";
import filtroIdioma from "../JS/FiltroIdioma";
import {v4 as uuidv4} from "uuid";

function SelleccionTipoVacacional(valor, onchange) {
    const[listaVacacional, setListaVac] = useState([]);
    useEffect(()=>{
        fetch('http://www.rampacom.com/ProyectoFinal/public/api/tipovacacional').then(
            response => {
                if(response.status == 200){
                    return response.json();
                }
            }
        ).then(data => (filtroIdioma(data.result.data))
        ).then(mostrar => {
            setListaVac(mostrar);
            }
        ).catch(error=> {
            console.log(error);
        });
    },[]);
    return(
        <select id={"TipoAlojamientoContainer"} name={"TV"} defaultValue={""}>
            {
                listaVacacional.map((opcion)=>(
                    <option key={uuidv4()} value={opcion.ID}>{opcion.nombreTipo}</option>
                ))
            }
            <option key={uuidv4()} value={""}>Selecciona</option>
        </select>
    )
}
export default SelleccionTipoVacacional;