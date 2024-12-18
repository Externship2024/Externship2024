from flask import Flask, request, jsonify, session, abort, redirect
import os
import pathlib
import requests
from flask_cors import CORS # for communication with frontend
from google_auth_oauthlib.flow import Flow

app = Flask(__name__)
CORS(app)

app.secret_key = "fbUQ4ZavHP2r" # for google oauth
GOOGLE_CLIENT_ID = "929667896534-icmbfv2sq8mu64akqe57ka1t65novl2b.apps.googleusercontent.com"
client_secrets_file = os.path.join(pathlib.Path(__file__).parent, "client_secret.json")

flow = Flow.from_client_secrets_file(
    client_secrets_file=client_secrets_file,
    scopes=["https://www.googleapis.com/auth/userinfo.profile", "https://www.googleapis.com/auth/userinfo.email", "openid"],
    redirect_uri="https://externship2024backend.vercel.app/callback"
    )

offered_rides = [] 
requested_rides = []

@app.route("/")
def index():
    return "<a href='/login'><button>Login</button></a>"

@app.route('/datatest', methods=['GET'])
def datatest():
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

#Google Auth methods below 

def login_required(function):
    def wrapper(*args, **kwargs):
        if "google_id" not in session:
            return abort(401)
        else:
            return function()
    return wrapper


@app.route("/login")
def login():
    authorization_url, state = flow.authorization_url()
    session["state"] = state
    return redirect(authorization_url)

@app.route("/callback")
def callback():
    flow.fetch_token(authorization_response=request.url)
    if not session["state"] == request.args["state"]:
        abort(500) #State doesn't match
    credentials = flow.credentials
    request_session = request.session()
    cached_session = cachecontrol.CacheControl(request_session)
    token_request = google.auth.transport.requests.Request(session=cached_session)

    id_info = id_token.verify_oauth2_token(
        id_token = credentials._id_token,
        request = token_request,
        audience = GOOGLE_CLIENT_ID
    )

    session["google_id"] = id_info.get("sub")
    session["name"] = id_info.get("name")

    return redirect("/protected_area")

@app.route("/logout")
def logout():
    session.clear()
    return redirect("/")

@app.route("/protected_area")
@login_required
def protected_area():
    return "Protected <a href='/logout'><button>Logout</button></a>"

if __name__ == '__main__':
    app.run(debug=True)