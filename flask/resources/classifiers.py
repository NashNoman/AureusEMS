import random
from flask import request
from flask.views import MethodView
from flask_smorest import Blueprint, abort
from classifiers import Classifiers
import re
import sys
from nltk.stem import WordNetLemmatizer
from nltk.corpus import stopwords
from skills import skills_full
import spacy

blp = Blueprint("classifiers", __name__, description="Operations on Classifiers")

skills = {
    "Remember": 1,
    "Understand": 2,
    "Apply": 3,
    "Analyze": 4,
    "Evaluate": 5,
    "Create": 6,
}


def extract_noun_phrases(doc):
    stop_words = set(stopwords.words("english"))
    lemmatizer = WordNetLemmatizer()
    noun_phrases = set()
    for chunk in doc.noun_chunks:
        phrases = []
        for token in chunk:
            if token.pos_ == "NOUN" and token.text not in stop_words:
                phrases.append(lemmatizer.lemmatize(token.text))
        if len(phrases) > 0:
            noun_phrases.add(" ".join(phrases))
            if len(phrases) > 1:
                for phrase in phrases:
                    noun_phrases.add(phrase)
    return noun_phrases


def check_trueFalse_validity(text):
    nlp = spacy.load("en_core_web_sm")

    # Check if the question starts with a verb or with a wh-word
    doc = nlp(text)
    if doc[0].pos_ == "VERB" or doc[0].text.lower() in [
        "what",
        "when",
        "where",
        "who",
        "why",
        "how",
        "which",
    ]:
        return False
    return True


@blp.route("/classify")
class Classify(MethodView):
    def post(self):
        data = request.json
        if not data:
            abort(400)
        text = data["question"].lower()
        if data["type"] == "trueFalse":
            if not check_trueFalse_validity(text):
                return {"error": "The question is not suitable as a true/false type"}
        if data["type"] == "direct":
            classifier = Classifiers.get_direct()
            print("DIRECT", file=sys.stderr)
        else:
            classifier = Classifiers.get_mcq()
            print("OTHER", file=sys.stderr)

        text = data["question"]
        text = re.sub(r"_{3,}", "BLANK", text)
        doc = classifier(text)
        cats = doc.cats
        cat = max(cats, key=cats.get)

        doc = Classifiers.get_spacy()(text)
        noun_phrases = extract_noun_phrases(doc)
        print("NOUN PHRASES", noun_phrases, file=sys.stderr)

        text = re.sub(r"[^a-z\s]", "", text)
        text = re.sub(r"<[^>]*>", "", text)
        clos = data["clos"]
        topics = {topic["topic"] for topic in clos}
        print("TOPICS", topics.intersection(noun_phrases), file=sys.stderr)

        cls = skills[cat]

        highest = max([c["highest"] for c in clos])

        mutual = topics.intersection(noun_phrases)

        if cls > highest:
            return {
                "btl": cls,
                "error": f"Questions should not exceed {skills_full[clos['highest'] - 1]} level for this course.",
            }

        if len(mutual) > 0:
            # Search for the topic and get its levels
            topic = mutual.pop()
            levels = [t for t in clos if t["topic"] == topic]

            if cls > levels[0]["highest"]:
                return {
                    "btl": cls,
                    "topic": topic,
                    "error": f"Questions on topic '{topic}' should be at most of type {skills_full[levels[0]['highest'] - 1]}",
                }

        return {"btl": cls}
