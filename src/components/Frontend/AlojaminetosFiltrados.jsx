import {Link} from "react-router-dom";
import {useEffect, useState} from "react";
import {v4 as uuidv4} from "uuid";
import axios from "axios";
import {Card, Col, Row} from "react-bootstrap";
import {Button} from "@mui/material";
import filtroIdioma from "../../JS/FiltroIdioma";


function AlojaminetosFiltrados() {
    const [Aforo, setAforo] = useState(0);
    const [Habitaciones, setHabitaciones] = useState(0);
    const [Camas, setCamsa] = useState(0);
    const [Banos, setBanos] = useState(0);
    const [TipoAlojameinto, setTipoAlojamiento] = useState(null);
    const [TipoVacacional, setTipoVacacional] = useState(null);
    const [Categoria, setCategoria] = useState(null);
    //Conseguimos las imagenes
    const [Imagenes, setImagenes] = useState([]);
    useEffect(()=>{
        axios.get('http://www.rampacom.com/ProyectoFinal/public/api/fotografia')
            .then(response=>{
                setImagenes(response.data.result.data);
            })
    },[]);
    function llamarImagen(IDAlojamiento){//esto solo coge el primer elemento
        let sacar=null;
        sacar = Imagenes.find((IM) => IM.alojamientoId == IDAlojamiento);
        if (sacar==null){
            return "http://www.rampacom.com/ProyectoFinal/public/imatges/coco.webp";
        }else{
            return sacar.ruta;
        }
    }
    //Conseguimos los alojamientos
    const [Alojamientos, setAlojamientos] = useState([]);
    const[listaCategorias, setListaCat] = useState([]);
    const[listaTipos, setListaTipos] = useState([]);
    const[listaVacacional, setListaVac] = useState([]);
    useEffect(()=>{
        axios.get('http://www.rampacom.com/ProyectoFinal/public/api/alojamiento')
            .then(response=>{
                setAlojamientos(response.data.result.data);
            })
            .catch(function (error) {
                console.log(error);
            })
        axios.get('http://www.rampacom.com/ProyectoFinal/public/api/categoria')
            .then(response => {
                setListaCat(response.data.result.data);
            })
            .catch(error => {
                console.log(error);
            });
        axios.get('http://www.rampacom.com/ProyectoFinal/public/api/tipoalojamiento')
            .then(response => {
                setListaTipos(filtroIdioma(response.data.result.data));
            }).catch(error=> {console.log(error);});
        axios.get('http://www.rampacom.com/ProyectoFinal/public/api/tipovacacional')
            .then(response => ( setListaVac(filtroIdioma(response.data.result.data))))
            .catch(error=> {
                console.log(error);
            });
    },[]);
    const filtrados = Alojamientos.filter((A)=> {
        const aforo = A.numeroPersonas >=Aforo;
        const habitaciones = A.numeroHabitaciones >=Habitaciones;
        const camas = A.numeroCamas >= Camas;
        const banos = A.numeroBanos >= Banos;
        if (TipoAlojameinto != null) {
            const tipoAlojamiento = A.tipoAlojamiento == TipoAlojameinto;
            if (TipoVacacional != null){
                const tipoVacacional = A.tipoVacacional == TipoVacacional;
                if (Categoria != null){
                    const categoria = A.categoria == Categoria;
                    return aforo && habitaciones && camas && banos && tipoAlojamiento && tipoVacacional && categoria;
                }else{
                    return aforo && habitaciones && camas && banos && tipoAlojamiento && tipoVacacional;
                }
            }else{
                return aforo && habitaciones && camas && banos && tipoAlojamiento;
            }
            return aforo && habitaciones && camas && banos && tipoAlojamiento;
        }if (TipoVacacional != null){
            const tipoVacacional = A.tipoVacacional == TipoVacacional;
            if (Categoria != null){
                const categoria = A.categoria == Categoria;
                return aforo && habitaciones && camas && banos && tipoVacacional && categoria;
            }else {
                return aforo && habitaciones && camas && banos && tipoVacacional;
            }
        }if (Categoria != null){
            const categoria = A.categoria == Categoria;
            return aforo && habitaciones && camas && banos && categoria;
        }
        return aforo && habitaciones && camas && banos;
    });

    function cambio(e){
        console.log("Eject");
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
                setTipoAlojamiento(e.target.value);
                break;
            case "TV":
                setTipoVacacional(e.target.value);
                break;
            case "C":
                setCategoria(e.target.value);
                break;
            default:
                break;
        }
        mostrar(filtrados);
    }
    function mostrar(listaAlojamientos) {
        if (listaAlojamientos.length === 0){
            return (
                <>
                    <form key={uuidv4()}>
                        <label id={"NP"}>Aforo minimo:<br/> <input key={uuidv4()} id={"NP"} value={Aforo} type="number"
                                                                   name="NP" onChange={cambio}/></label>
                        <label id={"NH"}>Nuemro de habitaciones: <input id={"NH"} key={uuidv4()} value={Habitaciones}
                                                                        type="number" name="NH"
                                                                        onChange={cambio}/></label>
                        <label id={"NC"}>Numero de Camas: <input id={"NC"} key={uuidv4()} value={Camas} type="number"
                                                                 name="NC" onChange={cambio}/></label>
                        <label id={"NB"}>Numero de Baños: <input id={"NB"} key={uuidv4()} value={Banos} type="number"
                                                                 name="NB" onChange={cambio}/></label>
                        <label id={"C"}>Categoria:
                            <select id={"C"} key={uuidv4()} name={"C"} value={""} onChange={cambio}>
                                <option key={uuidv4()} value={""}>{"Seleciona"}</option>
                                {
                                    listaCategorias.map((P) => (
                                        <option key={uuidv4()} value={P.ID}>{P.nombreCategoria}</option>
                                    ))
                                }
                            </select></label>
                        <label id={"TA"}> Tipo de Alojamiento:
                            <select id={"TA"} name={"TA"} key={uuidv4()} value={""} onChange={cambio}>
                                <option key={uuidv4()} value={""}>{"Selecciona"}</option>
                                {
                                    listaTipos.map((P) => (
                                        <option key={uuidv4()} value={P.ID}>{P.nombreTipo}</option>
                                    ))
                                }
                            </select></label>
                        <label id={"TV"}>Tipo vacacional:
                            <select key={uuidv4()} id={"TV"} name={"TV"} value={""} onChange={cambio}>
                                <option key={uuidv4()} value={""}>{"Selecciona"}</option>
                                {
                                    listaVacacional.map((P) => (
                                        <option key={uuidv4()} value={P.ID}>{P.nombreTipo}</option>
                                    ))
                                }
                            </select></label>
                    </form>
                    <h1>No hay ningun alojamiento que cumpla con sus requisitos...</h1>
                </>
            )
        }else {
            return (
                <>
                    <form key={uuidv4()}>
                        <label id={"NP"}>Aforo minimo:<br/> <input key={uuidv4()} id={"NP"} value={Aforo} type="number"
                                                                   name="NP" onChange={cambio}/></label>
                        <label id={"NH"}>Nuemro de habitaciones: <input id={"NH"} key={uuidv4()} value={Habitaciones}
                                                                        type="number" name="NH"
                                                                        onChange={cambio}/></label>
                        <label id={"NC"}>Numero de Camas: <input id={"NC"} key={uuidv4()} value={Camas} type="number"
                                                                 name="NC" onChange={cambio}/></label>
                        <label id={"NB"}>Numero de Baños: <input id={"NB"} key={uuidv4()} value={Banos} type="number"
                                                                 name="NB" onChange={cambio}/></label>
                        <label id={"C"}>Categoria:
                            <select id={"C"} key={uuidv4()} name={"C"} value={""} onChange={cambio}>
                                <option key={uuidv4()} value={""}>{"Seleciona"}</option>
                                {
                                    listaCategorias.map((P) => (
                                        <option key={uuidv4()} value={P.ID}>{P.nombreCategoria}</option>
                                    ))
                                }
                            </select></label>
                        <label id={"TA"}> Tipo de Alojamiento:
                            <select id={"TA"} name={"TA"} key={uuidv4()} value={""} onChange={cambio}>
                                <option key={uuidv4()} value={""}>{"Selecciona"}</option>
                                {
                                    listaTipos.map((P) => (
                                        <option key={uuidv4()} value={P.ID}>{P.nombreTipo}</option>
                                    ))
                                }
                            </select></label>
                        <label id={"TV"}>Tipo vacacional:
                            <select key={uuidv4()} id={"TV"} name={"TV"} value={""} onChange={cambio}>
                                <option key={uuidv4()} value={""}>{"Selecciona"}</option>
                                {
                                    listaVacacional.map((P) => (
                                        <option key={uuidv4()} value={P.ID}>{P.nombreTipo}</option>
                                    ))
                                }
                            </select></label>
                    </form>
                    <Row xs={1} md={2} key={uuidv4()}>
                        {
                            listaAlojamientos.map((alojamiento) => (
                                <Col>
                                    <Card
                                        bg={'info'}
                                        border={"secondary"}
                                        style={{height: "700px", width: "600px", marginBottom: "10px"}}
                                        key={uuidv4()} id={alojamiento.ID} className={"alojamiento"}>
                                        <Card.Title style={{
                                            width: "100%",
                                            textAlign: "center"
                                        }}>{alojamiento.nombre}</Card.Title>
                                        <Card.Img style={{height: "65%", width: "100%", overflow: "hidden"}}
                                                  variant={"top"} src={llamarImagen(alojamiento.ID)}/>
                                        <Card.Body>
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
                                                    <td>{"hola"/*TipoVacacional.find((F)=> {F.ID == alojamiento.tipoVacacional; return F.nombreTipo;})*/}</td>
                                                    <td>{"hola"/*Categoria.find((F)=> {F.ID == alojamiento.categoria; return F.nombreCategoria;})*/}</td>
                                                </tr>
                                                </tbody>
                                            </table>
                                            <br/>
                                            <Card.Text style={{
                                                overflow: "hidden",
                                                height: "100px"
                                            }}>{alojamiento.descripcion}<br/>{alojamiento.direction}</Card.Text>
                                            <Button variant={"dark"}><Link
                                                style={{textDecoration: 'none', color: 'white'}}
                                                to={'/alojamiento/'+alojamiento.ID}>Ir a la ruta con el
                                                id</Link></Button>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            ))
                        }
                    </Row>
                </>
            )
        }
    }
    return(mostrar(filtrados))
}
export default AlojaminetosFiltrados;