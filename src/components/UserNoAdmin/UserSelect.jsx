import {useNavigate} from "react-router-dom";

function UserSelect(){
    const mystyleButtons = {
        alignItems: 'center',
        textAlign: 'center',
        fontWeight: 'bold',
        margin: '1%',
        padding: '1%'
    };
    const navigate = useNavigate();

    function irAlojamientos(){
        navigate("/alojamientospropietario")
    }
    function irCategoria(){
        navigate("/crudcategoria")
    }
    function irFotos() {
        navigate("/crudfotos")
    }
    function irValoraciones() {
        navigate("/valoracionusuario")
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
        navigate("/reservesusuario")
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
            <h1>Herramientas de Usuario</h1>
            <br/>
            <button style={mystyleButtons} onClick={() => irAlojamientos()}>Lista de Tus Alojamientos</button><br/>
            <button style={mystyleButtons} onClick={() => irReservas()}>Lista de Tus Reservas</button><br/>
            <button style={mystyleButtons} onClick={() => irValoraciones()}>Lista de Tus Valoraciones</button><br/>
            <button style={mystyleButtons} onClick={() => irDescripciones()}>Lista de Tus Fotografias</button>
            <br/>
            <br/>
        </div>
    )
}

export default UserSelect;