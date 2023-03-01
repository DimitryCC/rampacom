import {useEffect, useState} from "react";
import {Link} from "react-router-dom";
function ConseguirAlojamientosFiltrados(ElemtosAMostrar) {
    console.log(ElemtosAMostrar);
    return(
            <section>
                {
                    ElemtosAMostrar.map((alojamiento)=>(
                        <article key={alojamiento.id} className={"alojamiento"}>
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
    )
}
/*function filtro(listaAlojamientos,filtros) {
    let AlojamientosFiltrados;
    console.log(filtros);
    if (AlojamientosFiltrados!=null){
        return AlojamientosFiltrados;

    }else{
        return listaAlojamientos;
    }

}*/
export default ConseguirAlojamientosFiltrados;