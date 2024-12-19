from datetime import datetime
import pyodbc

def get_db_connection():
    conn = pyodbc.connect('DRIVER={ODBC Driver 17 for SQL Server};'
                          'SERVER=tcp:rideshareapp.database.windows.net,1433;'
                          'DATABASE=rideshareapp;'
                          'UID=externship2024;'
                          'PWD=u#8Rk!2mLp@Qv7Xz')
    return conn

from datetime import datetime

def get_upcoming_rides():
    try:
        # Connect to the database
        conn = get_db_connection()
        cursor = conn.cursor()
        
        # Get the current time
        current_time = datetime.now()
        
        # Query to fetch rides with departure_time_actual >= current_time
        query = '''
        SELECT request_id, session_id, contact_info, departure_time, departure_location, destination, required_seats, offer_per_seat, created_at 
        FROM dbo.requested_rides 
        WHERE departure_time >= ?  -- Filter rides with departure_time >= current time
        ORDER BY departure_time ASC
        '''
        
        # Execute the query
        cursor.execute(query, (current_time,))
        rows = cursor.fetchall()
        
        # Format results as a list of dictionaries
        rides = []
        for row in rows:
            rides.append({
                "request_id": row[0],  # request_id
                "session_id": row[1],  # session_id (added to match new table structure)
                "contact_info": row[2],  # contact_info
                "departure_time": row[3].isoformat() if row[3] else None,  # departure_time (updated to match the new column)
                "departure_location": row[4],  # departure_location
                "destination": row[5],  # destination
                "required_seats": row[6],  # required_seats
                "offer_per_seat": row[7],  # offer_per_seat
                "created_at": row[8].isoformat() if row[8] else None  # created_at
            })
        
        # Close connections
        cursor.close()
        conn.close()
        
        return rides
    
    except Exception as e:
        # Raise exceptions to be handled by Flask
        raise Exception(f"Error retrieving upcoming rides: {str(e)}")

def add_requested_ride(request_id, session_id, contact_info, departure_time, departure_location, destination, required_seats, offer_per_seat):
    conn = get_db_connection()
    cursor = conn.cursor()

    # Convert departure_time string to datetime object if necessary
    if isinstance(departure_time, str):
        departure_time = datetime.strptime(departure_time, "%Y-%m-%dT%H:%M:%S")

    query = '''
        INSERT INTO dbo.requested_rides 
        (request_id, session_id, contact_info, departure_location, destination, required_seats, offer_per_seat, departure_time)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    '''
    cursor.execute(query, (request_id, session_id, contact_info, departure_location, destination, required_seats, offer_per_seat, departure_time))
    conn.commit()
    cursor.close()
    conn.close()

def add_available_ride(ride_id, session_id, contact_info, departure_time, departure_location, destination, available_seats, cost_per_seat):
    conn = get_db_connection()
    cursor = conn.cursor()

    # If departure_time is a string, convert it to a datetime object
    if isinstance(departure_time, str):
        departure_time = datetime.strptime(departure_time, "%Y-%m-%dT%H:%M:%S")  # Adjust format if necessary

    # Inserting the new available ride into the database
    query = '''
        INSERT INTO dbo.available_rides 
        (ride_id, session_id, contact_info, departure_time, departure_location, destination, available_seats, cost_per_seat)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    '''
    try:
        cursor.execute(query, (ride_id, session_id, contact_info, departure_time, departure_location, destination, available_seats, cost_per_seat))
        conn.commit()
    except Exception as e:
        # Handle exceptions if any errors occur
        print(f"Error inserting available ride: {e}")
    finally:
        cursor.close()
        conn.close()

def get_available_rides():
    try:
        # Connect to the database
        conn = get_db_connection()
        cursor = conn.cursor()
        
        # Get the current time
        current_time = datetime.now()

        # Query to fetch available rides with departure_time >= current_time
        query = '''
        SELECT ride_id, contact_info, departure_time, departure_location, destination, available_seats, cost_per_seat, created_at
        FROM dbo.available_rides
        WHERE departure_time >= ?
        ORDER BY departure_time ASC
        '''
        
        # Execute the query with current_time passed as a parameter
        cursor.execute(query, (current_time,))
        rows = cursor.fetchall()
        
        # Format results as a list of dictionaries
        available_rides = []
        for row in rows:
            available_rides.append({
                "ride_id": row[0],  # First column: ride_id
                "contact_info": row[1],  # Second column: contact_info
                "departure_time": row[2].isoformat() if row[2] else None,  # Third column: departure_time
                "departure_location": row[3],  # Fourth column: departure_location
                "destination": row[4],  # Fifth column: destination
                "available_seats": row[5],  # Sixth column: available_seats
                "cost_per_seat": row[6],  # Seventh column: cost_per_seat
                "created_at": row[7].isoformat() if row[7] else None  # Ninth column: created_at
            })
        
        # Close connections
        cursor.close()
        conn.close()
        
        return available_rides
    
    except Exception as e:
        # Handle any errors and raise an exception for Flask to manage
        print(f"Error retrieving available rides: {e}")
        raise Exception(f"Error retrieving available rides: {str(e)}")

def delete_specific_ride(ride_id=None, request_id=None, session_id=None):
    try:
        conn = get_db_connection()
        cursor = conn.cursor()

        if request_id:
            query_requested_rides = '''
            DELETE FROM dbo.requested_rides 
            WHERE request_id = ? AND session_id = ?
            '''
            cursor.execute(query_requested_rides, (request_id, session_id))

        if ride_id:
            query_available_rides = '''
            DELETE FROM dbo.available_rides
            WHERE ride_id = ? AND session_id = ?
            '''
            cursor.execute(query_available_rides, (ride_id, session_id))

        conn.commit()

    except Exception as e:
        print(f"Error deleting specific ride: {e}")
        raise Exception(f"Error deleting specific ride: {str(e)}")

    finally:
        cursor.close()
        conn.close()



