import { useState, useEffect } from 'react';
import { Container, Row, Col, Card, CardTitle, CardBody, CardText, Button } from 'reactstrap';

function OfferColLayout() {
    const [cards, setCards] = useState([]); //initializes array for offers

    useEffect(() => {
        const fetchOffers = async () => {
            try {
                const response = await fetch("https://externship2024backend.vercel.app/available-rides");
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const offers = await response.json();

                // structures the data to match the card layout
                const newCards = offers.map((offer, index) => ({
                    id: index + 1, // unique ID for each card
                    title: `Offer ${index + 1}`,
                    text: (
                        <>
                            Contact info: {offer.contact} <br />
                            Departure time: {offer.departure_time} <br />
                            From: {offer.departure_location} <br />
                            To: {offer.destination} <br />
                            Available seats: {offer.needed_seats} <br />
                            Cost per seat: {offer.cost_per_seat} <br />
                        </>
                    ),
                }));

                setCards(newCards);
            } catch (error) {
                console.error("Error fetching offers:", error);
            }
        };

        fetchOffers();
    }, []);

    const deleteCard = (id) => {
        setCards((prevCards) => prevCards.filter((card) => card.id !== id));
    };

    return (
        <Container style={{ marginTop: '3em' }}>
            <Row md="4" sm="2" xs="1">
                <h1>Offers</h1>
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
                        <p>No offers available</p>
                    )}
                </Col>
            </Row>
        </Container>
    );
}

export default OfferColLayout;
