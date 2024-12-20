import { Form, FormGroup, Label, Input } from "reactstrap";
import { useState } from "react";

function OfferForm({ onSubmit }) {
    const [formData, setFormData] = useState({
        contact_info: '',
        departure_time: '',
        departure_location: '',
        destination: '',
        available_seats: '',
        cost_per_seat: ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Generate a unique ride_id (you could use a UUID library)
        const ride_id = Date.now().toString();
        // Get session_id from wherever you store it after Google login
        const session_id = localStorage.getItem('session_id'); // Adjust based on how you store it
        
        const submitData = {
            ...formData,
            ride_id,
            session_id,
            // Convert seats and cost to numbers
            available_seats: parseInt(formData.available_seats),
            cost_per_seat: parseInt(formData.cost_per_seat)
        };

        onSubmit(submitData);
    };

    return (
        <Form id="ride-form" onSubmit={handleSubmit}>
            <FormGroup>
                <Label for="contact_info">Contact Info</Label>
                <Input 
                    type="text" 
                    name="contact_info" 
                    id="contact_info" 
                    value={formData.contact_info}
                    onChange={handleChange}
                    required 
                    placeholder="e.g. phone number, social media DMs" 
                />
            </FormGroup>
            <FormGroup>
                <Label for="departure_time">Departure Time</Label>
                <Input 
                    type="datetime-local" 
                    name="departure_time" 
                    id="departure_time" 
                    value={formData.departure_time}
                    onChange={handleChange}
                    required 
                />
            </FormGroup>
            <FormGroup>
                <Label for="departure_location">Departure Location</Label>
                <Input 
                    type="text" 
                    name="departure_location" 
                    id="departure_location" 
                    value={formData.departure_location}
                    onChange={handleChange}
                    required 
                    placeholder="e.g. in front of Sayles, behind Burton" 
                />
            </FormGroup>
            <FormGroup>
                <Label for="destination">Destination</Label>
                <Input 
                    type="text" 
                    name="destination" 
                    id="destination" 
                    value={formData.destination}
                    onChange={handleChange}
                    required 
                />
            </FormGroup>
            <FormGroup>
                <Label for="available_seats">Available Seats</Label>
                <Input 
                    type="number" 
                    min="0" 
                    max="15" 
                    name="available_seats" 
                    id="available_seats" 
                    value={formData.available_seats}
                    onChange={handleChange}
                    required 
                    placeholder="i.e. excluding driver seat" 
                />
            </FormGroup>
            <FormGroup>
                <Label for="cost_per_seat">Cost per Seat</Label>
                <Input 
                    type="number" 
                    min="0" 
                    max="100" 
                    name="cost_per_seat" 
                    id="cost_per_seat"
                    value={formData.cost_per_seat}
                    onChange={handleChange}
                />
            </FormGroup>
        </Form>
    );
}

export default OfferForm;