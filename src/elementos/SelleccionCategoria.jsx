import {useEffect, useState} from "react";
import { v4 as uuidv4 } from 'uuid';

function SelleccionCategoria(valor) {
    const[listaCategorias, setListaCat] = useState([]);
    useEffect(()=>{
        fetch('http://www.rampacom.com/ProyectoFinal/public/api/categoria')
            .then(
                response => {
                    if(response.status == 200){
                        return response.json();
                    }
                }
            )
            .then(response => {
            setListaCat(response.result.data);
            }).catch(error => {
                console.log(error);
            });
        },[]);

    return(
        <select id={"TipoVacacional"} name={"C"} defaultValue={valor}>
            {
                listaCategorias.map((opcion)=>(
                    <option key={uuidv4()} value={opcion.ID}>{opcion.nombreCategoria}</option>
                ))
            }
            <option key={uuidv4()} value={""}>Selecciona</option>
        </select>
    )
}
export default SelleccionCategoria;