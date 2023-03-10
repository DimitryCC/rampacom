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

    function irValoraciones() {
        navigate("/valoracionusuario")
    }

    function irReservas() {
        navigate("/reservesusuario")
    }
    function irDescripciones() {
        navigate("/cruddescripciones")
    }


    return (
        <div style={mystyleButtons}>
            <h1>Herramientas de Usuario</h1>
            <br/>
            <button style={mystyleButtons} onClick={() => irAlojamientos()}>Lista de Tus Alojamientos (Solo para Propietarios)</button><br/>
            <button style={mystyleButtons} onClick={() => irReservas()}>Lista de Tus Reservas</button><br/>
            <button style={mystyleButtons} onClick={() => irValoraciones()}>Lista de Tus Valoraciones</button><br/>
            <button style={mystyleButtons} onClick={() => irDescripciones()}>Lista de Tus Fotografias</button>
            <br/>
            <br/>
        </div>
    )
}

export default UserSelect;