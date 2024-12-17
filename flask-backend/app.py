"""from flask_cors import CORS"""
from flask import Flask, request, jsonify
from Datasource import DataSource


app = Flask(__name__)
"""CORS(app)"""
data_source = DataSource()

offered_rides = []
requested_rides = []

@app.route('/datatest', methods=['GET'])
def index():
    return jsonify({
        'status':"request",
        'name':"hudson",
        'contact':"1234567890",
        'from':"evans",
        'to':"target center",
        'pay':10,
        'seats':2
    })

@app.route('/rides/offered', methods=['GET'])
def get_offered_rides():
    return jsonify(offered_rides)

@app.route('/rides/requested', methods=['GET'])
def get_requested_rides():
    return jsonify(requested_rides)

@app.route('/rides/offered', methods=['POST'])
def add_offered_ride():
    data = request.get_json()
    required_fields = ['contact_info', 'departure_time', 'departure_location', 'destination', 'available_seats', 'cost_per_seat']
    if not all(field in data for field in required_fields):
        return jsonify({"error": "Missing required fields"}), 400

    offered_ride = {
        "contact_info": data['contact_info'],
        "departure_time": data['departure_time'],
        "departure_location": data['departure_location'],
        "destination": data['destination'],
        "available_seats": data['available_seats'],
        "cost_per_seat": data['cost_per_seat']
    }
    offered_rides.append(offered_ride)
    return jsonify(offered_ride), 201

@app.route('/add_requested_ride', methods=['POST'])
def add_requested_ride():
    ''' Route to add a requested ride to the database '''
    data = request.json  # Receive JSON data from the request
    try:
        # Insert query using psycopg2
        query = """
            INSERT INTO requested_rides (
                contact_info, departure_time, departure_location, destination, required_seats, offer_per_seat
            ) VALUES (%s, %s, %s, %s, %s, %s)
        """
        cursor = data_source.connection.cursor()
        cursor.execute(query, (
            data['contact_info'],
            data['departure_time'],
            data['departure_location'],
            data['destination'],
            data['required_seats'],
            data['offer_per_seat']
        ))
        data_source.connection.commit()
        cursor.close()
        
        return jsonify({"message": "Ride request added successfully!"}), 201

    except Exception as e:
        print("Error:", e)  # Print the error in the terminal for debugging
        return jsonify({"error": "An error occurred while adding the ride request."}), 500

if __name__ == '__main__':
    app.run