#(Placeholder to test for vercel installation)
from flask import Flask, request, jsonify

app = Flask(__name__)

offered_rides = []
requested_rides = []

@app.route('/')
def index():
    return "hello world"

@app.route('/rides/offered', methods=['GET'])
def get_offered_rides():
    return jsonify(offered_rides)

@app.route('/rides/requested', methods=['GET'])
def get_requested_rides():
    return jsonify(requested_rides)

@app.route('/rides/offered', methods=['POST'])
def add_offered_ride():
    data = request.get_json()
    required_fields = ['departure_time', 'departure_location', 'destination', 'available_seats', 'cost_per_seat']
    if not all(field in data for field in required_fields):
        return jsonify({"error": "Missing required fields"}), 400

    offered_ride = {
        "id": len(offered_rides) + 1,
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
    required_fields = ['departure_time', 'departure_location', 'destination']
    if not all(field in data for field in required_fields):
        return jsonify({"error": "Missing required fields"}), 400

    requested_ride = {
        "id": len(requested_rides) + 1,
        "departure_time": data['departure_time'],
        "departure_location": data['departure_location'],
        "destination": data['destination']
    }
    requested_rides.append(requested_ride)
    return jsonify(requested_ride), 201

if __name__ == '__main__':
    app.run(debug=True)