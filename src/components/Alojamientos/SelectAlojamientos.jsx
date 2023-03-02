import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form,Row,Col,Alert } from "react-bootstrap";
import axios from 'axios';
function SelectAlojamientos(props) {
    const [alojamientos, setAlojamientos] = useState([]);
    const [descarrega,setDescarrega]=useState(true);
    const testURL = 'http://www.rampacom.com/ProyectoFinal/public/api/alojamiento';
    const myInit = {
        method: 'HEAD',
        mode: 'no-cors',
    };

    const myRequest = new Request(testURL, myInit);

    const omplirOptions1=()=>{
        return alojamientos.map(function(tupla){
            return <option key={tupla.ID} value={tupla.ID}>{tupla.nombre}</option>;
        });
    }

    useEffect(
        ()=>{
            axios.get('http://www.rampacom.com/ProyectoFinal/public/api/alojamiento')
                .then(response=> {
                    console.log(response);
                    setAlojamientos(response.data.result.data);
                    setDescarrega(false);
                })
                .catch(function (error) {
                    console.log(error);
                    setDescarrega(false);
                })
        }
        ,
        []
    );


    if (descarrega) {
        return <Alert variant="info">Descarregant....</Alert>;
    } else
        return (
            <Row>
                <Col sm={6}>
                    <Form.Control as="select" size="sm" onChange={props.onChange} name="pep">
                        <option key="-1" value="-1">Elige un Alojamiento...</option>
                        { omplirOptions1() }
                    </Form.Control>
                </Col>
            </Row>
        );
}
export default SelectAlojamientos;