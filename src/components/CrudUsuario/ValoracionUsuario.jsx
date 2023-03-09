import {useEffect, useState} from "react";
import axios from "axios";
import {
    Table,
    TableContainer,
    TableHead,
    TableCell,
    TableBody,
    TableRow,
    Modal,
    Button,
    TextField,
    TablePagination,
    Box
} from "@mui/material";
import {Edit, Delete} from "@mui/icons-material";
import Cookies from "js-cookie";
import {useNavigate} from "react-router-dom";

//css
const mystyle = {
    position: 'absolute',
    width: 800,
    backgroundColor: 'white',
    border: '2px solid #000',
    padding: 'auto',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    alignItems: 'center',
    textAlign: 'center'
};
const mystyleCursor = {
    cursor: 'pointer'
};
const mystyleButtons = {
    alignItems: 'center',
    textAlign: 'center',
    fontWeight: 'bold'
};

function ValoracionUsuario() {
    const [list, setList] = useState([]);
    const [modalInsertar, setModalInsertar] = useState(false);
    const [modalEditar, setModalEditar] = useState(false);
    const [modalEliminar, setModalEliminar] = useState(false);
    const navigate = useNavigate();
    const apiTokenCookie = Cookies.get('apiTokenCookie');
    const adminCookie = Cookies.get('adminCookie');
    const idCookie = Cookies.get('idCookie');
    const config = {
        headers: {
            Authorization: `Bearer ${apiTokenCookie}`
        }
    };
    const [valoracionSeleccionada, setValoracionSeleccionada] = useState({
        usuarioId: idCookie,
        AlojamientoId: '',
        texto: '',
        puntuacion: '',
    })

    const [usuario, setUsuario] = useState(valoracionSeleccionada?.usuarioId || '');
    const handleUsuarioChange = (e) => {
        setUsuario(e.target.value);
    };

    const handleChange = e => {
        const {name, value} = e.target;
        setValoracionSeleccionada(prevState => ({
            ...prevState,
            [name]: value
        }))
        console.log(valoracionSeleccionada);
    }
    useEffect(() => {
        getList()
    }, [])


//Get
    const getList = async () => {
        await axios.get('http://www.rampacom.com/ProyectoFinal/public/api/valoracion/usuario/'+idCookie, config)
            .then(response => {
                console.log(response.data);
                setList(response.data.result);
            })
            .catch(function (error) {
                console.log(error);
            })
    }
//Post
    const peticionPost = async () => {
        await axios.post('http://www.rampacom.com/ProyectoFinal/public/api/valoracion/crea', valoracionSeleccionada, config)
            .then(response => {
                setList(list.concat(response.data.result.data))
                abrirCerrarModalInsertar()
                window.location.reload(false);
            })
    }


    const peticionPut = async () => {
        console.log(valoracionSeleccionada.ID);
        await axios.put('http://www.rampacom.com/ProyectoFinal/public/api/valoracion/modifica/usuario/' + valoracionSeleccionada.usuarioId + '/alojamiento/' + valoracionSeleccionada.AlojamientoId, valoracionSeleccionada, config)
            .then(response => {
                const listNueva = list;
                listNueva.map(valoracion => {
                    if (valoracionSeleccionada.usuarioId === valoracion.usuarioId && valoracionSeleccionada.AlojamientoId === valoracion.AlojamientoId) {
                        valoracion.texto = valoracionSeleccionada.texto;
                        valoracion.puntuacion = valoracionSeleccionada.puntuacion;
                    }
                })
                console.log(listNueva);
                // response.listNueva = listNueva;
                // setList(response.listNueva);
                setList(listNueva);
                abrirCerrarModalEditar();
                getList();
            })
    }
//Delete
    const peticionDelete = async () => {
        console.log(valoracionSeleccionada.ID);
        await axios.delete('http://www.rampacom.com/ProyectoFinal/public/api/valoracion/borra/usuario/' + valoracionSeleccionada.usuarioId + '/alojamiento/' + valoracionSeleccionada.AlojamientoId, config)
            .then(response => {
                setList(list.filter(valoracion => valoracion.usuarioId !== valoracionSeleccionada.usuarioId && valoracionSeleccionada.AlojamientoId !== valoracion.AlojamientoId));
                abrirCerrarModalEliminar();
                window.location.reload(false);
            })
    }

//Asigna el elemento de la lista a esta constante
    const seleccionarValoracion = (valoracion, caso) => {
        console.log(valoracion)
        setValoracionSeleccionada(valoracion);
        (caso === 'Editar') ? abrirCerrarModalEditar() : abrirCerrarModalEliminar()
    }

//Modal - Crea - Edita -Borra
    const abrirCerrarModalInsertar = () => {
        setModalInsertar(!modalInsertar);
    }
    const abrirCerrarModalEditar = () => {
        setModalEditar(!modalEditar);
    }
    const abrirCerrarModalEliminar = () => {
        setModalEliminar(!modalEliminar);
    }
//Body del Modal - Crea - Edita - Borra
    const bodyInsertar = (
        <div style={mystyle}>
            <br/>
            <h3>Crea Nueva Valoracion</h3>
            <br/>
            <TextField type={"hidden"} name="usuarioId" label="Usuario" onChange={handleUsuarioChange} value={idCookie}/>
            <TextField name="AlojamientoId" label="Id Alojamiento" onChange={handleChange}/>
            <br/>
            <TextField name="texto" label="Comentario" onChange={handleChange}/>

            <TextField name="puntuacion" label="Puntuacion" onChange={handleChange}/>
            <br/><br/>
            <div align="center" style={mystyleButtons}>
                <Button color="primary" onClick={() => peticionPost()}>Insertar</Button>
                <Button color="secondary" onClick={() => abrirCerrarModalInsertar()}>Cancelar</Button>
            </div>
        </div>
    )
    const bodyEditar = (
        <div style={mystyle}>
            <br/>
            <h3>Modifica la Valoracion</h3>
            <br/>

            <TextField name="texto" label="Comentario" onChange={handleChange}
                       value={valoracionSeleccionada && valoracionSeleccionada.texto}/>

            <TextField name="puntuacion" label="Puntuacion" onChange={handleChange}
                       value={valoracionSeleccionada && valoracionSeleccionada.puntuacion}/>
            <br/><br/>
            <div align="center" style={mystyleButtons}>
                <Button color="primary" onClick={() => peticionPut()}>Modifica</Button>
                <Button color="secondary" onClick={() => abrirCerrarModalEditar()}>Cancelar</Button>
            </div>
        </div>
    )
    const bodyEliminar = (
        <div style={mystyle}>
            <br/>
            <h3>Estás seguro que deseas eliminar la Valoracion:</h3>
            <b><p>--( {valoracionSeleccionada && valoracionSeleccionada.texto} )--</p></b>
            <p>???</p>
            <div align="center" style={mystyleButtons}>
                <Button color="primary" onClick={() => peticionDelete()}>Sí</Button>
                <Button color="secondary" onClick={() => abrirCerrarModalEliminar()}>No</Button>
            </div>

        </div>
    )


//Return de como se muestra la pagina
    return (
        <div>
            <br/>
            <h1>Crud Valoraciones</h1>
            <Button onClick={() => abrirCerrarModalInsertar()}>Insertar</Button>
            <br/><br/>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Id Usuario</TableCell>
                            <TableCell>Id Alojamiento</TableCell>
                            <TableCell>Comentario</TableCell>
                            <TableCell>Puntuacion</TableCell>
                            <TableCell>Acciones</TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {list.map(valoracion => (
                            <TableRow key={valoracion.usuarioId && valoracion.AlojamientoId}>
                                <TableCell>{valoracion.usuarioId}</TableCell>
                                <TableCell>{valoracion.AlojamientoId}</TableCell>
                                <TableCell>{valoracion.texto}</TableCell>
                                <TableCell>{valoracion.puntuacion}</TableCell>
                                <TableCell>
                                    <Edit style={mystyleCursor}
                                          onClick={() => seleccionarValoracion(valoracion, 'Editar')}/>
                                    &nbsp;&nbsp;
                                    <Delete style={mystyleCursor}
                                            onClick={() => seleccionarValoracion(valoracion, 'Eliminar')}/>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Modal
                open={modalInsertar}
                onClose={abrirCerrarModalInsertar}>
                {bodyInsertar}
            </Modal>
            <Modal
                open={modalEditar}
                onClose={abrirCerrarModalEditar}>
                {bodyEditar}
            </Modal>
            <Modal
                open={modalEliminar}
                onClose={abrirCerrarModalEliminar}>
                {bodyEliminar}
            </Modal>

        </div>


    );
}

export default ValoracionUsuario;