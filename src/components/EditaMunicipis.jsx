import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams,useNavigate } from "react-router-dom";

import 'bootstrap/dist/css/bootstrap.min.css';
import { Form,Button,Alert } from "react-bootstrap";

function EditaMunicipi(props) {
    const { id } = useParams();
    const navigate = useNavigate();

    const [municipi,setMunicipi]=useState('');
    const [illa,setIlla]=useState('');
    const [edita,setEdita]=useState(true);
    const [error,setError]=useState('');
    const [descarrega,setDescarrega]=useState(false);

    useEffect(
        ()=>{
            if (id==="-1") {
                setEdita(false);
            } else {
                setDescarrega(true);
                axios.get('http://etv.dawpaucasesnoves.com/etvServidor/public/api/provamunicipis/'+id)
                    .then(response=> {
                        setMunicipi(response.data.data.municipi);
                        setIlla(response.data.data.illa);
                        setDescarrega(false);
                    })
                    .catch(function (error) {
                        console.log(error);
                    })
            } }
        ,
        [id]
    );

    const guarda=()=>{
        if (edita) {
            axios.put('http://etv.dawpaucasesnoves.com/etvServidor/public/api/provamunicipis/'+id,
                {"municipi":municipi,"illa":illa})
                .then(response=> {
                    if(response.data.status==="success") {
                        navigate(-1);
                        setError('');
                    } else {
                        console.log(response.data);
                    }
                })
                .catch(function (error) {
                    setError(getMsgError(error.response.data.data));
                })
        } else{
            axios.post('http://etv.dawpaucasesnoves.com/etvServidor/public/api/provamunicipis',
                {"municipi":municipi,"illa":illa})
                .then(response=> {
                    if(response.data.status==="success") {
                        navigate(-1);
                        setError('');
                    } else {
                        console.log(response.data);
                    }
                })
                .catch(function (error) {
                    setError(getMsgError(error.response.data.data));
                })
        }
    }

    const getMsgError=(llistaErrors)=>{
        let msg=''
        for (let clau in llistaErrors) {
            msg=msg+llistaErrors[clau]+'. ';
        }
        return msg;
    }

    const esborra=()=>{
        axios
            .delete(
                "http://etv.dawpaucasesnoves.com/etvServidor/public/api/provamunicipis/" +
                id
            )
            .then((response) => {
                if (response.data.status === "success") {
                    navigate(-1);
                    setError("");
                } else {
                    console.log(response.data);
                }
            })
            .catch(function (error) {
                console.log(error.response.data.data);
                setError("Error esborrant");
            });
    }

    const gestionaChange = (event) => {
        console.log(event);
        switch (event.target.name) {
            case 'municipi':
                setMunicipi(event.target.value);
                break;
            case 'illa':
                setIlla(event.target.value);
                break;
            default:
                console.log('error input')
        }
    }
    if (descarrega) {
        return <Alert variant="info">Descarregant Llibres....</Alert>;
    } else {
        return (
            <>
                <hr />
                <h2>Municipi</h2>
                <Form>
                    {edita &&
                        <Form.Group className="mb-3">
                            <Form.Label>Id</Form.Label>
                            <Form.Control type="text" name="id" value={id} disabled />
                        </Form.Group>
                    }
                    <Form.Group className="mb-3">
                        <Form.Label>Municipi</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Nom del municipi"
                            name="municipi"
                            value={municipi}
                            onChange={gestionaChange}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Illa</Form.Label>
                        <Form.Select value={illa} name="illa" onChange={gestionaChange}>
                            <option value="">Tria una illa...</option>
                            <option value="Mallorca">Mallorca</option>
                            <option value="Menorca">Menorca</option>
                            <option value="Eivissa">Eivissa</option>
                            <option value="Formentera">Formentera</option>
                        </Form.Select>
                    </Form.Group>
                    <Button variant="primary" type="button" onClick={guarda}>
                        {edita ? "Guarda" : "Crea"}
                    </Button>
                    &nbsp;&nbsp;
                    <Button variant="warning" type="button" onClick={() => navigate(-1)}>
                        Cancel·la
                    </Button>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    {edita &&
                        <Button variant="danger" type="button" onClick={esborra}>
                            Esborra
                        </Button>
                    }
                </Form>
                <br/>
                {error!=='' && <Alert variant="danger">{error}</Alert>}
            </>
        )
    };
}
export default EditaMunicipi;