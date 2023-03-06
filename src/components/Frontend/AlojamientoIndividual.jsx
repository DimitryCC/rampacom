import {Link, useParams} from "react-router-dom";
import {useEffect, useState} from "react";

function AlojamientoIndividual() {
    const { alojaminetoId } = useParams();
    const [alojemiento, setListaAlojamientos] = useState([]);
    useEffect(() => {
        fetch('http://www.rampacom.com/ProyectoFinal/public/api/alojamiento/'+alojaminetoId)
            .then(response => response.json())
            .then(data => {
                console.log(data.result);
                setListaAlojamientos(data.result);
            })
            .catch(error => {
                console.error(error);
            });
    }, []);
    return(
                <article>
                    <h1>{alojemiento.nombre}</h1>
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
                </article>
    )
}
export default AlojamientoIndividual;