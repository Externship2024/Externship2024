import React, { useState } from "react";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";

function OfferForm({ onSubmit }) {
    const [formData, setFormData] = useState({
        contact_info: '',
        departure_time: '',
        departure_location: '',
        destination: '',
        available_seats: '',
        cost_per_seat: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        console.log(formData);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <Form id="ride-form" onSubmit={handleSubmit}>
            <FormGroup>
                <Label for="contact_info">Contact Info</Label>
                <Input type="text" name="contact_info" value={formData.contact_info} onChange={handleChange} id="contact_info" required placeholder="e.g. phone number, social media DMs" />
            </FormGroup>
            <FormGroup>
                <Label for="departure_time">Departure Time</Label>
                <Input type="datetime-local" name="departure_time" value={formData.departure_time} onChange={handleChange} id="departure_time" required />
            </FormGroup>
            <FormGroup>
                <Label for="departure_location">Departure Location</Label>
                <Input type="text" name="departure_location" value={formData.departure_location} onChange={handleChange} id="departure_location" required placeholder="e.g. in front of Sayles, behind Burton" />
            </FormGroup>
            <FormGroup>
                <Label for="destination">Destination</Label>
                <Input type="text" name="destination" value={formData.destination} onChange={handleChange} id="destination" required />
            </FormGroup>
            <FormGroup>
                <Label for="available_seats">Available Seats</Label>
                <Input type="number" min="0" max="15" name="available_seats" value={formData.available_seats} onChange={handleChange} id="available_seats" required placeholder="i.e. excluding driver seat" />
            </FormGroup>
            <FormGroup>
                <Label for="cost_per_seat">Cost per Seat</Label>
                <Input type="number" min="0" max="100" name="cost_per_seat" value={formData.cost_per_seat} onChange={handleChange} id="cost_per_seat" />
                
            </FormGroup>
            <Button type="submit" color="primary">Post</Button>
        </Form>
    );
}

export default OfferForm;