function CustomizeButton({ property, icon, alt, label, onClick }) {
  return (
    <button
      type="button"
      className={`btn btn-${property}`}
      onClick={onClick}
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
