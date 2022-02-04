import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const InputModal = (props) => {

    let value = "";

    const handleSubmit = (event) => {
        event.preventDefault();
        props.handleSubmit(value);
        props.closeModal();
    };

    const handleChange = (event) => {
        value = event.target.value;
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
                            <input onChange={handleChange} type="text"></input>
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
