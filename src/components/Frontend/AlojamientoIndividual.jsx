import {Link, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import MostrarFoto from "./MostrarFoto";
import CargarValoraciones from "./CargarValoraciones";

function AlojamientoIndividual() {
    const { alojaminetoId } = useParams();
    const [alojemiento, setListaAlojamientos] = useState('');
    const [caregant, setCaregant] =useState(true);
    useEffect(() => {
        fetch('http://www.rampacom.com/ProyectoFinal/public/api/alojamiento/'+alojaminetoId)
            .then(response => response.json())
            .then(data => {
                setListaAlojamientos(data.result);
                setCaregant(false);
            })
            .catch(error => {
                console.error(error);
                setCaregant(false);
            });
    }, []);
    if (caregant){
        return <h1>Cargando</h1>
    }else {
        return (
            <article>
                <h1>{alojemiento.nombre}</h1>
                <MostrarFoto IdAlojamiento={alojemiento.ID}/>
                <h2>{alojemiento.direction}</h2>
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
                        <td>{alojemiento.numeroPersonas}</td>
                        <td>{alojemiento.numeroHabitaciones}</td>
                        <td>{alojemiento.numeroCamas}</td>
                        <td>{alojemiento.numeroBanos}</td>
                        <td>{alojemiento.tipoAlojamiento}</td>
                        <td>{alojemiento.tipoVacacional}</td>
                        <td>{alojemiento.categoria}</td>
                    </tr>
                    </tbody>
                </table>
                <br/>
                <p>{alojemiento.descripcion}</p>
                <CargarValoraciones IdAlojamiento={alojemiento.ID} />
            </article>
        )
    }
}
export default AlojamientoIndividual;