import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form,Row,Col,Alert } from "react-bootstrap";
import axios from 'axios';
function SelectAutors(props) {
    const [autors, setAutors] = useState([]);
    const [descarrega,setDescarrega]=useState(true);

    const omplirOptions=()=>{
        return autors.map(function(tupla){
            return <option key={tupla.ID_AUT} value={tupla.ID_AUT}>{tupla.NOM_AUT}</option>;
        });
    }

    useEffect(
        ()=>{
            axios.get('http://biblioteca.dawpaucasesnoves.com/server/public/autor/')
                .then(response=> {
                    console.log(response);
                    setAutors(response.data.dades);
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
                    <Form.Control as="select" size="sm" custom onChange={props.onChange}>
                        <option key="-1" value="-1">Tria un autor...</option>
                        { omplirOptions() }
                    </Form.Control>
                </Col>
            </Row>
        );
}
export default SelectAutors;