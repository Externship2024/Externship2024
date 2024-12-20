import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap";

function ModalBackdrop({ title, FormComponent, modal, toggle, handleSubmit }) {
    return (
        <Modal isOpen={modal} toggle={toggle}>
            <ModalHeader toggle={toggle}>{title}</ModalHeader>
            <ModalBody>
                {FormComponent && <FormComponent onSubmit={handleSubmit} />}
            </ModalBody>
            <ModalFooter>
                <Button color="primary" onClick={() => document.getElementById('ride-form').requestSubmit()}>
                    Submit
                </Button>
                <Button color="secondary" onClick={toggle}>Cancel</Button>
            </ModalFooter>
        </Modal>
    );
}

export default ModalBackdrop;