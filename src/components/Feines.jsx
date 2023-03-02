import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, Button } from "react-bootstrap";
import Llista from './Llista';

function Feines(props) {
    const [feines, setFeines] = useState([]);

    const addItem = () => {
        setFeines([...feines, document.getElementById("item").value]);
    }

    const removeItem = (index) => {
        feines.splice(index, 1);
        setFeines([...feines]);
    }

    return (
        <>
            <hr />
            <h2>Llista de tasques</h2>
            <Form>
                <Form.Group>
                    <Form.Label>Tasca</Form.Label>
                    <Form.Control type="text" id="item" placeholder="Tasca a fer.." />
                </Form.Group>
                <br />
                <Button variant="primary" onClick={addItem}>
                    Afegir
                </Button>
            </Form>
            <hr />
            <Llista elements={feines} removeItem={removeItem} />
        </>
    );
}

export default Feines;