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

function ReservesUsuario() {
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
    const [reservaSeleccionada, setReservaSeleccionada] = useState({
        ID:'',
        usuarioId: idCookie,
        AlojamientoId: '',
        FechaInicio: '',
        FechaFin: ''
    })

    const handleChange = e => {
        const {name, value} = e.target;
        setReservaSeleccionada(prevState => ({
            ...prevState,
            [name]: value
        }))
        console.log(reservaSeleccionada);
    }
    useEffect(() => {
        getList()
    }, [])

    const [usuario, setUsuario] = useState(reservaSeleccionada?.usuarioId || '');
    const handleUsuarioChange = (e) => {
        setUsuario(e.target.value);
    };

//Get
    const getList = async () => {
        await axios.get('http://www.rampacom.com/ProyectoFinal/public/api/reserva/usuario/'+idCookie, config)
            .then(response => {
                console.log(response.data.result);
                setList(response.data.result);
            })
            .catch(function (error) {
                console.log(error);
            })
    }
//Post
    const peticionPost = async () => {
        await axios.post('http://www.rampacom.com/ProyectoFinal/public/api/reserva/crea', reservaSeleccionada, config)
            .then(response => {
                setList(list.concat(response.data.result))
                abrirCerrarModalInsertar()
                // window.location.reload(false);
            })
    }


    const peticionPut = async () => {
        console.log(reservaSeleccionada.ID);
        await axios.put('http://www.rampacom.com/ProyectoFinal/public/api/reserva/modifica/' + reservaSeleccionada.ID, reservaSeleccionada, config)
            .then(response => {
                const listNueva = list;
                listNueva.map(reserva => {
                    if (reservaSeleccionada.ID === reserva.ID) {
                        reserva.usuarioId = reservaSeleccionada.usuarioId;
                        reserva.AlojamientoId = reservaSeleccionada.AlojamientoId;
                        reserva.FechaInicio = reservaSeleccionada.FechaInicio;
                        reserva.FechaFin = reservaSeleccionada.FechaFin;
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
        console.log(reservaSeleccionada.ID);
        await axios.delete('http://www.rampacom.com/ProyectoFinal/public/api/reserva/borra/' + reservaSeleccionada.ID, config)
            .then(response => {
                setList(list.filter(categoria => categoria.id !== reservaSeleccionada.ID));
                abrirCerrarModalEliminar();
                window.location.reload(false);
            })
    }

//Asigna el elemento de la lista a esta constante
    const seleccionarReserva = (reserva, caso) => {
        console.log(reserva)
        setReservaSeleccionada(reserva);
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
            <h3>Crea Nueva Reserva</h3>
            <br/>
            <TextField type={"hidden"} name="usuarioId" label="Usuario" onChange={handleUsuarioChange} value={idCookie}/>

            <TextField name="AlojamientoId" label="Id Alojamiento" onChange={handleChange}/>
            <br/>
            <TextField name="FechaInicio" label="Fecha Inicio (aaaa-mm-dd)" onChange={handleChange}/>

            <TextField name="FechaFin" label="Fecha Fin (aaaa-mm-dd)" onChange={handleChange}/>
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
            <h3>Modifica la Reserva</h3>
            <br/>
            <TextField name="usuarioId" label="Id Usuario" onChange={handleChange}
                       value={reservaSeleccionada && reservaSeleccionada.usuarioId}/>

            <TextField name="AlojamientoId" label="Id Alojamiento" onChange={handleChange}
                       value={reservaSeleccionada && reservaSeleccionada.AlojamientoId}/>
            <br/>
            <TextField name="FechaInicio" label="Fecha Inicio (aaaa-mm-dd)" onChange={handleChange}
                       value={reservaSeleccionada && reservaSeleccionada.FechaInicio}/>

            <TextField name="FechaFin" label="Fecha Fin (aaaa-mm-dd)" onChange={handleChange}
                       value={reservaSeleccionada && reservaSeleccionada.FechaFin}/>
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
            <h3>Est??s seguro que deseas eliminar la Reserva:</h3>
            <b><p>--( {reservaSeleccionada && reservaSeleccionada.FechaInicio} -> {reservaSeleccionada && reservaSeleccionada.FechaFin} )--</p></b>
            <p>???</p>
            <div align="center" style={mystyleButtons}>
                <Button color="primary" onClick={() => peticionDelete()}>S??</Button>
                <Button color="secondary" onClick={() => abrirCerrarModalEliminar()}>No</Button>
            </div>

        </div>
    )


//Return de como se muestra la pagina
    return (
        <div>
            <br/>
            <h1>Tus Reservas</h1>
            <Button onClick={() => abrirCerrarModalInsertar()}>Crear Nueva Reserva</Button>
            <br/><br/>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Alojamiento ID</TableCell>
                            <TableCell>Fecha Inicio</TableCell>
                            <TableCell>Fecha Fin</TableCell>

                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {list.map(reserva => (
                            <TableRow key={reserva.ID}>
                                <TableCell>{reserva.AlojamientoId}</TableCell>
                                <TableCell>{reserva.FechaInicio}</TableCell>
                                <TableCell>{reserva.FechaFin}</TableCell>

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

export default ReservesUsuario;