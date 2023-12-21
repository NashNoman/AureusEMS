import configparser
import os
from flask import Flask
from flask_smorest import Api
from resources.clos import blp as clos_blp
from resources.classifiers import blp as classifiers_blp


app = Flask(__name__)

config = configparser.ConfigParser()
config.read(os.path.abspath(os.path.join("config.ini")))

app.config["API_TITLE"] = "Aureus API"
app.config["API_VERSION"] = "v1"
app.config["OPENAPI_VERSION"] = "3.0.2"
app.config["OPENAPI_URL_PREFIX"] = "/docs"
app.config["OPENAPI_SWAGGER_UI_PATH"] = "/swagger"
app.config["OPENAPI_SWAGGER_UI_URL"] = "https://cdn.jsdelivr.net/npm/swagger-ui-dist/"
app.config["MONGO_URI"] = config["PROD"]["DB_URI"]

api = Api(app)

api.register_blueprint(clos_blp)
api.register_blueprint(classifiers_blp)

if __name__ == "__main__":
    app.run(port=4000, debug=True)
