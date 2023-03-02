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

function CrudUsuario() {
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
    const [usuarioSeleccionado, setUsuarioSeleccionado] = useState({

        DNI: '',
        nombreCompleto: '',
        direccion: '',
        correo: '',
        telefono: '',
        administrador: '',
        propietari: '',
    })

    const handleChange = e => {
        const {name, value} = e.target;
        setUsuarioSeleccionado(prevState => ({
            ...prevState,
            [name]: value
        }))
        console.log(usuarioSeleccionado);
    }
    useEffect(() => {
        getList()
    }, [])


//Get
    const getList = async () => {
        await axios.get('http://www.rampacom.com/ProyectoFinal/public/api/usuario', config)
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
        await axios.post('http://www.rampacom.com/ProyectoFinal/public/api/usuario/crea', usuarioSeleccionado, config)
            .then(response => {
                setList(list.concat(response.data.result.data))
                abrirCerrarModalInsertar()
                window.location.reload(false);
            })
    }


    const peticionPut = async () => {
        console.log(usuarioSeleccionado.ID);
        await axios.put('http://www.rampacom.com/ProyectoFinal/public/api/usuario/modifica/' + usuarioSeleccionado.ID, usuarioSeleccionado, config)
            .then(response => {
                const listNueva = list;
                listNueva.map(usuario => {
                    if (usuarioSeleccionado.ID === usuario.ID) {
                        usuario.DNI = usuarioSeleccionado.DNI;
                        usuario.nombreCompleto = usuarioSeleccionado.nombreCompleto;
                        usuario.direccion = usuarioSeleccionado.direccion;
                        usuario.correo = usuarioSeleccionado.correo;
                        usuario.telefono = usuarioSeleccionado.telefono;
                        usuario.administrador = usuarioSeleccionado.administrador;
                        usuario.propietari = usuarioSeleccionado.propietari;
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
        console.log(usuarioSeleccionado.ID);
        await axios.delete('http://www.rampacom.com/ProyectoFinal/public/api/usuario/borra/' + usuarioSeleccionado.ID, config)
            .then(response => {
                setList(list.filter(categoria => categoria.id !== usuarioSeleccionado.ID));
                abrirCerrarModalEliminar();
                window.location.reload(false);
            })
    }

//Asigna el elemento de la lista a esta constante
    const seleccionarUsuario = (usuario, caso) => {
        console.log(usuario)
        setUsuarioSeleccionado(usuario);
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
            <h3>Crea Nuevo Usuario</h3>
            <br/>
            <TextField name="DNI" label="DNI" onChange={handleChange}/>
            <br/>
            <TextField name="nombreCompleto" label="Nombre Completo" onChange={handleChange}/>

            <TextField name="direccion" label="Direccion" onChange={handleChange}/>

            <TextField name="correo" label="Correo" onChange={handleChange}/>
            <br/>
            <TextField name="telefono" label="Telefono" onChange={handleChange}/>

            <TextField name="administrador" label="Administrador" onChange={handleChange}/>

            <TextField name="propietari" label="Propietario" onChange={handleChange}/>
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
            <h3>Modifica el Usuario</h3>
            <br/>
            <TextField name="DNI" label="DNI" onChange={handleChange}
                       value={usuarioSeleccionado && usuarioSeleccionado.DNI}/>
            <br/>
            <TextField name="nombreCompleto" label="Nombre Completo" onChange={handleChange}
                       value={usuarioSeleccionado && usuarioSeleccionado.nombreCompleto}/>

            <TextField name="direccion" label="Direccion" onChange={handleChange}
                       value={usuarioSeleccionado && usuarioSeleccionado.direccion}/>

            <TextField name="correo" label="DNI" onChange={handleChange}
                       value={usuarioSeleccionado && usuarioSeleccionado.correo}/>
            <br/>
            <TextField name="telefono" label="Nombre Completo" onChange={handleChange}
                       value={usuarioSeleccionado && usuarioSeleccionado.telefono}/>

            <TextField name="administrador" label="Administrador" onChange={handleChange}
                       value={usuarioSeleccionado && usuarioSeleccionado.administrador}/>

            <TextField name="propietari" label="Propietario" onChange={handleChange}
                       value={usuarioSeleccionado && usuarioSeleccionado.propietari}/>
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
            <h3>Estás seguro que deseas eliminar el Usuario:</h3>
            <b><p>--( {usuarioSeleccionado && usuarioSeleccionado.nombreCompleto} )--</p></b>
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
            <h1>Crud Usuarios</h1>
            <Button onClick={() => abrirCerrarModalInsertar()}>Insertar</Button>
            <br/><br/>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>DNI</TableCell>
                            <TableCell>Nombre Completo</TableCell>
                            <TableCell>Direccion</TableCell>
                            <TableCell>Correo</TableCell>
                            <TableCell>Telefono</TableCell>
                            <TableCell>Administrador</TableCell>
                            <TableCell>Propietario</TableCell>
                            <TableCell>Acciones</TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {list.map(usuario => (
                            <TableRow key={usuario.ID}>
                                <TableCell>{usuario.ID}</TableCell>
                                <TableCell>{usuario.DNI}</TableCell>
                                <TableCell>{usuario.nombreCompleto}</TableCell>
                                <TableCell>{usuario.direccion}</TableCell>
                                <TableCell>{usuario.correo}</TableCell>
                                <TableCell>{usuario.telefono}</TableCell>
                                <TableCell>{usuario.administrador}</TableCell>
                                <TableCell>{usuario.propietari}</TableCell>
                                <TableCell>
                                    <Edit style={mystyleCursor}
                                          onClick={() => seleccionarUsuario(usuario, 'Editar')}/>
                                    &nbsp;&nbsp;
                                    <Delete style={mystyleCursor}
                                            onClick={() => seleccionarUsuario(usuario, 'Eliminar')}/>
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

export default CrudUsuario;