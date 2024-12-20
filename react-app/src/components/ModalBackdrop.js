import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap";

function ModalBackdrop({ title, FormComponent, modal, toggle, handleSubmit }) {
  return (
    <div>
      <Modal isOpen={modal} toggle={toggle} backdrop="static">
        <ModalHeader >{title}</ModalHeader>
        <ModalBody>
          <FormComponent />
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={toggle}>
            Cancel
          </Button>
          <Button color="primary" onClick={toggle}>
            Post
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default ModalBackdrop;