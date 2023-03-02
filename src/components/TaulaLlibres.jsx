import React, {useState, useEffect} from "react";
import { AgGridReact } from 'ag-grid-react'; // the AG Grid React Component
import 'ag-grid-community/styles/ag-grid.css'; // Core grid CSS, always needed
import 'ag-grid-community/styles/ag-theme-alpine.css'; // Optional theme CSS

import axios from "axios";
import {useNavigate} from "react-router-dom";
//'http://biblioteca.dawpaucasesnoves.com/server/public/llibre/'

function Taulallibres(props) {

    const [llibres, setllibres]=useState([]);
    const [descarrega,setDescarrega]=useState(true);
    const navigate=useNavigate();
    const [columnes, setColumnes] =useState(
        [
            {field:'ID_LLIB', sortable:true, headerName: 'CODI', initialWidth: 120},
            {field:'TITOL', sortable:true, filter:true, headerName: 'TITOL', initialWidth: 360, editable:true}
        ]
    );
    const pepito=(e)=>{
        console.log(e)
        navigate("/llibres/"+e.data.ID_LLIB);
    }



  /*  const [columnDefs, setColumnDefs] = useState([
        {field: 'make', filter: true},
        {field: 'model', filter: true},
        {field: 'price'}
    ]);
*/

    useEffect(
        ()=>{
                setDescarrega(true);
                axios.get(
                        "http://biblioteca.dawpaucasesnoves.com/server/public/llibre/"
                    )
                    .then(response => {
                        console.log(response.data.dades);
                        setllibres(response.data.dades);
                        setDescarrega(false);
                    })
                    .catch(function (error) {
                        console.log(error);
                        setDescarrega(false);
                    });
        }
        ,
        [props.id]
    );

    return (
        <>
            <h1>Llibres</h1>
            <div className="ag-theme-alpine" style={{width: 500, height: 500}}>

            <AgGridReact
            columnDefs={columnes}
            rowData={llibres}
            animateRows={true}
            onCellDoubleClicked={pepito}
            pagination={true}
            paginationPageSize={10}
            />
            </div>
        </>
    );
}
export default Taulallibres;