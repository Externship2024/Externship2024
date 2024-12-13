import { useState } from "react";

import default_plus_icon from "../images/plus_icon.png";
import blue_plus_icon from "../images/plus_icon_blue.png";
import CustomizedButton from "./CustomizedButton";
import ModalBackdrop from "./ModalBackdrop";

import {
  Container, Row, Col, Form, Input, Button, Navbar, Nav,
  NavbarBrand, NavLink, NavItem,
} from "reactstrap";

function Header() {
  const [modal, setModal] = useState(false);
  const [modalProps, setModalProps] = useState({
    title: "",
    body: ""
  });

  const toggle = () => setModal(!modal);
  const onButtonClick = (title, body) => {
    setModalProps({ title, body });
    toggle();
  };

  return (
    <header>
      <Navbar
        fixed="top"
        color="light"
        light
        expand="md"
        className="border-bottom border-gray bg-white"
      >
        <Container>
          <Row className="w-100">
            <Col xs="auto" className="d-flex justify-content-start align-items-center">
              <NavbarBrand
                className="d-inline-block p-0 me-4"
              >
                <CustomizedButton
                  property="primary"
                  icon={blue_plus_icon}
                  alt="blue plus icon"
                  label="New Request"
                  onClick={() => onButtonClick("Adding request", "Text")}
                />
              </NavbarBrand>
              <Nav className="ml-auto" navbar>
                <NavItem className="d-flex align-items-center ms-4">
                  <NavLink className="font-weight-bold link-primary link-offset-2 
                  link-underline-opacity-25 link-underline-opacity-100-hover" href="/">
                    Requests
                  </NavLink>
                </NavItem>
              </Nav>
            </Col>

            <Col xs className="d-flex justify-content-center align-items-center">
              <Form className="d-flex align-items-center">
                <Input
                  type="search"
                  className="mx-2"
                  placeholder="Search rides"
                />
                <Button type="submit" color="primary" outline>
                  Search
                </Button>
              </Form>
            </Col>

            <Col xs="auto" className="d-flex justify-content-end align-items-center">
              <Nav className="ml-auto" navbar>
                <NavItem className="d-flex align-items-center me-4">
                  <NavLink className="font-weight-bold link-secondary link-offset-2 
                  link-underline-opacity-25 link-underline-opacity-100-hover" href="/">
                    Offers
                  </NavLink>
                </NavItem>
              </Nav>
              <NavbarBrand
                className="d-inline-block p-0 ms-4"
              >
                <CustomizedButton
                  property="secondary"
                  icon={default_plus_icon}
                  alt="default plus icon"
                  label="New Offer"
                  onClick={() => onButtonClick("Adding offer", "Text")}
                />
              </NavbarBrand>
            </Col>
          </Row>
        </Container>
      </Navbar>
      <ModalBackdrop
        title={modalProps.title}
        body={modalProps.body}
        modal={modal}
        toggle={toggle}
      />
    </header>
  );
}

export default Header;
