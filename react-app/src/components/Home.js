import { useState } from "react";

import default_plus_icon from "../images/plus_icon.png";
import blue_plus_icon from "../images/plus_icon_blue.png";
import offer_ride_icon from "../images/offer_ride_icon.png";
import request_ride_icon from "../images/request_ride_icon.png";

import CustomizedButton from "./CustomizedButton";
import ModalBackdrop from "./ModalBackdrop";
import RequestForm from "./RequestForm";
import OfferForm from "./OfferForm";
import TwoColLayout from "./TwoColLayout";

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
  const [colLayout, setColLayout] = useState(false);

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

  const showColLayout = () => {
    setColLayout(true);
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
              <CustomizedButton
                property="primary"
                icon={blue_plus_icon}
                alt="blue plus icon"
                label="New Request"
                onClick={() => openRequestForm()}
              />
              <CustomizedButton
                property="outline-primary"
                icon={request_ride_icon}
                alt="request ride icon"
                label="Requesting rides"
                onClick={showColLayout}
              />
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
              <CustomizedButton
                property="outline-secondary"
                icon={offer_ride_icon}
                alt="offer ride icon"
                label="Offering rides"
              // onClick={() => openRequestForm()}
              />
              <CustomizedButton
                property="secondary"
                icon={default_plus_icon}
                alt="default plus icon"
                label="New Offer"
                onClick={() => openOfferForm()}
              />
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
      {colLayout && (
        <Row className="mt-4">
          <Col>
            <TwoColLayout />
          </Col>
        </Row>)}
    </header>
  );
}

export default Home;
