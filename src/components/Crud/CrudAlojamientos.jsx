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
import { DataGrid } from '@mui/x-data-grid';
import {Edit, Delete} from "@mui/icons-material";
import Cookies from "js-cookie";
import {useNavigate} from "react-router-dom";

//Grid




    const rows1 = [
        {id: 1, lastName: 'Snow', firstName: 'Jon', age: 35},
        {id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42},
        {id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45},
        {id: 4, lastName: 'Stark', firstName: 'Arya', age: 16},
        {id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null},
        {id: 6, lastName: 'Melisandre', firstName: null, age: 150},
        {id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44},
        {id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36},
        {id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65},
    ];


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

    function CrudAlojamientos() {
        const [list, setList] = useState([]);
        const [modalInsertar, setModalInsertar] = useState(false);
        const [modalEditar, setModalEditar] = useState(false);
        const [modalEliminar, setModalEliminar] = useState(false);
        const navigate = useNavigate();
        const apiTokenCookie = Cookies.get('apiTokenCookie');
        const adminCookie = Cookies.get('adminCookie');
        const [page, setPage] = useState(2);
        const [rowsPerPage, setRowsPerPage] = useState(10);
        const config = {
            headers: {
                Authorization: `Bearer ${apiTokenCookie}`
            }
        };
        const [alojamientoSeleccionado, setAlojamientoSeleccionado] = useState({
            nombre: '',
            descripcion: '',
            direccion: '',
            numeroPersonas: '',
            numeroHabitaciones: '',
            numeroCamas: '',
            numeroBanos: '',
            tipoAlojamiento: '',
            tipoVacacional: '',
            categoria: '',
            municipio: '',
            usuario: '',
        })
        const columns: GridColDef[] = [
            { field: 'id', headerName: 'ID', width: 90 },

            {
                field: 'nombre',
                headerName: 'Nombre',
                width: 150,
                editable: true,
            },
            {
                field: 'descripcion',
                headerName: 'Descripcion',
                width: 150,
                editable: true,
            },
            {
                field: 'direccion',
                headerName: 'Direccion',
                width: 110,
                editable: true,
            },
            {
                field: 'numeroPersonas',
                headerName: 'Num. Personas',
                type: 'number',
                width: 110,
                editable: true,
            },
            {
                field: 'numeroHabitaciones',
                headerName: 'Num. Habitaciones',
                type: 'number',
                width: 150,
                editable: true,
            },
            {
                field: 'numeroCamas',
                headerName: 'Num. Camas',
                type: 'number',
                width: 150,
                editable: true,
            },
            {
                field: 'numeroBanos',
                headerName: 'Num. Baños',
                type: 'number',
                width: 110,
                editable: true,
            },
            {
                field: 'tipoAlojamiento',
                headerName: 'Tipo Alojamiento',
                type: 'number',
                width: 110,
                editable: true,
            },
            {
                field: 'tipoVacacional',
                headerName: 'Tipo Vacacional',
                type: 'number',
                width: 150,
                editable: true,
            },
            {
                field: 'categoria',
                headerName: 'Categoria',
                type: 'number',
                width: 150,
                editable: true,
            },
            {
                field: 'municipio',
                headerName: 'Municipio',
                type: 'number',
                width: 110,
                editable: true,
            },
            {
                field: 'usuario',
                headerName: 'Usuario',
                type: 'number',
                width: 110,
                editable: true,
            },
        ];
        const rows = list.map((alojamiento) => {
            return {
                id: alojamiento.ID,
                nombre: alojamiento.nombre,
                descripcion: alojamiento.descripcion,
                direccion: alojamiento.direccion,
                numeroPersonas: alojamiento.numeroPersonas,
                numeroHabitaciones: alojamiento.numeroHabitaciones,
                numeroCamas: alojamiento.numeroCamas,
                numeroBanos: alojamiento.numeroBanos,
                tipoAlojamiento: alojamiento.tipoAlojamiento,
                tipoVacacional: alojamiento.tipoVacacional,
                categoria: alojamiento.categoria,
                municipio: alojamiento.municipio
            };
        });

        const handleChange = e => {
            const {name, value} = e.target;
            setAlojamientoSeleccionado(prevState => ({
                ...prevState,
                [name]: value
            }))
            console.log(alojamientoSeleccionado);
        }
        useEffect(() => {
            getList()
        }, [])

        const handleChangePage = (
            event: React.MouseEvent<HTMLButtonElement> | null,
            newPage: number,
        ) => {
            setPage(newPage);
        };

        const handleChangeRowsPerPage = (
            event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
        ) => {
            setRowsPerPage(parseInt(event.target.value, 10));
            setPage(0);
        };

//Get
        const getList = async () => {
            await axios.get('http://www.rampacom.com/ProyectoFinal/public/api/alojamiento')
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
            await axios.post('http://www.rampacom.com/ProyectoFinal/public/api/alojamiento/crea', alojamientoSeleccionado, config)
                .then(response => {
                    setList(list.concat(response.data.result.data))
                    abrirCerrarModalInsertar()
                    window.location.reload(false);
                })
        }


        const peticionPut = async () => {
            console.log(alojamientoSeleccionado.ID);
            await axios.put('http://www.rampacom.com/ProyectoFinal/public/api/alojamiento/modifica/' + alojamientoSeleccionado.ID, alojamientoSeleccionado, config)
                .then(response => {
                    const listNueva = list;
                    listNueva.map(alojamiento => {
                        if (alojamientoSeleccionado.ID === alojamiento.ID) {
                            alojamiento.nombre = alojamientoSeleccionado.nombre;
                            alojamiento.descripcion = alojamientoSeleccionado.descripcion;
                            alojamiento.direccion = alojamientoSeleccionado.direccion;
                            alojamiento.numeroPersonas = alojamientoSeleccionado.numeroPersonas;
                            alojamiento.numeroHabitaciones = alojamientoSeleccionado.numeroHabitaciones;
                            alojamiento.numeroCamas = alojamientoSeleccionado.numeroCamas;
                            alojamiento.numeroBanos = alojamientoSeleccionado.numeroBanos;
                            alojamiento.tipoAlojamiento = alojamientoSeleccionado.tipoAlojamiento;
                            alojamiento.tipoVacacional = alojamientoSeleccionado.tipoVacacional;
                            alojamiento.categoria = alojamientoSeleccionado.categoria;
                            alojamiento.municipio = alojamientoSeleccionado.municipio;
                            alojamiento.usuario = alojamientoSeleccionado.usuario;
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
            console.log(alojamientoSeleccionado.ID);
            await axios.delete('http://www.rampacom.com/ProyectoFinal/public/api/alojamiento/borra/' + alojamientoSeleccionado.ID, config)
                .then(response => {
                    setList(list.filter(alojamiento => alojamiento.id !== alojamientoSeleccionado.ID));
                    abrirCerrarModalEliminar();
                    window.location.reload(false);
                })
        }

//Asigna el elemento de la lista a esta constante
        const seleccionarAlojamiento = (alojamiento, caso) => {
            console.log(alojamiento)
            setAlojamientoSeleccionado(alojamiento);
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
                <h3>Crea Nuevo Alojamiento</h3>
                <br/>
                <TextField name="nombre" label="Nombre" onChange={handleChange}/>

                <TextField name="descripcion" label="Descripcion" onChange={handleChange}/>

                <TextField name="direccion" label="Direccion" onChange={handleChange}/>
                <br/>
                <TextField name="numeroPersonas" label="Num. Personas" onChange={handleChange}/>

                <TextField name="numeroHabitaciones" label="Num. Habitaciones" onChange={handleChange}/>

                <TextField name="numeroCamas" label="Num. Camas" onChange={handleChange}/>
                <br/>
                <TextField name="numeroBanos" label="Num. Baños" onChange={handleChange}/>

                <TextField name="tipoAlojamiento" label="Tipo Alojamiento" onChange={handleChange}/>

                <TextField name="tipoVacacional" label="Tipo Vacacional" onChange={handleChange}/>
                <br/>
                <TextField name="categoria" label="Categoria" onChange={handleChange}/>

                <TextField name="municipio" label="Municipio" onChange={handleChange}/>

                <TextField name="usuario" label="Usuario" onChange={handleChange}/>
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
                <h3>Modifica el Alojamiento</h3>
                <br/>
                <TextField name="nombre" label="Nombre" onChange={handleChange}
                           value={alojamientoSeleccionado && alojamientoSeleccionado.nombre}/>

                <TextField name="descripcion" label="Descripcion" onChange={handleChange}
                           value={alojamientoSeleccionado && alojamientoSeleccionado.descripcion}/>

                <TextField name="direccion" label="Direccion" onChange={handleChange}
                           value={alojamientoSeleccionado && alojamientoSeleccionado.direccion}/>
                <br/>
                <TextField name="numeroPersonas" label="Num. Personas" onChange={handleChange}
                           value={alojamientoSeleccionado && alojamientoSeleccionado.numeroPersonas}/>

                <TextField name="numeroHabitaciones" label="Num. Habitaciones" onChange={handleChange}
                           value={alojamientoSeleccionado && alojamientoSeleccionado.numeroHabitaciones}/>

                <TextField name="numeroCamas" label="Num. Camas" onChange={handleChange}
                           value={alojamientoSeleccionado && alojamientoSeleccionado.numeroCamas}/>
                <br/>
                <TextField name="numeroBanos" label="Num. Baños" onChange={handleChange}
                           value={alojamientoSeleccionado && alojamientoSeleccionado.numeroBanos}/>

                <TextField name="tipoAlojamiento" label="Tipo Alojamiento" onChange={handleChange}
                           value={alojamientoSeleccionado && alojamientoSeleccionado.tipoAlojamiento}/>

                <TextField name="tipoVacacional" label="Tipo Vacacional" onChange={handleChange}
                           value={alojamientoSeleccionado && alojamientoSeleccionado.tipoVacacional}/>
                <br/>
                <TextField name="categoria" label="Categoria" onChange={handleChange}
                           value={alojamientoSeleccionado && alojamientoSeleccionado.categoria}/>

                <TextField name="municipio" label="Municipio" onChange={handleChange}
                           value={alojamientoSeleccionado && alojamientoSeleccionado.municipio}/>

                <TextField name="usuario" label="Usuario" onChange={handleChange}
                           value={alojamientoSeleccionado && alojamientoSeleccionado.usuario}/>
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
                <h3>Estás seguro que deseas eliminar el Alojamiento:</h3>
                <b><p>--( {alojamientoSeleccionado && alojamientoSeleccionado.nombre} )--</p></b>
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
                <h1>Crud Alojamientos</h1>
                <Button onClick={() => abrirCerrarModalInsertar()}>Insertar</Button>
                <br/><br/>
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Id</TableCell>
                                <TableCell>Nombre</TableCell>
                                <TableCell>Descripcion</TableCell>
                                <TableCell>Direccion</TableCell>
                                <TableCell>Num. Personas</TableCell>
                                <TableCell>Num. Habitaciones</TableCell>
                                <TableCell>Num. Camas</TableCell>
                                <TableCell>Num. Baños</TableCell>
                                <TableCell>Tipo Alojamiento</TableCell>
                                <TableCell>Tipo Vacacional</TableCell>
                                <TableCell>Categoria</TableCell>
                                <TableCell>Municipio</TableCell>
                                <TableCell>Usuario</TableCell>
                                <TableCell>Acciones</TableCell>
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {list.map(alojamiento => (
                                <TableRow key={alojamiento.ID}>
                                    <TableCell>{alojamiento.ID}</TableCell>
                                    <TableCell>{alojamiento.nombre}</TableCell>
                                    <TableCell>{alojamiento.descripcion}</TableCell>
                                    <TableCell>{alojamiento.direccion}</TableCell>
                                    <TableCell>{alojamiento.numeroPersonas}</TableCell>
                                    <TableCell>{alojamiento.numeroHabitaciones}</TableCell>
                                    <TableCell>{alojamiento.numeroCamas}</TableCell>
                                    <TableCell>{alojamiento.numeroBanos}</TableCell>
                                    <TableCell>{alojamiento.tipoAlojamiento}</TableCell>
                                    <TableCell>{alojamiento.tipoVacacional}</TableCell>
                                    <TableCell>{alojamiento.categoria}</TableCell>
                                    <TableCell>{alojamiento.municipio}</TableCell>
                                    <TableCell>{alojamiento.usuario}</TableCell>
                                    <TableCell>
                                        <Edit style={mystyleCursor}
                                              onClick={() => seleccionarAlojamiento(alojamiento, 'Editar')}/>
                                        &nbsp;&nbsp;
                                        <Delete style={mystyleCursor}
                                                onClick={() => seleccionarAlojamiento(alojamiento, 'Eliminar')}/>
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
                <h1>Alternativa</h1>
                <Box sx={{height: 400, width: '100%'}}>
                    <DataGrid
                        rows={rows}
                        columns={columns}
                        pageSize={5}
                        rowsPerPageOptions={[5]}
                        checkboxSelection
                        disableSelectionOnClick
                        experimentalFeatures={{newEditingApi: true}}
                    />
                </Box>
            </div>


        );
    }

export default CrudAlojamientos;