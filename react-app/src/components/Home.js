import { useState } from "react";

import default_plus_icon from "../images/plus_icon.png";
import blue_plus_icon from "../images/plus_icon_blue.png";
import offer_ride_icon from "../images/offer_ride_icon.png";
import request_ride_icon from "../images/request_ride_icon.png";

import CustomizedButton from "./CustomizedButton";
import ModalBackdrop from "./ModalBackdrop";
import RequestForm from "./RequestForm";
import OfferForm from "./OfferForm";
import RequestColLayout from "./RequestColLayout";
import OfferColLayout from "./OfferColLayout";

import {
  Container, Row, Col, Form, Input, Button, Navbar,
} from "reactstrap";

function Home() {
  const [modal, setModal] = useState(false);
  const [modalProps, setModalProps] = useState({ title: "" });
  const [formComponent, setFormComponent] = useState(null);
  const [activeButton, setActiveButton] = useState("request");

  const toggleModal = () => setModal(!modal);

  const handleSubmit = (e) => {
    // pass
  };

  const openRequestForm = () => {
    setModalProps({ title: "Adding request" });
    setFormComponent(() => RequestForm);
    toggleModal();
  };

  const openOfferForm = () => {
    setModalProps({ title: "Adding offer" });
    setFormComponent(() => OfferForm);
    toggleModal();
  };

  const displayRequestColLayout = () => {
    setActiveButton("request");
  }

  const displayOfferColLayout = () => {
    setActiveButton("offer");
  }

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
                property={activeButton === "request" ? "primary" : "outline-primary"}
                icon={request_ride_icon}
                alt="request ride icon"
                label="Requesting rides"
                onClick={displayRequestColLayout}
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
                property={activeButton === "offer" ? "secondary" : "outline-secondary"}
                icon={offer_ride_icon}
                alt="offer ride icon"
                label="Offering rides"
                onClick={displayOfferColLayout}
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
        toggle={toggleModal}
        handleSubmit={handleSubmit}
      />
      {activeButton === "request" && (
        <Row className="mt-4">
          <Col>
            <RequestColLayout />
          </Col>
        </Row>)}
      {activeButton === "offer" && (
        <Row className="mt-4">
          <Col>
            <OfferColLayout />
          </Col>
        </Row>)}
    </header>
  );
}

export default Home;
