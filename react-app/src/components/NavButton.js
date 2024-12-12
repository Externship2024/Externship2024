import CustomizeButton from "./CustomizedButton";
// label, link, className, icon, alt, onClick, target
const NavButton = ({ label, link, className, icon, alt, onClick, target }) => {
  if (icon) {
    return (
      <CustomizeButton
        className={className}
        icon={icon}
        alt={alt}
        label={label}
        onClick={onClick}
        target={target}
      />
    );
  }
  return (
    <div class="nav">
      <a
        class={`link-${className} link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover`}
        href={link}
      >
        {label}
      </a>
    </div>
  );
};

export default NavButton;
