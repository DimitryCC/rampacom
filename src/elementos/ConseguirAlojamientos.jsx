import {useEffect, useState} from "react";
function ConseguirAlojamientos() {
    const [listaAlojamientos, setListaAlojamientos] = useState([]);
    useEffect(() => {
        fetch('http://www.rampacom.com/ProyectoFinal/public/api/alojamiento')
            .then(response => response.json())
            .then(data => {
                console.log(data.result.data);
                setListaAlojamientos(data.result.data);
            })
            .catch(error => {
                console.error(error);
            });
    }, []);
    const [listaMunicipios, setElementos] = useState([]);
    useEffect(() => {
        fetch('http://www.rampacom.com/ProyectoFinal/public/api/alojamiento')
            .then(response => response.json())
            .then(data => {
                console.log(data.result.data);
                setElementos(data.result.data);
            })
            .catch(error => {
                console.error(error);
            });
    }, []);


    return(
        <section id={'container'}>
            {
                listaAlojamientos.map((alojamiento)=>(
                    <article id={alojamiento.id} key={alojamiento.id}>
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

                    </article>
                ))
            }
        </section>

    )

}
export default ConseguirAlojamientos;