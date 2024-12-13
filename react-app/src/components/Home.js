import { useState } from "react";

import { useState } from "react";

import default_plus_icon from "../images/plus_icon.png";
import blue_plus_icon from "../images/plus_icon_blue.png";
import CustomizedButton from "./CustomizedButton";
import ModalBackdrop from "./ModalBackdrop";
import RequestForm from "./RequestForm";
import OfferForm from "./OfferForm";

import {
  Container, Row, Col, Form, Input, Button, Navbar, Nav,
  NavbarBrand, NavLink, NavItem,
} from "reactstrap";

function Home() {
  const [modal, setModal] = useState(false);
  const [modalProps, setModalProps] = useState({
    title: "",
  });
  const [formComponent, setFormComponent] = useState(null);

  const toggle = () => setModal(!modal);

  const handleSubmit = (e) => {
    e.preventDefault();
    toggle();
  };

  const openRequestForm = () => {
    setModalProps({ title: "Adding request" });
    setFormComponent(() => RequestForm);
    toggle();
  };

  const openOfferForm = () => {
    setModalProps({ title: "Adding offer" });
    setFormComponent(() => OfferForm);
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
                  onClick={() => openRequestForm()}
                />
              </NavbarBrand>
              <Nav className="ml-auto" navbar>
                <Nav className="ml-auto" navbar>
                  <NavItem className="d-flex align-items-center ms-4">
                    <NavLink className="font-weight-bold link-primary link-offset-2 
                  link-underline-opacity-25 link-underline-opacity-100-hover" href="/">
                      Requesting rides
                    </NavLink>
                  </NavItem>
                </Nav>
            </Col>

            <Col xs className="d-flex justify-content-center align-items-center">
              <Col xs className="d-flex justify-content-center align-items-center">
                <Form className="d-flex align-items-center">
                  <Input
                    type="search"
                    className="mx-2"
                    placeholder="Search rides"
                  />
                  <Button type="submit" color="primary" outline>
                    <Button type="submit" color="primary" outline>
                      Search
                    </Button>
                </Form>
              </Col>

              <Col xs="auto" className="d-flex justify-content-end align-items-center">
                <Col xs="auto" className="d-flex justify-content-end align-items-center">
                  <Nav className="ml-auto" navbar>
                    <NavItem className="d-flex align-items-center me-4">
                      <NavLink className="font-weight-bold link-secondary link-offset-2 
                  link-underline-opacity-25 link-underline-opacity-100-hover" href="/">
                        Offering rides
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
                      onClick={() => openOfferForm()}
                    />
                  </NavbarBrand>
                </Col>
              </Row>
            </Container>
          </Navbar>
          <ModalBackdrop
            title={modalProps.title}
            FormComponent={formComponent}
            modal={modal}
            toggle={toggle}
            handleSubmit={handleSubmit}
          />
        </header>
        );
}

        export default Home;
