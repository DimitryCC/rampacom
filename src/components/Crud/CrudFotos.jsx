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
    Box, ariaHidden
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
const mystyleImage = {
    width: '85%',
    height: '85%',
    alignItems: 'center',
    textAlign: 'center'
};
const mystyleButtons = {
    alignItems: 'center',
    textAlign: 'center',
    fontWeight: 'bold'
};

function CrudFotos() {
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
    const [fotoSeleccionada, setFotoSeleccionada] = useState({
        ruta: '',
        alojamientoId: '',
    })

    const handleChange = e => {
        const {name, value} = e.target;
        setFotoSeleccionada(prevState => ({
            ...prevState,
            [name]: value
        }))
        console.log(fotoSeleccionada);
    }
    useEffect(() => {
        getList()
    }, [])


//Get
    const getList = async () => {
        await axios.get('http://www.rampacom.com/ProyectoFinal/public/api/fotografia')
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
        await axios.post('http://www.rampacom.com/ProyectoFinal/public/api/fotografia/crea', fotoSeleccionada, config)
            .then(response => {
                console.log(fotoSeleccionada)
                setList(list.concat(response.data.result.data))
                abrirCerrarModalInsertar()
                window.location.reload(false);
            })
    }


    const peticionPut = async () => {
        console.log(fotoSeleccionada.ID);
        await axios.put('http://www.rampacom.com/ProyectoFinal/public/api/fotografia/modifica/' + fotoSeleccionada.ID, fotoSeleccionada, config)
            .then(response => {
                const listNueva = list;
                listNueva.map(foto => {
                    if (fotoSeleccionada.ID === foto.ID) {
                        foto.ruta = fotoSeleccionada.ruta;
                        foto.alojamientoId = fotoSeleccionada.alojamientoId;
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
        console.log(fotoSeleccionada.ID);
        await axios.delete('http://www.rampacom.com/ProyectoFinal/public/api/fotografia/borra/' + fotoSeleccionada.ID, config)
            .then(response => {
                setList(list.filter(foto => foto.id !== fotoSeleccionada.ID));
                abrirCerrarModalEliminar();
                window.location.reload(false);
            })
    }

//Asigna el elemento de la lista a esta constante
    const seleccionarFoto = (foto, caso) => {

        console.log(foto)
        setFotoSeleccionada(foto);
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
            <h3>Crea Nueva Foto</h3>
            <br/>
            <input type={"file"} name="ruta" label="Foto" onChange={handleChange}/>
            <br/>
            <br/>
            <TextField name="alojamientoId" label="Id del Alojamiento" onChange={handleChange}/>
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
            <h3>Modifica la Foto</h3>
            <b><p><img style={mystyleImage} src={fotoSeleccionada && fotoSeleccionada.ruta}></img></p></b>
            <br/>
            <input type={"file"} name="ruta" label="Foto" onChange={handleChange}/>
            <br/>
            <br/>
            <TextField name="alojamientoId" label="Id del Alojamiento" onChange={handleChange}
                       value={fotoSeleccionada && fotoSeleccionada.alojamientoId}/>
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
            <h3>Estás seguro que deseas eliminar la Foto:</h3>
            <b><p><img style={mystyleImage} src={fotoSeleccionada && fotoSeleccionada.ruta}></img></p></b>
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
            <h1>Crud Fotos</h1>
            <Button onClick={() => abrirCerrarModalInsertar()}>Insertar</Button>
            <br/><br/>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Id</TableCell>
                            <TableCell>Foto</TableCell>
                            <TableCell>Ruta</TableCell>
                            <TableCell>Alojamiento ID</TableCell>
                            <TableCell>Acciones</TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {list.map(foto => (
                            <TableRow key={foto.ID}>
                                <TableCell>{foto.ID}</TableCell>
                                <TableCell><img style={mystyleImage} src={foto.ruta}/></TableCell>
                                <TableCell>{foto.ruta}</TableCell>
                                <TableCell>{foto.alojamientoId}</TableCell>
                                <TableCell>
                                    <Edit style={mystyleCursor}
                                          onClick={() => seleccionarFoto(foto, 'Editar')}/>
                                    &nbsp;&nbsp;
                                    <Delete style={mystyleCursor}
                                            onClick={() => seleccionarFoto(foto, 'Eliminar')}/>
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

export default CrudFotos;