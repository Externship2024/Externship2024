function CustomizeButton({ icon, alt, label, bgColor, onClick }) {
  const btnStyle = {
    // marginRight: .25 + 'em',
    color: "#fff",
    backgroundColor: bgColor,
  }

  return (
    <button
      type="button"
      className="btn"
      style={btnStyle}
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
