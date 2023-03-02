import Carrusel from "./Carrusel";
import {MDBFooter} from "mdb-react-ui-kit";

function Inicio(){
    const mystyle = {
        alignItems: 'center',
        textAlign:'center',
        justifyContent: 'center'
    };

    return(
        <>
        <div>
            <br/>
            <h1 style={mystyle}>HOSPEDAJE RAMPACOM</h1>
            <br/>
            <Carrusel />
            <br/>
        </div>
        </>
    )
}
export default Inicio