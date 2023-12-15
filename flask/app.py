import configparser
import os
from flask import Flask
from flask_smorest import Api
from resources.clos import blp as clos_blp


app = Flask(__name__)

config = configparser.ConfigParser()
config.read(os.path.abspath(os.path.join("config.ini")))

app.config["MONGO_URI"] = config["PROD"]["DB_URI"]

api = Api(app)

api.register_blueprint(clos_blp)

if __name__ == "__main__":
    app.run(host="192.168.1.1", port=4000, debug=True)
