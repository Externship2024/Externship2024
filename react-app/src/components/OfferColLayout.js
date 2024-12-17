import { Container, Row, Col, Card, CardBody, CardText } from 'reactstrap';

function OfferColLayout() {
    return (
        <Container style={{ marginTop: 3 + 'em' }}>
            <Row md="4" sm="2" xs="1">
                <h1>Offers</h1>
            </Row>
            <Row md="4" sm="2" xs="1">
                <Col md="6">
                    <Card>
                        <CardBody>
                            <CardText>
                                Contact info: 123-456-7890 <br />
                                Departure time: 12:00 PM <br />
                                From: Sayles <br />
                                To: Tin Tea <br />
                                Available seats: 3 <br />
                                Cost per seat: $10 <br />
                            </CardText>
                        </CardBody>
                    </Card>
                </Col>
                <Col md="6">
                    <Card>
                        <CardBody>
                            <CardText>
                                Contact info: @user_name <br />
                                Departure time: 3:00 PM <br />
                                From: James <br />
                                To: Asian Market <br />
                                Available seats: 2 <br />
                                Cost per seat: $25 <br />
                            </CardText>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </Container >
    );
}

export default OfferColLayout;