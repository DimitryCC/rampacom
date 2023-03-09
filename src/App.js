import { BrowserRouter, Routes, Route } from "react-router-dom";
import Feines from "./components/Feines";
import Autors from "./components/Autors";
import Menu from "./components/Menu";
import Municipis from "./components/Municipis";
import EditaMunicipis from "./components/EditaMunicipis";
import LlistaMunicipis from "./components/LlistaMunicipis";
import TaulaLlibres from "./components/TaulaLlibres";
import Carrusel from "./components/Fotografies/Carrusel";
import Alojamientos from "./components/Alojamientos/Alojamientos";
import Login from "./components/Login/Login";
import CreaUser from "./components/Login/CreaUsuer";
import CreaIdioma from "./components/Idiomas/CreaIdioma";
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
import AlojaminetosFiltrados from "./components/Frontend/AlojaminetosFiltrados";
import AlojamientoIndividual from "./components/Frontend/AlojamientoIndividual";


function App() {
    //<ProtectedRoute path="/protected" element={<LogAdmin />} />

  return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Menu />}>
              <Route path="/*" element={<Inicio />} />
            <Route index element={<Inicio />} />
            <Route path="/feines" element={<Feines />} />
            <Route path="/contacto" element={<ContactForm />} />
            <Route path="/autors" element={<Autors />} />
            <Route path="/municipis" element={<Municipis />} />
            <Route path="/municipis/:id" element={<EditaMunicipis />} />
            <Route path="/llistamunicipis" element={<LlistaMunicipis />} />
            <Route path="/taulallibres" element={<TaulaLlibres />} />
            <Route path="/alojamientos" element={<AlojaminetosFiltrados />} />
              <Route path="/alojamiento/:alojaminetoId" element={<AlojamientoIndividual />} />
            <Route path="/login" element={<Login />} />
            <Route path="/creauser" element={<CreaUser />} />
            <Route path="/creaIdioma" element={<CreaIdioma />} />
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
                <Route element={<AlojamientosPropietario />} path="/alojamientospropietario" />
                <Route element={<ReservesUsuario />} path="/reservesusuario" />
                <Route element={<ValoracionUsuario />} path="/valoracionusuario" />
            </Route>
          </Route>

        </Routes>

      </BrowserRouter>
  );
}

export default App;
