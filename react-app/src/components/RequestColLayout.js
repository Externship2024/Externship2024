import { useState, useEffect } from 'react';
import { Container, Row, Col, Card, CardTitle, CardBody, CardText, Button } from 'reactstrap';

function RequestColLayout() {
    const [cards, setCards] = useState([]); //initializes array for requests

    useEffect(() => {
        const fetchRequests = async () => {
            try {
                const response = await fetch("https://externship2024backend.vercel.app/newrequesttest");
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const requests = await response.json();

                // structures the data to match the card layout
                const newCards = requests.map((request, index) => ({
                    id: index + 1, // unique ID for each card
                    title: `Request ${index + 1}`,
                    text: (
                        <>
                            Contact info: {request.contact} <br />
                            Departure time: {request.departure_time} <br />
                            From: {request.departure_location} <br />
                            To: {request.destination} <br />
                            Needed seats: {request.needed_seats} <br />
                            Cost per seat: {request.cost_per_seat} <br />
                        </>
                    ),
                }));

                setCards(newCards);
            } catch (error) {
                console.error("Error fetching requests:", error);
            }
        };

        fetchRequests();
    }, []);

    const deleteCard = (id) => {
        setCards((prevCards) => prevCards.filter((card) => card.id !== id));
    };

    return (
        <Container style={{ marginTop: '3em' }}>
            <Row md="4" sm="2" xs="1">
                <h1>Requests</h1>
            </Row>
            <Row md="4" sm="2" xs="1">
                <Col md="6">
                    {cards.length > 0 ? (
                        cards.map((card) => (
                            <Card key={card.id} className="mb-3">
                                <CardBody>
                                    <CardTitle>{card.title}</CardTitle>
                                    <CardText>{card.text}</CardText>
                                    <Button color="danger" onClick={() => deleteCard(card.id)}>
                                        Delete
                                    </Button>
                                </CardBody>
                            </Card>
                        ))
                    ) : (
                        <p>No Requests available</p>
                    )}
                </Col>
            </Row>
        </Container>
    );
}

export default RequestColLayout;
