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

function CrudTipoVacacional() {
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
    const [tipoVacacionalSeleccionado, setTipoVacacionalSeleccionado] = useState({
        nombreTipo: '',
        idiomaId: ''
    })

    const handleChange = e => {
        const {name, value} = e.target;
        setTipoVacacionalSeleccionado(prevState => ({
            ...prevState,
            [name]: value
        }))
        console.log(tipoVacacionalSeleccionado);
    }
    useEffect(() => {
        getList()
    }, [])


//Get
    const getList = async () => {
        await axios.get('http://www.rampacom.com/ProyectoFinal/public/api/tipovacacional', config)
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
        await axios.post('http://www.rampacom.com/ProyectoFinal/public/api/tipovacacional/crea', tipoVacacionalSeleccionado, config)
            .then(response => {
                setList(list.concat(response.data.result.data))
                abrirCerrarModalInsertar()
                window.location.reload(false);
            })
    }


    const peticionPut = async () => {
        console.log(tipoVacacionalSeleccionado.ID);
        await axios.put('http://www.rampacom.com/ProyectoFinal/public/api/tipovacacional/modifica/' + tipoVacacionalSeleccionado.ID, tipoVacacionalSeleccionado, config)
            .then(response => {
                const listNueva = list;
                listNueva.map(tipoVacacional => {
                    if (tipoVacacionalSeleccionado.ID === tipoVacacional.ID) {
                        tipoVacacional.nombreTipo = tipoVacacionalSeleccionado.nombreTipo;
                        tipoVacacional.idiomaId = tipoVacacionalSeleccionado.idiomaId;
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
        console.log(tipoVacacionalSeleccionado.ID);
        await axios.delete('http://www.rampacom.com/ProyectoFinal/public/api/tipovacacional/borra/' + tipoVacacionalSeleccionado.ID, config)
            .then(response => {
                setList(list.filter(tipoVacacional => tipoVacacional.id !== tipoVacacionalSeleccionado.ID));
                abrirCerrarModalEliminar();
                window.location.reload(false);
            })
    }

//Asigna el elemento de la lista a esta constante
    const seleccionarTipoVacacional = (tipoVacacional, caso) => {
        console.log(tipoVacacional)
        setTipoVacacionalSeleccionado(tipoVacacional);
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
            <h3>Crea Nuevo Tipo Vacacional</h3>
            <br/>
            <TextField name="nombreTipo" label="Nombre" onChange={handleChange}/>
            <br/>
            <TextField name="idiomaId" label="Id Idioma" onChange={handleChange}/>
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
            <h3>Modifica un Tipo Vacacional</h3>
            <br/>
            <TextField name="nombreTipo" label="Nombre" onChange={handleChange}
                       value={tipoVacacionalSeleccionado && tipoVacacionalSeleccionado.nombreTipo}/>
            <br/>
            <TextField name="idiomaId" label="Id Idioma" onChange={handleChange}
                       value={tipoVacacionalSeleccionado && tipoVacacionalSeleccionado.idiomaId}/>
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
            <h3>Estás seguro que deseas eliminar el Tipo Vacacional:</h3>
            <b><p>--( {tipoVacacionalSeleccionado && tipoVacacionalSeleccionado.nombreTipo})--</p></b>
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
            <h1>Crud Tipo Vacacional</h1>
            <Button onClick={() => abrirCerrarModalInsertar()}>Insertar</Button>
            <br/><br/>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Nombre</TableCell>
                            <TableCell>Idioma ID</TableCell>
                            <TableCell>Acciones</TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {list.map(tipoVacacional => (
                            <TableRow key={tipoVacacional.ID}>
                                <TableCell>{tipoVacacional.ID}</TableCell>
                                <TableCell>{tipoVacacional.nombreTipo}</TableCell>
                                <TableCell>{tipoVacacional.idiomaId}</TableCell>
                                <TableCell>
                                    <Edit style={mystyleCursor}
                                          onClick={() => seleccionarTipoVacacional(tipoVacacional, 'Editar')}/>
                                    &nbsp;&nbsp;
                                    <Delete style={mystyleCursor}
                                            onClick={() => seleccionarTipoVacacional(tipoVacacional, 'Eliminar')}/>
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

export default CrudTipoVacacional;