import {Link, useParams} from "react-router-dom";
import {Component, useEffect, useState} from "react";
import MostrarFoto from "./MostrarFoto";
import CargarValoraciones from "./CargarValoraciones";
import Calendario from "./Calendario";
import FormularioAlquiler from "./FormularioAlquiler";

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
            <article style={{display: "flex", flexDirection: "column"}}>
                    <div style={{borderBottom: "slategray",marginTop: "20px",marginBottom: "20px"}}>
                        <h1 style={{width: "100%", textAlign: "center"}}>{alojemiento.nombre}</h1>
                        <MostrarFoto IdAlojamiento={alojemiento.ID}/>
                        <h2>{alojemiento.direction}</h2>
                    </div>
                    <div style={{borderBottom: "slategray",marginTop: "20px",marginBottom: "20px"}}>
                    <h1 style={{textAlign: "center"}}>Caracteristicas</h1>
                <table class={"table table-striped"} style={{marginTop: "50px"}}>
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
                </div>
                <br/>
                <p>{alojemiento.descripcion}</p>
                <CargarValoraciones IdAlojamiento={alojemiento.ID} />
                <div style={{marginTop: "50px"}}>
                    <FormularioAlquiler IdAlojamiento={alojemiento.ID}/>
                </div>
            </article>
        )
    }
}
export default AlojamientoIndividual;