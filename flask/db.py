import bson

from flask_pymongo import PyMongo
from flask import current_app, g
import sys


def get_db():
    if "db" not in g:
        g.db = PyMongo(current_app)
    return g.db
