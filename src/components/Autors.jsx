import React, { useState, useEffect } from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import SelectAutors from "./SelectAutors";
import LlistaLLibres from "./LlistaLlibres";

function Autors(props) {
    const [autorid,setAutorId]=useState(null);

    const onChange=(e)=>{
        setAutorId(e.target.value);
    }

    return (
        <>
            <hr/>
            <h2>Autors Bilioteca</h2>
            <SelectAutors onChange={onChange} />
            <hr/>
            <LlistaLLibres id={autorid} />
        </>
    );
}
export default Autors;