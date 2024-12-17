DROP TABLE IF EXISTS requested_rides;

CREATE TABLE requested_rides (
    request_id VARCHAR(100) PRIMARY KEY,
    contact_info VARCHAR(255),
    departure_time TIMESTAMP NOT NULL,
    departure_location VARCHAR(255) NOT NULL,
    destination VARCHAR(255) NOT NULL,
    required_seats INTEGER,
    offer_per_seat INTEGER,
    created_at DATETIME DEFAULT GETDATE()
);