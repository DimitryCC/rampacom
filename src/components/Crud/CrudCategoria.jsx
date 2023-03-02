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

function CrudCategoria() {
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
    const [categoriaSeleccionada, setCategoriaSeleccionada] = useState({
        nombreCategoria: '',
        tarifaBaja: '',
        tarifaAlta: '',
    })

    const handleChange = e => {
        const {name, value} = e.target;
        setCategoriaSeleccionada(prevState => ({
            ...prevState,
            [name]: value
        }))
        console.log(categoriaSeleccionada);
    }
    useEffect(() => {
        getList()
    }, [])


//Get
    const getList = async () => {
        await axios.get('http://www.rampacom.com/ProyectoFinal/public/api/categoria')
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
        await axios.post('http://www.rampacom.com/ProyectoFinal/public/api/categoria/crea', categoriaSeleccionada, config)
            .then(response => {
                setList(list.concat(response.data.result.data))
                abrirCerrarModalInsertar()
                window.location.reload(false);
            })
    }


    const peticionPut = async () => {
        console.log(categoriaSeleccionada.ID);
        await axios.put('http://www.rampacom.com/ProyectoFinal/public/api/categoria/modifica/' + categoriaSeleccionada.ID, categoriaSeleccionada, config)
            .then(response => {
                const listNueva = list;
                listNueva.map(categoria => {
                    if (categoriaSeleccionada.ID === categoria.ID) {
                        categoria.nombreCategoria = categoriaSeleccionada.nombreCategoria;
                        categoria.tarifaBaja = categoriaSeleccionada.descripcion;
                        categoria.tarifaAlta = categoriaSeleccionada.direccion;
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
        console.log(categoriaSeleccionada.ID);
        await axios.delete('http://www.rampacom.com/ProyectoFinal/public/api/categoria/borra/' + categoriaSeleccionada.ID, config)
            .then(response => {
                setList(list.filter(categoria => categoria.id !== categoriaSeleccionada.ID));
                abrirCerrarModalEliminar();
                window.location.reload(false);
            })
    }

//Asigna el elemento de la lista a esta constante
    const seleccionarCategoria = (categoria, caso) => {
        console.log(categoria)
        setCategoriaSeleccionada(categoria);
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
            <h3>Crea Nueva Categoria</h3>
            <br/>
            <TextField name="nombreCategoria" label="Nombre de la Categoria" onChange={handleChange}/>
            <br/>
            <TextField name="tarifaBaja" label="Tarifa Baja" onChange={handleChange}/>

            <TextField name="tarifaAlta" label="Tarifa Alta" onChange={handleChange}/>
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
            <h3>Modifica la Categoria</h3>
            <br/>
            <TextField name="nombreCategoria" label="Nombre de la Categoria" onChange={handleChange}
                       value={categoriaSeleccionada && categoriaSeleccionada.nombreCategoria}/>
            <br/>
            <TextField name="tarifaBaja" label="Tarifa Baja" onChange={handleChange}
                       value={categoriaSeleccionada && categoriaSeleccionada.tarifaBaja}/>

            <TextField name="tarifaAlta" label="Tarifa Alta" onChange={handleChange}
                       value={categoriaSeleccionada && categoriaSeleccionada.tarifaAlta}/>
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
            <h3>Estás seguro que deseas eliminar la Categoria:</h3>
            <b><p>--( {categoriaSeleccionada && categoriaSeleccionada.nombreCategoria} )--</p></b>
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
            <h1>Crud Categorias</h1>
            <Button onClick={() => abrirCerrarModalInsertar()}>Insertar</Button>
            <br/><br/>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Id</TableCell>
                            <TableCell>Nombre de la Categoria</TableCell>
                            <TableCell>Tarifa Baja</TableCell>
                            <TableCell>Tarifa Alta</TableCell>
                            <TableCell>Acciones</TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {list.map(categoria => (
                            <TableRow key={categoria.ID}>
                                <TableCell>{categoria.ID}</TableCell>
                                <TableCell>{categoria.nombreCategoria}</TableCell>
                                <TableCell>{categoria.tarifaBaja}</TableCell>
                                <TableCell>{categoria.tarifaAlta}</TableCell>
                                <TableCell>
                                    <Edit style={mystyleCursor}
                                          onClick={() => seleccionarCategoria(categoria, 'Editar')}/>
                                    &nbsp;&nbsp;
                                    <Delete style={mystyleCursor}
                                            onClick={() => seleccionarCategoria(categoria, 'Eliminar')}/>
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

export default CrudCategoria;