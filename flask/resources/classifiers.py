from flask import request
from flask.views import MethodView
from flask_smorest import Blueprint, abort
from classifiers import Classifiers

blp = Blueprint("classifiers", __name__, description="Operations on Classifiers")


@blp.route("/mcq")
class MCQ(MethodView):
    def post(self):
        data = request.json
        if not data:
            abort(400)
        mcq = Classifiers.get_mcq()
        doc = mcq(data["text"])
        cats = doc.cats
        cat = max(cats, key=cats.get)
        return {"category": cat, "confidence": cats[cat]}


@blp.route("/direct")
class Direct(MethodView):
    def post(self):
        data = request.json
        if not data:
            abort(400)
        direct = Classifiers.get_direct()
        doc = direct(data["text"])
        cats = doc.cats
        cats = [k for k, v in cats.items() if v >= 0.5]
        return cats
