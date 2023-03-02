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

function CrudAlojServicios() {
    const [list, setList] = useState([]);
    const [modalInsertar, setModalInsertar] = useState(false);
    const [modalEditar, setModalEditar] = useState(false);
    const [modalEliminar, setModalEliminar] = useState(false);
    const navigate = useNavigate();
    const apiTokenCookie = Cookies.get('apiTokenCookie');
    const adminCookie = Cookies.get('adminCookie');
    const config = {
        headers: {
            Authorization: `Bearer ${apiTokenCookie}`
        }
    };
    const [alojServicioSeleccionado, setAlojServicioSeleccionado] = useState({
        servicioId: '',
        alojamientoId: ''
    })

    const handleChange = e => {
        const {name, value} = e.target;
        setAlojServicioSeleccionado(prevState => ({
            ...prevState,
            [name]: value
        }))
        console.log(alojServicioSeleccionado);
    }
    useEffect(() => {
        getList()
    }, [])


//Get
    const getList = async () => {
        await axios.get('http://www.rampacom.com/ProyectoFinal/public/api/AlojaServi', config)
            .then(response => {
                console.log(response.data);
                setList(response.data.result.data);
            })
            .catch(function (error) {
                console.log(error);
            })
    }
//Post
    const peticionPost = async () => {
        await axios.post('http://www.rampacom.com/ProyectoFinal/public/api/AlojaServi/crea', alojServicioSeleccionado, config)
            .then(response => {
                setList(list.concat(response.data.result.data))
                abrirCerrarModalInsertar()
                window.location.reload(false);
            })
    }


    const peticionPut = async () => {
        console.log(alojServicioSeleccionado.ID);
        await axios.put('http://www.rampacom.com/ProyectoFinal/public/api/AlojaServi/modifica/servicio/' + alojServicioSeleccionado.servicioId + '/alojamiento/' + alojServicioSeleccionado.alojamientoId, alojServicioSeleccionado, config)
            .then(response => {
                // const listNueva = list;
                // listNueva.map(alojServicio => {
                //     if (alojServicioSeleccionado.servicioId === alojServicioSeleccionado.servicioId && alojServicio.alojamientoId === alojServicioSeleccionado.alojamientoId) {
                //
                //     }
                // })
                // console.log(listNueva);
                // // response.listNueva = listNueva;
                // // setList(response.listNueva);
                // setList(listNueva);
                abrirCerrarModalEditar();
                getList();
            })
    }
//Delete
    const peticionDelete = async () => {
        console.log(alojServicioSeleccionado.ID);
        await axios.delete('http://www.rampacom.com/ProyectoFinal/public/api/AlojaServi/borra/servicio/' + alojServicioSeleccionado.servicioId + '/alojamiento/' + alojServicioSeleccionado.alojamientoId, config)
            .then(response => {
                setList(list.filter(alojServicio => alojServicio.servicioId !== alojServicioSeleccionado.servicioId && alojServicio.alojamientoId !== alojServicioSeleccionado.alojamientoId));
                abrirCerrarModalEliminar();
                window.location.reload(false);
            })
    }

//Asigna el elemento de la lista a esta constante
    const seleccionarReserva = (reserva, caso) => {
        console.log(reserva)
        setAlojServicioSeleccionado(reserva);
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
            <h3>Crea Nueva Relacion Alojamiento - Servicio</h3>
            <br/>
            <TextField name="servicioId" label="Id Servicio" onChange={handleChange}/>
            <br/>
            <TextField name="alojamientoId" label="Id Alojamiento" onChange={handleChange}/>

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
            <h3>Modifica la Relacion Alojamiento - Servicio</h3>
            <br/>
            <TextField name="servicioId" label="Id Servicio" onChange={handleChange}
                       value={alojServicioSeleccionado && alojServicioSeleccionado.servicioId}/>
            <br/>
            <TextField name="alojamientoId" label="Id Alojamiento" onChange={handleChange}
                       value={alojServicioSeleccionado && alojServicioSeleccionado.alojamientoId}/>

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
            <h3>Estás seguro que deseas eliminar la Relacion Alojamiento - Servicio:</h3>
            <b><p>--( {alojServicioSeleccionado && alojServicioSeleccionado.servicioId} - {alojServicioSeleccionado && alojServicioSeleccionado.alojamientoId} )--</p></b>
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
            <h1>Crud Relacion Alojamiento - Servicio</h1>
            <Button onClick={() => abrirCerrarModalInsertar()}>Insertar</Button>
            <br/><br/>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>ID Servicio</TableCell>
                            <TableCell>ID Alojamiento</TableCell>
                            <TableCell>Acciones</TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {list.map(alojServicio => (
                            <TableRow key={alojServicio.servicioId && alojServicio.alojamientoId}>
                                <TableCell>{alojServicio.servicioId}</TableCell>
                                <TableCell>{alojServicio.alojamientoId}</TableCell>
                                <TableCell>
                                    <Edit style={mystyleCursor}
                                          onClick={() => seleccionarReserva(alojServicio, 'Editar')}/>
                                    &nbsp;&nbsp;
                                    <Delete style={mystyleCursor}
                                            onClick={() => seleccionarReserva(alojServicio, 'Eliminar')}/>
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

export default CrudAlojServicios;