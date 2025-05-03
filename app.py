from flask import Flask, render_template, request, redirect, session
import mysql.connector
import os
from config import db_config
from werkzeug.security import generate_password_hash, check_password_hash
from dotenv import load_dotenv

app = Flask(__name__)
app.secret_key = os.getenv("SECRET_KEY", "default_secret_key")  # Load secret key

# Function to get a database connection
def get_db_connection():
    return mysql.connector.connect(**db_config)

@app.route('/')
def home():
    return 'Welcome to TechnoBCAZone backend'

@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        email = request.form['email']
        password = request.form['password']

        conn = get_db_connection()
        cursor = conn.cursor(dictionary=True)
        cursor.execute("SELECT * FROM users WHERE email=%s", (email,))
        user = cursor.fetchone()
        conn.close()

        if user and check_password_hash(user['password'], password):
            session['user'] = user['email']
            return 'Login successful'
        return 'Invalid credentials'
    
    return render_template('login.html')

@app.route('/register', methods=['GET', 'POST'])
def register():
    if request.method == 'POST':
        email = request.form['email']
        password = request.form['password']

        hashed_password = generate_password_hash(password)

        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute("INSERT INTO users (email, password) VALUES (%s, %s)", (email, hashed_password))
        conn.commit()
        conn.close()

        return redirect('/login')
    
    return render_template('register.html')

if __name__ == '__main__':
    app.run(debug=True)
