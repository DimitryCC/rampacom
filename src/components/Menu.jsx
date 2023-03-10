import { Link, Outlet } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar,Nav,Container } from "react-bootstrap";
import Cookies from "js-cookie";
import Carrusel from "./Fotografies/Carrusel";
import { MDBFooter } from 'mdb-react-ui-kit';
import Inicio from "./Fotografies/Inicio";


const mystyleLink = {
    alignItems: 'center',
    textAlign:'center',
    color: 'lightblue',
    justifyContent: 'center'
};
const mystyleFooter = {
    backgroundColor: 'lightblue',
    margin: 'auto',
    padding: 'auto'
};

function Menu() {
    const mailCookie = Cookies.get('mailCookie');
    const adminHerr = Cookies.get('adminHerr');
    const userHerr = Cookies.get('userHerr');
    return (
        <>
            <Navbar bg="dark" className="justify-content-md-center" variant="dark" expand="sm" sticky="top">
                <Nav className="mr-auto">
                    <Link className="nav-link" to="/inicio">Inicio</Link>
                    <Link className="nav-link" to="/alojamientos" >Alojamientos</Link>
                    <Link className="nav-link" to="/login">Login</Link>
                    <Link className="nav-link" to="/contacto">Contactanos</Link>
                    <Link className="nav-link" to="/userselect"> {userHerr} </Link>
                    <Link className="nav-link" to="/adminselect"> {adminHerr} </Link>
                </Nav>
                <Nav className="mr-auto">
                <Link className="nav-link" to="/perfil" style={mystyleLink}> {mailCookie} </Link>
                </Nav>
            </Navbar>
            <Container>
                <Outlet/>
            </Container>
            <MDBFooter bgColor='light' >
                <div className='text-center p-3' style={{ backgroundColor: 'lightblue' }}>
                    &copy; {new Date().getFullYear()} Rampacom:{' '}
                    <a className='text-dark' href='http://www.rampacom.com/'>
                        Rampacom.com
                    </a>
                </div>
            </MDBFooter>
        </>


    );
}

export default Menu;