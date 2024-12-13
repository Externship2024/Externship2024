import { Form, FormGroup, Label, Input } from "reactstrap";

function RequestForm({ handleSubmit }) {
    return (
        <Form onSubmit={handleSubmit}>
            <FormGroup>
                <Label for="contact_info">Contact Info</Label>
                <Input type="text" name="contact_info" id="contact_info" required placeholder="e.g. phone number, social media DMs" />
            </FormGroup>
            <FormGroup>
                <Label for="departure_time">Departure Time</Label>
                <Input type="datetime-local" name="departure_time" id="departure_time" required />
            </FormGroup>
            <FormGroup>
                <Label for="departure_location">Departure Location</Label>
                <Input type="text" name="departure_location" id="departure_location" required placeholder="e.g. in front of Sayles, behind Burton" />
            </FormGroup>
            <FormGroup>
                <Label for="destination">Destination</Label>
                <Input type="text" name="destination" id="destination" required />
            </FormGroup>
        </Form>
    )
}

export default RequestForm;