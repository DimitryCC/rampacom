import {useNavigate} from "react-router-dom";

function AdminSelect(){
    const mystyleButtons = {
        alignItems: 'center',
        textAlign: 'center',
        fontWeight: 'bold',
        margin: '1%',
        padding: '1%'
    };
    const navigate = useNavigate();

    function irAlojamientos(){
        navigate("/crudalojamientos")
    }
    function irCategoria(){
        navigate("/crudcategoria")
    }
    function irUsuario() {
        navigate("/crudusuario")
    }
    function irFotos() {
        navigate("/crudfotos")
    }
    function irValoraciones() {
        navigate("/crudvaloraciones")
    }
    function irIdiomas() {
        navigate("/crudidiomas")
    }
    function irMunicipios() {
        navigate("/crudmunicipios")
    }
    function irServicios() {
        navigate("/crudservicios")
    }
    function irReservas() {
        navigate("/crudreservas")
    }
    function irDescripciones() {
        navigate("/cruddescripciones")
    }
    function irAlojServicios() {
        navigate("/crudalojservicios")
    }
    function irTipoAlojamiento() {
        navigate("/crudtipoalojamiento")
    }
    function irTipoVacacional() {
        navigate("/crudtipovacacional")
    }

    return (
        <div style={mystyleButtons}>
            <h1>Herramientas de Administrador</h1>
            <br/>
            <button style={mystyleButtons} onClick={() => irAlojamientos()}>Crud Alojamientos</button>
            <button style={mystyleButtons} onClick={() => irAlojServicios()}>Crud Aloj-Servicios</button>
            <button style={mystyleButtons} onClick={() => irCategoria()}>Crud Categoria</button>
            <button style={mystyleButtons} onClick={() => irDescripciones()}>Crud Descripcion</button>
            <br/>
            <button style={mystyleButtons} onClick={() => irFotos()}>Crud Fotos</button>
            <button style={mystyleButtons} onClick={() => irIdiomas()}>Crud idiomas</button>
            <button style={mystyleButtons} onClick={() => irMunicipios()}>Crud Municipios</button>
            <button style={mystyleButtons} onClick={() => irReservas()}>Crud Reservas</button>
            <br/>
            <button style={mystyleButtons} onClick={() => irServicios()}>Crud Servicios</button>
            <button style={mystyleButtons} onClick={() => irTipoAlojamiento()}>Crud Tipo Aloj.</button>
            <button style={mystyleButtons} onClick={() => irTipoVacacional()}>Crud Tipo Vacacional</button>
            <button style={mystyleButtons} onClick={() => irUsuario()}>Crud Usuarios</button>
            <br/>
            <button style={mystyleButtons} onClick={() => irValoraciones()}>Crud Valoraciones</button>
            <br/>
        </div>
    )
}

export default AdminSelect;