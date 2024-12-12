const CustomizeButton = ({ className, icon, alt, label, onClick, target }) => {
  return (
    <button
      type="button"
      class={`btn btn-${className}`}
      onClick={onClick}
      data-bs-toggle="modal"
      data-bs-target={target}
    >
      {icon && (
        <img
          src={icon}
          class="img-thumbnail float-start me-2"
          alt={alt || "button"}
          width="25"
          height="25"
        />
      )}
      {label}
    </button>
  );
};

export default CustomizeButton;
