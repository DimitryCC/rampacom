import {useEffect, useState} from "react";
import { v4 as uuidv4 } from 'uuid';

function Categoria(props) {
    console.log("hola");
    const[listaCategorias, setListaCat] = useState([]);
    useEffect(()=>{
        fetch('http://www.rampacom.com/ProyectoFinal/public/api/categoria')
            .then(
                response => {
                    if(response.status == 200){
                        console.log(response.result.data);
                        setListaCat(response.result.data);
                    }

                }
            ).catch(error => {
                console.log(error);
            });
        },[]);
    console.log(props.IdCategoria);
    let mostrar = listaCategorias.find(cat => cat.ID == props.IdCategoria);
    console.log(mostrar);
    return(
        <td>HOLA</td>
    )
}
export default Categoria;