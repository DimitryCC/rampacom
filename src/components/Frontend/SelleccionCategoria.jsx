import {useEffect, useState} from "react";
import { v4 as uuidv4 } from 'uuid';
import Cookies from "js-cookie";
import axios from "axios";
import filtroIdioma from "../../JS/FiltroIdioma";

function SelleccionCategoria(props) {
    const cat = props.lista.value.find((F)=> F.ID === props.IdAlojamiento);
    //{TipoAlojameinto.find((F)=> {F.ID === alojamiento.tipoAlojamiento;return F.nombreTipo;})}
    return(
        <td>{cat.nombreTipo}</td>
    )
}
export default SelleccionCategoria;