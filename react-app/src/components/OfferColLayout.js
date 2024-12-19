import { useState, useEffect } from "react";
import { Container, Row, Col, Card, CardTitle, CardBody, CardText, Button } from "reactstrap";

function OfferColLayout() {
    const [cards, setCards] = useState([]); // State to store the fetched cards

    // Function to fetch data from the Flask backend
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("https://externship2024backend.vercel.app/newoffertest"); // Change URL if hosted on a different domain
                if (!response.ok) {
                    throw new Error("Failed to fetch data");
                }
                const data = await response.json();
                // Transform the fetched data into a card structure
                const newCard = {
                    id: Date.now(), // Unique ID for the card
                    title: "Offer", // Title for the card
                    text: (
                        <>
                            Contact info: {data.contact} <br />
                            Departure time: {data.departure_time} <br />
                            From: {data.departure_location} <br />
                            To: {data.destination} <br />
                            Available seats: {data.needed_seats} <br />
                            Cost per seat: {data.cost_per_seat} <br />
                        </>
                    ),
                };
                setCards((prevCards) => [...prevCards, newCard]); // Append new card to the list
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []); // Empty dependency array ensures this runs once on mount

    // Function to delete a card
    const deleteCard = (id) => {
        setCards(cards.filter((card) => card.id !== id));
    };

    return (
        <Container style={{ marginTop: "3em" }}>
            <Row md="4" sm="2" xs="1">
                <h1>Offers</h1>
            </Row>
            <Row md="4" sm="2" xs="1">
                <Col md="6">
                    {cards.map((card) => (
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
            </Row>
        </Container>
    );
}

export default OfferColLayout;
