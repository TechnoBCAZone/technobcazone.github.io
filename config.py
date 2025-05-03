import os
from dotenv import load_dotenv

load_dotenv()  # Ensure this is called before accessing env vars

# Debugging print
print("DB_PORT from env:", os.getenv('DB_PORT'))

DB_CONFIG = {
    'host': os.getenv('DB_HOST'),
    'user': os.getenv('DB_USER'),
    'password': os.getenv('DB_PASSWORD'),
    'database': os.getenv('DB_NAME'),
    'port': int(os.getenv('DB_PORT')) if os.getenv('DB_PORT') else 3306
}
