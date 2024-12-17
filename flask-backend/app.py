#(Placeholder to test for vercel installation)
from flask import Flask, request, jsonify
from flask_cors import CORS


app = Flask(__name__)
CORS(app)

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

@app.route('/rides/requested', methods=['POST'])
def add_requested_ride():
    data = request.get_json()
    required_fields = ['contact_info', 'departure_time', 'departure_location', 'destination']
    if not all(field in data for field in required_fields):
        return jsonify({"error": "Missing required fields"}), 400

    requested_ride = {
        "contact_info": data['contact_info'],
        "departure_time": data['departure_time'],
        "departure_location": data['departure_location'],
        "destination": data['destination']
    }
    requested_rides.append(requested_ride)
    return jsonify(requested_ride), 201

if __name__ == '__main__':
    app.run