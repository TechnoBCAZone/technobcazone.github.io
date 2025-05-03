from flask import Flask, request, render_template
import mysql.connector
from config import DB_CONFIG

app = Flask(__name__)

# Establish DB connection
conn = mysql.connector.connect(
    host=DB_CONFIG['host'],
    user=DB_CONFIG['user'],
    password=DB_CONFIG['password'],
    database=DB_CONFIG['database'],
    port=DB_CONFIG['port']
)

@app.route('/')
def home():
    return "Connected to database successfully!"

if __name__ == '__main__':
    app.run(debug=True)
