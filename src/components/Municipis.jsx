import { useState,useEffect } from "react";
import {Col, ListGroup, Row} from "react-bootstrap";

function Municipis() {
    const [municipis, setMunicipis]=useState([]);
    useEffect(
        ()=>{
            fetch('http://etv.dawpaucasesnoves.com/etvServidor/public/api/provamunicipis')
                .then(response=> {
                    console.log(response);
                    return response.json(response);
                })
                .then(jsonresposta=>{
                        setMunicipis(jsonresposta.data);
                    }
                )
                .catch(function (error) {
                    console.log(error);
                })
        }
        ,
        []
    );

    return (
        <ListGroup>
            {municipis.map(function (element, index) {
                return (
                    <>
                        <ListGroup.Item variant="primary" key={index}>
                            <Row>
                                <Col>{element.municipi}</Col>
                                <Col>{element.illa}</Col>
                            </Row>
                        </ListGroup.Item>
                    </>
                );
            })}
        </ListGroup>

    );
}

export default Municipis;