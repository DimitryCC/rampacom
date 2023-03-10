import {useEffect, useState} from "react";
import axios from "axios";

function CargarValoraciones(props) {
    const [cargandoValoraciones, setCargandoValoraciones] = useState(true);
    const [cargandoUsuarios, setCargandoUsuarios] = useState(true);
    const [Total, setTotal] = useState(0);
    const [Valoraciones, setValoraciones] = useState([]);
    const [Usuarios, setUsuarios] = useState([]);
    const URL = 'http://www.rampacom.com/ProyectoFinal/public/api/valoracion/aloja/' + props.IdAlojamiento;
    useEffect(() => {
            axios.get("http://www.rampacom.com/ProyectoFinal/public/api/usuario/datos")
                .then(response => {
                    setUsuarios(response.data.result);
                    setCargandoUsuarios(false);
                })
                .catch(error => {
                    console.log(error);
                    setCargandoUsuarios(false);
                })
    },[]);
    useEffect(() => {
            axios.get(URL)
                .then(response => {
                    setValoraciones(response.data.result);
                    calcularTotal(response.data.result);
                    setCargandoValoraciones(false);
                })
                .catch(error => {
                    console.log(error.value);
                    setCargandoValoraciones(false);
                })
    },[]);
    function calcularTotal(valoraciones){
        console.log("calcularTotal ejct");
        let sumatorio=0;
        valoraciones.forEach(valoracion => {
            sumatorio = sumatorio + valoracion.puntuacion;
        });
        let pretotal=0;
        if (valoraciones.length!=0){
            pretotal=Math.round(sumatorio/(valoraciones.length));
        }

        setTotal(pretotal);
    }
        console.log("iterado");
        if (cargandoValoraciones || cargandoUsuarios) {
            console.log(cargandoValoraciones);
            return <h1>Cargando</h1>
        } else {
            return (
                <>
                    <div style={{marginTop: "20px",marginBottom: "20px",border: "15px solid lightgrey", borderRadius: "43px", backgroundColor: "lightblue"}}>
                        <strong><h1 style={{marginTop: "1%",textAlign: "center"}}>Valoraciones alojamiento: {Total}</h1></strong>
                        <br/>
                        {Valoraciones.map((valoracion) => (
                            <div style={{marginLeft: "1%", marginRight:"1%"}}>
                                <h3>Usuario {Usuarios[valoracion.usuarioId].nombreCompleto + ": " + valoracion.puntuacion}</h3>
                                <p>{valoracion.texto}</p>
                            </div>
                        ))}
                    </div>
                    <a href={"/valoracionusuario"} class={"btn btn-primary"} style={{width: "100%"}}>Haz tu valoracion !</a>
                </>
            )
        }
}
export default CargarValoraciones;