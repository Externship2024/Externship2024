"""from flask_cors import CORS"""
from flask import Flask, request, jsonify
from Datasource import *


app = Flask(__name__)
"""CORS(app)"""

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


@app.route('/get_upcoming_rides', methods=['GET'])
def upcoming_requested_rides():
    try:
        rides = get_upcoming_rides()  # Call the function to get rides
        return jsonify(rides), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/available-rides', methods=['GET'])
def upcoming_available_rides():
    try:
        rides = get_available_rides()
        return jsonify(rides), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 400

@app.route('/add_ride', methods=['POST'])
def add_ride_handler():
    data = request.get_json()  # Assuming data is sent as JSON
    
    # Extract data from the JSON request
    request_id = data.get('request_id')
    session_id = data.get('session_id')
    contact_info = data.get('contact_info')
    departure_time = data.get('departure_time')  # Ensure this is in proper datetime format
    departure_location = data.get('departure_location')
    destination = data.get('destination')
    required_seats = data.get('required_seats')
    offer_per_seat = data.get('offer_per_seat')
    
    try:
        # Call the database utility function
        add_requested_ride(request_id, session_id, contact_info, departure_time, departure_location, destination, required_seats, offer_per_seat)
        return jsonify({"message": "Requested ride added successfully"}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 400

@app.route('/add_available_ride', methods=['POST'])
def add_available_ride_route():
    data = request.get_json()  # Assuming data is sent as JSON

    ride_id = data.get('ride_id')
    session_id = data.get('session_id')  # Added session_id
    contact_info = data.get('contact_info')
    departure_time = data.get('departure_time')  # Ensure this is in proper datetime format
    departure_location = data.get('departure_location')
    destination = data.get('destination')
    available_seats = data.get('available_seats')
    cost_per_seat = data.get('cost_per_seat')

    try:
        # Pass session_id to the add_available_ride method
        add_available_ride(ride_id, session_id, contact_info, departure_time, departure_location, destination, available_seats, cost_per_seat)
        return jsonify({"message": "Available ride added successfully"}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 400
    
@app.route('/delete_ride', methods=['POST'])
def delete_ride():
    data = request.get_json()
    
    ride_id = data.get('ride_id')
    request_id = data.get('request_id') 
    session_id = data.get('session_id')  

    try:
        # Ensure at least one ID (ride_id or request_id) is provided
        if not (ride_id or request_id):
            return jsonify({"error": "Either ride_id or request_id must be provided"}), 400
        
        # Call the helper function to delete the ride based on session_id and provided ID
        delete_specific_ride(ride_id=ride_id, request_id=request_id, session_id=session_id)
        return jsonify({"message": "Ride deleted successfully"}), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 400

if __name__ == '__main__':
    app.run(debug=True)