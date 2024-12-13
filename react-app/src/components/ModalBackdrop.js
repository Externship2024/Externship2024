import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

function ModalBackdrop({ title, body, modal, toggle }) {
  return (
    <div>
      <Modal isOpen={modal} toggle={toggle} backdrop="static">
        <ModalHeader >{title}</ModalHeader>
        <ModalBody>
          {body}
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={toggle}>
            Post
          </Button>
          <Button color="secondary" onClick={toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default ModalBackdrop;