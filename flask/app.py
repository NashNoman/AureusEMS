from flask import Flask
import os
from db import db

app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite:///uni_data.db"
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db.init_app(app)

with app.app_context() as c:
  db.create_all()

@app.get("/")
def home():
    return "hello"

if __name__ == '__main__':
  app.run(host=os.environ.get("BACKEND_HOST", "172.0.0.1"), port=4000, debug=True)
  print("Running on port 4000")  
