import {
    BrowserRouter,
    Routes,
    Route
} from "react-router-dom";
import Home from "./elementos/Home";
import AlojamientoIndividual from "./elementos/AlojamientoIndividual";
import ConseguirAlojamientos from "./elementos/ConseguirAlojamientos";


function App() {
  return (
      <BrowserRouter>
          <Routes>
              <Route index={true} path={"/"} element={<Home/>}/>
              <Route path={"alojamientos"} element={<ConseguirAlojamientos/>}/>
              <Route path={"alojamiento/:alojaminetoId"}  element={<AlojamientoIndividual/>}/>
          </Routes>
      </BrowserRouter>
  )
}

export default App;
