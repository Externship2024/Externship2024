DROP TABLE IF EXISTS available_rides;

CREATE TABLE available_rides (
    ride_id VARCHAR(100) PRIMARY KEY,
    contact_info VARCHAR(255), 
    departure_time TIMESTAMP NOT NULL,
    departure_location VARCHAR(255) NOT NULL,
    destination VARCHAR(255) NOT NULL,
    available_seats INTEGER,
    cost_per_seat INTEGER
);