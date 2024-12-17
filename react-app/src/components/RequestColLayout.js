import { useState } from 'react';
import { Container, Row, Col, Card, CardTitle, CardBody, CardText, Button } from 'reactstrap';

const cardData = {
    contactInfo: '1234567890',
    departureTime: '12:00 PM',
    from: 'Sayles',
    to: 'Tin Tea',
    neededSeats: '2',
    costPerSeat: '10'
};

function RequestColLayout() {
    const [cards, setCards] = useState([
        {
            id: 1, title: '1', text: (
                <>
                    Contact info: {cardData.contactInfo} < br />
                    Departure time: {cardData.departureTime} < br />
                    From: {cardData.from} < br />
                    To: {cardData.to} < br />
                    Needed seats: {cardData.neededSeats} < br />
                    Cost per seat: {cardData.costPerSeat} < br />
                </>
            )
        }, {
            id: 2, title: '2', text: (
                <>
                    Contact info: {cardData.contactInfo} < br />
                    Departure time: {cardData.departureTime} < br />
                    From: {cardData.from} < br />
                    To: {cardData.to} < br />
                    Needed seats: {cardData.neededSeats} < br />
                    Cost per seat: {cardData.costPerSeat} < br />
                </>
            )
        },
        {
            id: 3, title: '3', text: (
                <>
                    Contact info: {cardData.contactInfo} < br />
                    Departure time: {cardData.departureTime} < br />
                    From: {cardData.from} < br />
                    To: {cardData.to} < br />
                    Needed seats: {cardData.neededSeats} < br />
                    Cost per seat: {cardData.costPerSeat} < br />
                </>
            )
        },
    ]);

    const deleteCard = (id) => {
        setCards(cards.filter(card => card.id !== id));
    };

    return (
        <Container style={{ marginTop: 3 + 'em' }}>
            <Row md="4" sm="2" xs="1">
                <h1>Requests</h1>
            </Row>
            <Row md="4" sm="2" xs="1">
                <Col md="6">
                    {cards.map(card => (
                        <Card key={card.id} className="mb-3">
                            <CardBody>
                                <CardTitle>{card.title}</CardTitle>
                                <CardText>{card.text}</CardText>
                                <Button color="danger" onClick={() => deleteCard(card.id)}>
                                    Delete
                                </Button>
                            </CardBody>
                        </Card>
                    ))}
                </Col>
            </Row >
        </Container >
    );
}

export default RequestColLayout;