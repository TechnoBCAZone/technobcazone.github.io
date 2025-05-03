from flask import Flask, request, render_template, redirect, session
import mysql.connector
from flask_bcrypt import Bcrypt

app = Flask(__name__)
app.secret_key = 'your_secret_key'  # Change this in production

# MySQL configuration
db = mysql.connector.connect(
    host="localhost",
    user="root",
    password="Aniket@2004",
    database="user_auth"
)

bcrypt = Bcrypt(app)

@app.route('/signup', methods=['POST'])
def signup():
    name = request.form['name']
    email = request.form['email']
    password = bcrypt.generate_password_hash(request.form['password']).decode('utf-8')

    cursor = db.cursor()
    try:
        cursor.execute("INSERT INTO users (name, email, password) VALUES (%s, %s, %s)",
                       (name, email, password))
        db.commit()
        return "Signup successful!"
    except mysql.connector.IntegrityError:
        return "Email already registered!"
    finally:
        cursor.close()

@app.route('/login', methods=['POST'])
def login():
    email = request.form['email']
    password = request.form['password']

    cursor = db.cursor()
    cursor.execute("SELECT name, email, password FROM users WHERE email = %s", (email,))
    user = cursor.fetchone()
    cursor.close()

    if user and bcrypt.check_password_hash(user[2], password):
        session['user'] = user[0]
        return "Login successful!"
    else:
        return "Invalid email or password"

@app.route('/')
def index():
    return "Welcome to the login system"

if __name__ == '__main__':
    app.run(debug=True)
