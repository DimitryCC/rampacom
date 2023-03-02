import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, ListGroup } from "react-bootstrap";
function Llista(props) {
    return (
        <ListGroup>
            {props.elements.map(function (element, index) {
                return (
                    <ListGroup.Item variant="primary" key={index}>
                        {element}
                        <Button
                            variant="danger"
                            style={{ float: "right" }}
                            onClick={() => props.removeItem(index)}
                        >
                            Esborrar
                        </Button>
                    </ListGroup.Item>

                );
            })}
        </ListGroup>
    );
}
export default Llista;