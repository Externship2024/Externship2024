from datetime import datetime
import pymssql  # Using pymssql instead of pyodbc

def get_db_connection():
    conn = pymssql.connect(
        server='rideshareapp.database.windows.net',
        user='externship2024',
        password='u#8Rk!2mLp@Qv7Xz',
        database='rideshareapp'
    )
    return conn

# Update all other functions to use the new connection method
def get_upcoming_rides():
    try:
        conn = get_db_connection()
        cursor = conn.cursor(as_dict=True)  # Return results as dictionaries
        
        current_time = datetime.now()
        
        query = '''
        SELECT request_id, session_id, contact_info, departure_time, departure_location, 
               destination, required_seats, offer_per_seat, created_at 
        FROM dbo.requested_rides 
        WHERE departure_time >= %s  
        ORDER BY departure_time ASC
        '''
        
        cursor.execute(query, (current_time,))
        rides = cursor.fetchall()
        
        # Format datetime objects
        for ride in rides:
            if ride['departure_time']:
                ride['departure_time'] = ride['departure_time'].isoformat()
            if ride['created_at']:
                ride['created_at'] = ride['created_at'].isoformat()
        
        cursor.close()
        conn.close()
        
        return rides
    
    except Exception as e:
        raise Exception(f"Error retrieving upcoming rides: {str(e)}")

def add_requested_ride(request_id, session_id, contact_info, departure_time, departure_location, destination, required_seats, offer_per_seat):
    conn = get_db_connection()
    cursor = conn.cursor()

    if isinstance(departure_time, str):
        departure_time = datetime.strptime(departure_time, "%Y-%m-%dT%H:%M:%S")

    query = '''
        INSERT INTO dbo.requested_rides 
        (request_id, session_id, contact_info, departure_location, destination, required_seats, offer_per_seat, departure_time)
        VALUES (%s, %s, %s, %s, %s, %s, %s, %s)
    '''
    cursor.execute(query, (request_id, session_id, contact_info, departure_location, destination, required_seats, offer_per_seat, departure_time))
    conn.commit()
    cursor.close()
    conn.close()

def get_available_rides():
    try:
        conn = get_db_connection()
        cursor = conn.cursor(as_dict=True)
        
        current_time = datetime.now()

        query = '''
        SELECT ride_id, contact_info, departure_time, departure_location, destination, 
               available_seats, cost_per_seat, created_at
        FROM dbo.available_rides
        WHERE departure_time >= %s
        ORDER BY departure_time ASC
        '''
        
        cursor.execute(query, (current_time,))
        available_rides = cursor.fetchall()
        
        # Format datetime objects
        for ride in available_rides:
            if ride['departure_time']:
                ride['departure_time'] = ride['departure_time'].isoformat()
            if ride['created_at']:
                ride['created_at'] = ride['created_at'].isoformat()
        
        cursor.close()
        conn.close()
        
        return available_rides
    
    except Exception as e:
        raise Exception(f"Error retrieving available rides: {str(e)}")

def delete_specific_ride(ride_id=None, request_id=None, session_id=None):
    try:
        conn = get_db_connection()
        cursor = conn.cursor()

        if request_id:
            query_requested_rides = '''
            DELETE FROM dbo.requested_rides 
            WHERE request_id = %s AND session_id = %s
            '''
            cursor.execute(query_requested_rides, (request_id, session_id))

        if ride_id:
            query_available_rides = '''
            DELETE FROM dbo.available_rides
            WHERE ride_id = %s AND session_id = %s
            '''
            cursor.execute(query_available_rides, (ride_id, session_id))

        conn.commit()

    except Exception as e:
        raise Exception(f"Error deleting specific ride: {str(e)}")

    finally:
        cursor.close()
        conn.close()