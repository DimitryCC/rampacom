import { BrowserRouter, Routes, Route } from "react-router-dom";
import Menu from "./components/Menu";
import Alojamientos from "./components/Alojamientos/Alojamientos";
import Login from "./components/Login/Login";
import CreaUser from "./components/Login/CreaUsuer";
import LogAdmin from "./components/Login/LogAdmin";
import Logueado from "./components/Login/Logueado";

import ProtectedRoutesAdmin from "./components/Login/ProtectedRoutesAdmin";
import CreaReserves from "./components/Reserves/CreaReserves";
import ProtectedRoutesToken from "./components/Login/ProtectedRoutesToken";
import CrudAlojamientos from "./components/Crud/CrudAlojamientos";
import AdminSelect from "./components/Crud/AdminSelect";
import CrudCategoria from "./components/Crud/CrudCategoria";
import CrudUsuario from "./components/Crud/CrudUsuario";
import CrudFotos from "./components/Crud/CrudFotos";
import CrudValoraciones from "./components/Crud/CrudValoraciones";
import PerfilUser from "./components/Usuarios/PerfilUser";
import Inicio from "./components/Fotografies/Inicio";
import CrudIdiomas from "./components/Crud/CrudIdiomas";
import CrudMunicipios from "./components/Crud/CrudMunicipios";
import CrudServicios from "./components/Crud/CrudServicios";
import CrudReservas from "./components/Crud/CrudReservas";
import CrudDescripciones from "./components/Crud/CrudDescripciones";
import CrudAlojServicios from "./components/Crud/CrudAlojServicios";
import CrudTipoAlojamiento from "./components/Crud/CrudTipoAlojamiento";
import CrudTipoVacacional from "./components/Crud/CrudTipoVacacional";
import UserSelect from "./components/UserNoAdmin/UserSelect"
import AlojamientosPropietario from "./components/CrudUsuario/AlojamientosPropietario";
import ReservesUsuario from "./components/CrudUsuario/ReservesUsuario";
import ValoracionUsuario from "./components/CrudUsuario/ValoracionUsuario";
import ContactForm from "./components/Login/ContacForm";
import ProtectedRoutesPropietari from "./components/Login/ProtectedRoutesPropietari";


function App() {

  return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Menu />}>
              <Route path="/*" element={<Inicio />} />
            <Route index element={<Inicio />} />
            <Route path="/alojamientos" element={<Alojamientos />} />
            <Route path="/login" element={<Login />} />
            <Route path="/creauser" element={<CreaUser />} />
            <Route path="/logueado" element={<Logueado />} />
            <Route element={<ProtectedRoutesAdmin />} >
                <Route element={<LogAdmin />} path="/protected" />
                <Route element={<AdminSelect />} path="/adminselect" />
                <Route element={<CrudAlojamientos />} path="/crudalojamientos" />
                <Route element={<CrudCategoria />} path="/crudcategoria" />
                <Route element={<CrudUsuario />} path="/crudusuario" />
                <Route element={<CrudFotos />} path="/crudfotos" />
                <Route element={<CrudValoraciones />} path="/crudvaloraciones" />
                <Route element={<CrudIdiomas />} path="/crudidiomas" />
                <Route element={<CrudMunicipios />} path="/crudmunicipios" />
                <Route element={<CrudServicios />} path="/crudservicios" />
                <Route element={<CrudReservas />} path="/crudreservas" />
                <Route element={<CrudDescripciones />} path="/cruddescripciones" />
                <Route element={<CrudAlojServicios />} path="/crudalojservicios" />
                <Route element={<CrudTipoAlojamiento />} path="/crudtipoalojamiento" />
                <Route element={<CrudTipoVacacional />} path="/crudtipovacacional" />
            </Route>
            <Route element={<ProtectedRoutesToken />} >
                <Route element={<CreaReserves />} path="/reserves" />
                <Route element={<PerfilUser />} path="/perfil" />
                <Route element={<UserSelect />} path="/userselect" />
                <Route element={<ReservesUsuario />} path="/reservesusuario" />
                <Route element={<ValoracionUsuario />} path="/valoracionusuario" />
            </Route>
            <Route element={<ProtectedRoutesPropietari />} >
                <Route element={<AlojamientosPropietario />} path="/alojamientospropietario" />
            </Route>
          </Route>

        </Routes>

      </BrowserRouter>
  );
}

export default App;
