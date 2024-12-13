function Modal({ title }) {
  return (
    <div
      class="modal-fade"
      id="formModal"
      data-bs-backdrop="static"
      tabindex="-1"
      aria-labelledby="formModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">{title}</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <p>Modal body text goes here.</p>
          </div>
          {/* <button
            type="button"
            class="btn btn-secondary"
            data-bs-dismiss="modal"
          >
            Close
          </button> */}
          <div class="modal-footer">
            <button type="button" class="btn btn-primary">
              Post
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Modal;
