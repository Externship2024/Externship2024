import NavButton from "./NavButton";
import Modal from "./Modal";
import default_icon from "../images/plus_icon.png";
import blue_icon from "../images/plus_icon_blue.png";

const NavBar = () => {
  const buttons = [
    {
      // const newRequestButton = {
      label: "New Request",
      className: "primary",
      icon: blue_icon,
      alt: "blue plus icon",
      target: "#formModal",
    },
    {
      // const requestNavButton = {
      label: "Requests",
      link: "#",
      className: "primary",
    },
    {
      // const availabilityNavButton = {
      label: "Availabilities",
      link: "#",
      className: "secondary",
    },
    {
      // const newAvailabilityButton = {
      label: "New Availability",
      className: "secondary",
      icon: default_icon,
      alt: "default plus icon",
      target: "#formModal",
      // onClick: () => console.log("clicked"),
    },
  ];

  return (
    <nav class="navbar navbar-expand-lg bg-body-tertiary">
      <div class="container-fluid d-flex align-items-center justify-content-between">
        {/* {buttons.map((button) => (
          <div>
            <NavButton
              label={button.label}
              link={button.link}
              className={button.className}
              icon={button.icon}
              alt={button.alt}
              toggle={button.toggle}
              target="#formModal"
            />
          </div>
        ))} */}
        {/* <Button
          label={newRequestButton.label}
          className={newRequestButton.className}
          icon={newRequestButton.icon}
          alt={newRequestButton.alt}
          target={newRequestButton.target}
          onClick={() => console.log("clicked")}
        /> */}
        {buttons.map((button) => (
          <div>
            <NavButton
              label={button.label}
              link={button.link}
              className={button.className}
              icon={button.icon}
              alt={button.alt}
              target={button.target}
              // onClick={button.toggle ? toggleModal : () => {}}
            />
          </div>
        ))}
        <Modal title={"Adding new availability"} />
        {/* <div class="collapse navbar-collapse">
          <a class="navbar-brand" href="">
            New Availability
          </a>
          <Button {...newAvailabilityButton} />
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Button {...requestNavButton} />
            </li>
            <li className="nav-item">
              <Button {...availabilityNavButton} />
            </li>
          </ul>
          <a class="navbar-brand" href="">
            New Request
          </a>
          <Button {...newRequestButton} />
        </div> */}
        {/* <div class="collapse navbar-collapse">
          <Button
            label={newAvailabilityButton.label}
            className={newAvailabilityButton.className}
            icon={newAvailabilityButton.icon}
            alt={newAvailabilityButton.alt}
            target={newAvailabilityButton.target}
          />
        </div> */}
      </div>
    </nav>
  );
};

export default NavBar;
