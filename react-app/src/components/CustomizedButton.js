function CustomizeButton({ property, icon, alt, label, onClick, target }) {
  return (
    <button
      type="button"
      className={`btn btn-${property}`}
      onClick={onClick}
      data-bs-toggle="modal"
      data-bs-target={target}
    >
      {icon && (
        <img
          src={icon}
          className="img-thumbnail float-start me-2"
          alt={alt || "button"}
          width="25"
          height="25"
        />
      )}
      {label}
    </button>
  );
}

export default CustomizeButton;
