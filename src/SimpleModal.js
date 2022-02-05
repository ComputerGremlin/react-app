import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const SimpleModal = (props) => (
    <Modal
        show={props.showModal}
        onHide={props.closeModal}
        backdrop="static"
    >
        <Modal.Header closeButton>
            <Modal.Title>{props.title}</Modal.Title>
        </Modal.Header>
            <Modal.Body>
                {props.body}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={props.closeModal}>
                    Cancelar
                </Button>
                <Button variant={props.buttonType} onClick={props.handleConfirm}>
                    {props.action}
                </Button>
            </Modal.Footer>
    </Modal>
);

export default SimpleModal;
