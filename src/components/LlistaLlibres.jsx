import React, { useState, useEffect } from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import { Row,Col,ListGroup,Alert } from "react-bootstrap";
import axios from 'axios';


function LlistaLLibres(props) {
    const [llibres,setllibres]=useState([]);
    const [descarrega,setDescarrega]=useState(false);

    useEffect(
        ()=>{
            if (props.id) {
                setDescarrega(true);
                axios
                    .get(
                        "http://biblioteca.dawpaucasesnoves.com/server/public/autor/" +
                        props.id +
                        "/llibres/"
                    )
                    .then((response) => {
                        setllibres(response.data.dades);
                        setDescarrega(false);
                    })
                    .catch(function (error) {
                        console.log(error);
                        setDescarrega(false);
                    });
            }
        }
        ,
        [props.id]
    );

    if (descarrega) {
        return <Alert variant="info">Descarregant Llibres....</Alert>;
    } else
    if (llibres.length===0){
        return <Alert variant="warning">No hi ha cap llibre per aquest autor</Alert>;
    }
    return (
        <Row>
            <Col sm={6}>
                <ListGroup>
                    {llibres.map(item => (
                        <ListGroup.Item variant="primary" key={item.ID_LLIB}>
                            {item.TITOL}
                        </ListGroup.Item>
                    ))}
                </ListGroup>
            </Col>
        </Row>
    );
}

export default LlistaLLibres;