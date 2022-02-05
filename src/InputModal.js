import {Modal, Button, Form} from 'react-bootstrap';

const InputModal = (props) => {

    let values = {};
    for (let i in props.inputs) {
        values[props.inputs[i].name] = '';
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        props.handleSubmit(values);
        props.closeModal();
    };

    const handleChange = (event) => {
        values[event.target.name] = event.target.value;
    }

    const createFormInput = (item, index) => {
        return(
            <Form.Group 
                className={index != 0 ? 'mt-2' : ''}
                key={index}
            >
                {item.label ? <Form.Label>{item.label}</Form.Label> : ''}
                
                <Form.Control 
                    name={item.name}
                    as={item.as}
                    rows="3"
                    onChange={handleChange} 
                    value={item.value}
                />
            </Form.Group>
		);
    }

    return (
        <Modal
            show={props.showModal}
            onHide={props.closeModal}
            backdrop="static"
        >
            <Modal.Header closeButton>
                <Modal.Title>{props.title}</Modal.Title>
            </Modal.Header>
                <form onSubmit={handleSubmit}>
                    <Modal.Body>
                        {props.inputs.map(
                            (item, index) => createFormInput(item, index)
                        )}
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={props.closeModal}>
                            Cancelar
                        </Button>
                        <Button type="submit" variant="primary">{props.action}</Button>
                    </Modal.Footer>
                </form>
        </Modal>
    )
};

export default InputModal;
