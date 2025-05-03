from flask import Flask, render_template, request, redirect, session
import mysql.connector
from config import db_config

app = Flask(__name__)
app.secret_key = 'your_secret_key'

conn = mysql.connector.connect(**db_config)
cursor = conn.cursor(dictionary=True)

@app.route('/')
def home():
    return 'Welcome to TechnoBCAZone backend'

@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        email = request.form['email']
        password = request.form['password']
        cursor.execute("SELECT * FROM users WHERE email=%s AND password=%s", (email, password))
        user = cursor.fetchone()
        if user:
            session['user'] = user['email']
            return 'Login successful'
        return 'Invalid credentials'
    return render_template('login.html')

@app.route('/register', methods=['GET', 'POST'])
def register():
    if request.method == 'POST':
        email = request.form['email']
        password = request.form['password']
        cursor.execute("INSERT INTO users (email, password) VALUES (%s, %s)", (email, password))
        conn.commit()
        return redirect('/login')
    return render_template('register.html')

if __name__ == '__main__':
    app.run()
