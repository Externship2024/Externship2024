import { useState } from "react";

import avatar_icon from "../images/avatar_icon.png";
import pink_plus_icon from "../images/pink_plus_icon.png";
import blue_plus_icon from "../images/plus_icon_blue.png";
import offer_ride_icon from "../images/gray_offer_ride_icon.png";
import green_offer_ride_icon from "../images/green_offer_ride_icon.png";
import request_ride_icon from "../images/gray_request_ride_icon.png";
import yellow_request_ride_icon from "../images/yellow_request_ride_icon.png";

import CustomizedButton from "./CustomizedButton";
import ModalBackdrop from "./ModalBackdrop";
import RequestForm from "./RequestForm";
import OfferForm from "./OfferForm";
import RequestColLayout from "./RequestColLayout";
import OfferColLayout from "./OfferColLayout";

import { Container, Row, Col, Navbar, Nav, NavItem, NavLink } from 'reactstrap';

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
            <Col className="d-flex justify-content-between">
              <Col xs="auto" className="align-items-center">
                <CustomizedButton
                  icon={blue_plus_icon}
                  alt="default plus icon"
                  label="New Request"
                  bgColor="#0d6efd"
                  onClick={openRequestForm}
                />
              </Col>

              <Col xs="auto" className="align-items-center">
                <CustomizedButton
                  icon={activeButton === "request" ? yellow_request_ride_icon : request_ride_icon}
                  alt="request ride icon"
                  label="Requesting rides"
                  bgColor={activeButton === "request" ? "#f79605" : "#6c757d"}
                  onClick={displayRequestColLayout}
                />
              </Col>

              <Col xs="auto" className="align-items-center">
                <CustomizedButton
                  icon={activeButton === "offer" ? green_offer_ride_icon : offer_ride_icon}
                  alt="offer ride icon"
                  label="Offering rides"
                  bgColor={activeButton === "offer" ? "#7ab01e" : "#6c757d"}
                  onClick={displayOfferColLayout}
                />
              </Col>

              <Col xs="auto" className="align-items-center">
                <CustomizedButton
                  icon={pink_plus_icon}
                  alt="default plus icon"
                  label="New Offer"
                  bgColor="#b01e7a"
                  onClick={openOfferForm}
                />
              </Col>

              <Nav className="mrx-auto" navbar>
                <NavItem className="align-items-center">
                  <NavLink className="font-weight-bold" href="/">
                    <img src={avatar_icon} alt="avatar icon" className="img-fluid rounded-circle" style={{ width: 32 }} />
                  </NavLink>
                </NavItem>
              </Nav>
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
      {
        activeButton === "request" && (
          <Row className="mt-4">
            <Col>
              <RequestColLayout />
            </Col>
          </Row>)
      }
      {
        activeButton === "offer" && (
          <Row className="mt-4">
            <Col>
              <OfferColLayout />
            </Col>
          </Row>)
      }
    </header >
  );
}

export default Home;
