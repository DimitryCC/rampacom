import React, { useState, useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link,Outlet,useNavigate } from "react-router-dom";
import { ListGroup,Row,Col,Button } from "react-bootstrap";
import axios from 'axios';

function LlistaMunicipis() {
    const [municipis,setMunicipis]=useState([]);
    const navigate = useNavigate();

    /*
    useEffect(
       ()=>{
        axios.get('http://etv.dawpaucasesnoves.com/etvServidor/public/api/provamunicipis')
          .then(response=> {
              setMunicipis(response.data.data);
         })
        .catch(function (error) {
            console.log(error);
         })
        }
       ,
       []
    );
    */
    useEffect(
        ()=>{
            fetch('http://etv.dawpaucasesnoves.com/etvServidor/public/api/provamunicipis')
                .then(response=> {
                    return response.json();
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

    const editaItem=()=>{

    }

    return (
        <>
            <hr />
            <Row>
                <Col>
                    <h4>Llista de Municipis</h4>
                </Col>
                <Col>
                    <Button
                        variant="warning"
                        type="button"
                        onClick={() => {
                            navigate("-1");
                        }}
                    >
                        +
                    </Button>
                </Col>
            </Row>
            <br />
            <ListGroup>
                {municipis.map(function (element, index) {
                    return (
                        <ListGroup.Item variant="primary" key={index}>
                            <Row>
                                <Col sm={2}>
                                    <Link to={`${element.id}`}>{element.id}</Link>
                                </Col>
                                <Col sm={4}>{element.municipi}</Col>
                                <Col sm={4}>{element.illa}</Col>
                            </Row>
                        </ListGroup.Item>
                    );
                })}
            </ListGroup>
        </>
    );
}
export default LlistaMunicipis;