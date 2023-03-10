import SelleccionTipoAlojamiento from "./SelleccionTipoAlojamiento";
import SelleccionTipoVacacional from "./SelleccionTipoVacacional";
import Categoria from "../components/Frontend/Categoria";
import {Link} from "react-router-dom";
import {useEffect, useState} from "react";
import {v4 as uuidv4} from "uuid";
import axios from "axios";

function MenuFiltro() {
    const [Aforo, setAforo] = useState(0);
    const [Habitaciones, setHabitaciones] = useState(0);
    const [Camas, setCamsa] = useState(0);
    const [Banos, setBanos] = useState(0);
    /*const [TipoAlojameinto, setTipoAlojamiento] = useState('');*/
    const [Alojamientos, setAlojamientos] = useState([]);
    useEffect(()=>{
        axios.get('http://www.rampacom.com/ProyectoFinal/public/api/alojamiento')
            .then(response=>{
                setAlojamientos(response.data.result.data);
            })
            .catch(function (error) {
                console.log(error);
            })
    },[]);
    const filtrados = Alojamientos.filter((A)=> {
        const aforo = A.numeroPersonas >=Aforo;
        const habitaciones = A.numeroHabitaciones >=Habitaciones;
        const camas = A.numeroCamas >= Camas;
        const banos = A.numeroBanos >= Banos;
        return aforo && habitaciones && camas && banos;
    });
    function cambio(e){
        switch (e.target.name) {
            case "NP":
                setAforo(e.target.value);
                break;
            case "NH":
                setHabitaciones(e.target.value);
                break;
            case "NC":
                setCamsa(e.target.value);
                break;
            case "NB":
                setBanos(e.target.value);
                break;
            case "TA":
                /*setTipoAlojamiento(e.target.value);*/
                break;
            case "TV":
                break;
            case "C":
                break;
            default:
                break;
        }
        mostrar(filtrados);
    }
    function mostrar(listaAlojamientos) {
        return(
            <>
                <form key={uuidv4()} onChange={cambio}>
                    <label id={"NP"} >Aforo minimo:<br/> <input key={uuidv4()} id={"NP"} value={Aforo} type="number" name="NP"/></label>
                    <label id={"NH"}>Nuemro de habitaciones: <input id={"NH"} key={uuidv4()} value={Habitaciones} type="number" name="NH"/></label>
                    <label id={"NC"}>Numero de Camas: <input id={"NC"} key={uuidv4()} value={Camas} type="number" name="NC"/></label>
                    <label id={"NB"}>Numero de Baños: <input id={"NB"} key={uuidv4()} value={Banos} type="number" name="NB"/></label>
                    <SelleccionTipoAlojamiento/>
                    <SelleccionTipoVacacional/>
                    <Categoria/>
                </form>
                <section key={uuidv4()}>
                    {
                        listaAlojamientos.map((alojamiento)=>(
                            <article key={uuidv4()} id={alojamiento.ID} className={"alojamiento"}>
                                <h1>{alojamiento.nombre}</h1>
                                <h2>{alojamiento.direction}</h2>
                                <table>
                                    <thead>
                                    <tr>
                                        <th>Aforo</th>
                                        <th>Habitaciones</th>
                                        <th>Camas</th>
                                        <th>Baños</th>
                                        <th>Alojamiento</th>
                                        <th>Vacacional</th>
                                        <th>Categoria</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr>
                                        <td>{alojamiento.numeroPersonas}</td>
                                        <td>{alojamiento.numeroHabitaciones}</td>
                                        <td>{alojamiento.numeroCamas}</td>
                                        <td>{alojamiento.numeroBanos}</td>
                                        <td>{alojamiento.tipoAlojamiento}</td>
                                        <td>{alojamiento.tipoVacacional}</td>
                                        <td>{alojamiento.categoria}</td>
                                    </tr>
                                    </tbody>
                                </table>
                                <br/>
                                <p>{alojamiento.descripcion}</p>
                                <Link to={'/alojamiento/'+alojamiento.ID}>Ir a la ruta con el id</Link>
                            </article>
                        ))
                    }
                </section>
            </>
        )
    }
    return(mostrar(filtrados))
}
export default MenuFiltro;