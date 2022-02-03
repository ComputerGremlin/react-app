import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const InputModal = (props) => (
    <Modal
        show={props.showModal}
        onHide={props.closeModal}
        backdrop="static"
    >
        <Modal.Header closeButton>
            <Modal.Title>Modal title</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            I will not close if you click outside me. Don't even try to press
            escape key.
        </Modal.Body>
        <Modal.Footer>
            <Button variant="secondary" onClick={props.closeModal}>
                Close
            </Button>
            <Button variant="primary">Understood</Button>
        </Modal.Footer>
    </Modal>
);

export default InputModal;
