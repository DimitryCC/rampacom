import React, { useState, useEffect } from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';

import SelectAlojamientos from "./SelectAlojamientos";

function Alojamientos(props) {
    const [alojamientoId,setAlojamientoId]=useState(null);

    const onChange=(e)=>{
        setAlojamientoId(e.target.value);
    }

    return (
        <>
            <hr/>
            <h2>Alojamientos</h2>
            <SelectAlojamientos onChange={onChange} />
            <hr/>

        </>
    );
}
export default Alojamientos;