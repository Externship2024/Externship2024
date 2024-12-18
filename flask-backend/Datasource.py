import psycopg2
from config import Config

class DataSource:
    def __init__(self):
        # Connect to the database using the credentials in config.py
        self.connection = self.connect()

    def connect(self):
        try:
            connection = psycopg2.connect(
                host=Config.DB_HOST,
                database=Config.DB_NAME,
                user=Config.DB_USER,
                password=Config.DB_PASSWORD,
                port=Config.DB_PORT,
                sslmode=Config.SSLMODE
            )
        except Exception as e:
            print("Connection error: ", e)
            exit()
        return connection

    def add_requested_ride(self, ride_data):
        try:
            cursor = self.connection.cursor()
            query = """
            INSERT INTO requested_rides 
            (request_id, contact_info, departure_time, departure_location, destination, required_seats, offer_per_seat, created_at) 
            VALUES (%s, %s, %s, %s, %s, %s, %s, CURRENT_TIMESTAMP);
            """
            cursor.execute(query, (
                ride_data['request_id'], 
                ride_data['contact_info'], 
                ride_data['departure_time'], 
                ride_data['departure_location'], 
                ride_data['destination'], 
                ride_data['required_seats'], 
                ride_data['offer_per_seat']
            ))
            self.connection.commit()
            print("Ride added successfully!")
        except Exception as e:
            print("Error inserting ride:", e)
            self.connection.rollback()
