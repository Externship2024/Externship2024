import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import { Container, Row, Col, Modal } from 'reactstrap';
import Home from './components/Home';
// import TwoColLayout from './components/TwoColLayout';

function App() {
  return (
    <>
      <Home />
      {/* <Container>
        <Row className="mt-4">
          <Col>
            <h1>Two Column Layout</h1>
            <TwoColLayout />
          </Col>
        </Row>
      </Container> */}
    </>
  );
}

export default App;
