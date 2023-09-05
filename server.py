from flask import Flask, request, render_template, redirect, url_for
from flask import Flask, jsonify
from pymongo import MongoClient
# import smtplib
# from email.mime.text import MIMEText
# from email.mime.multipart import MIMEMultipart
from flask import Flask
from flask_cors import CORS
from datetime import datetime
from pymongo.server_api import ServerApi


app = Flask(__name__)

# Temporary user storage (replace with a database)
users = {'username': 'password'}  # Replace with actual username and hashed password

@app.route('/')
def hello_world():
    return 'Hello, World! This is a simple web server.'

#@app.route('/login', methods=['GET', 'POST'])
#def login():
#    if request.method == 'POST':
#        username = request.form['username']
#        password = request.form['password']
#        if username in users and users[username] == password:
#            return 'Login successful'
#        else:
#            return 'Login failed. Invalid credentials.'
#    return render_template('login.html')

# def send_email(sender_email, receiver_email, password, subject, message):
#     # Set up your email and server details
#     smtp_server = 'smtp.gmail.com'  # SMTP server for Gmail
#     smtp_port = 587  # Port for TLS encryption (587 for Gmail)

#     # Create the email message
#     msg = MIMEMultipart()
#     msg['From'] = sender_email
#     msg['To'] = receiver_email
#     msg['Subject'] = subject

#     msg.attach(MIMEText(message, 'plain'))

#     # Set up the SMTP connection and send the email
#     try:
#         server = smtplib.SMTP(smtp_server, smtp_port)
#         server.starttls()  # Enable TLS encryption
#         server.login(sender_email, password)  # Log in to your email account

#         text = msg.as_string()
#         print("sending mail")
#         server.sendmail(sender_email, receiver_email, text)  # Send the email

#         print('Email sent successfully')
#     except Exception as e:
#         print(f'Error: {str(e)}')
#     finally:
#         server.quit()  # Quit the SMTP server


@app.route('/api/movies')
def get_movies():
    movies_collection = db["movies"]
    movies = list(movies_collection.find({}, { "_id": 0 }))
    return jsonify(movies)

@app.route("/api/bookings", methods=["POST"])
def add_booking():
    bookings_collection = db["bookings"]
    data = request.json
    print(data)
    #print(data["email_id"])
    required_fields = ["booking_movie", "theatre_location", "theatre_name", "show_time", "seats"]
    for field in required_fields:
        if field not in data:
            return jsonify({"message": f"Missing required field: {field}"}), 400

    # Add additional fields
    current_datetime = datetime.now()
    data["booking_date"] = current_datetime.strftime("%H:%M:%S on %Y-%m-%d")


    # Insert the booking into MongoDB
    booking_id = bookings_collection.insert_one(data).inserted_id

    return jsonify({"message": f"Booking {booking_id} created successfully"}), 201

@app.route("/api/MyBookings", methods=["GET"])
def get_booking_history():
    bookings_collection = db["bookings"]
    all_bookings = list(bookings_collection.find({}, { "_id": 0 }))
    return jsonify(all_bookings)

@app.route("/api/register", methods=["POST"])
def register():
    user_collection = db["UserInfo"]
    data = request.json
    user_id = user_collection.insert_one(data).inserted_id
    return jsonify({"message": f"Booking {user_id} created successfully"}), 201

@app.route("/api/login", methods=["POST"])
def login():
    data=request.json
    username = data['email']
    password = data['password']
    print(username,password)
    users_collection = db["UserInfo"]
    user = users_collection.find_one({"email_id": username, "password": password})
    if user is None:
        return jsonify({"message": "User not found or incorrect password"}), 401
    return jsonify({"message": "Login successful"}), 200



if __name__ == '__main__':
    #mongo_uri = "mongodb://localhost:27017/Moviedb"
    mongo_uri = "mongodb+srv://phavyajai:o3bgbFM31JFsiw7z@cluster0.xyghoel.mongodb.net/?retryWrites=true&w=majority"
    # client = MongoClient(mongo_uri)
    client = MongoClient(mongo_uri, server_api=ServerApi('1'))
    db = client["Moviedb"]
    smtp_server = 'smtp.gmail.com'  # SMTP server for Gmail
    smtp_port = 587  # Port for TLS encryption (587 for Gmail)
    message="Thanks for the order"
    subject="Order details"
    # send_email(sender_email, receiver_email, password, subject, message)
    CORS(app, resources={r"/api/*": {"origins": "https://movie-ticket-reservation-system-mlhh0llup-phavyajai.vercel.app/"}})
    app.run(debug=True)
