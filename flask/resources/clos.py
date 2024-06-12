from flask import request
from flask.views import MethodView
from flask_smorest import Blueprint, abort
from clo_ner import NER
from skills import skills, skill_levels
from collections import defaultdict
import nltk
from nltk.stem import WordNetLemmatizer


nltk.download("wordnet")

wnl = WordNetLemmatizer()

blp = Blueprint("clos", __name__, description="Operations on CLOs")


@blp.route("/clos")
class Clos(MethodView):
    """Class to handle the CLOs requests"""

    def validate_request_data(self, data):
        if not data or not data.get("clos"):
            abort(400, message="Missing clos field in request body")

    def post(self):
        data = request.json
        self.validate_request_data(data)
        ner = NER.get_instance()
        clos = data["clos"]
        res = {"los": [], "topics": [], "highest": 0}
        topics = defaultdict(set)
        for clo in clos:
            doc = ner(clo)
            ents = doc.ents
            if not ents:
                res["los"].append(
                    {"text": clo, "error": "no learning outcome verbs found"}
                )
                continue
            ftext = clo
            padding = 0
            last_skill = None
            invalid = False
            for ent in ents:
                if ent.label_ == "SKILL":
                    lemmed = wnl.lemmatize(ent.text.lower(), "v")
                    skill = skills.get(lemmed)
                    if not skill:
                        skill = "er"
                        invalid = f"skill '{ent.text}' is not recognized as an indicator of a Bloom's taxonomy level"
                    ftext = (
                        ftext[: ent.start_char + padding]
                        + f"<{skill}>"
                        + ftext[ent.start_char + padding : ent.end_char + padding]
                        + f"</{skill}>"
                        + ftext[ent.end_char + padding :]
                    )
                    if skill == "er":
                        res["los"].append(
                            {
                                "text": ftext,
                                "error": f"skill '{ent.text}' is not recognized as an indicator of a Bloom's taxonomy level",
                            }
                        )
                        invalid = True
                        break
                    padding += 9
                    if skill in skill_levels.keys():
                        last_skill = skill_levels[skill]
                    continue
                if last_skill is None:
                    res["los"].append(
                        {"text": ftext, "error": "no learning outcome verbs found"}
                    )
                    invalid = True
                    break
                topic = ent.text.lower()
                if topic.count(" ") > 0:
                    topic = topic.split(" ")
                    topic = [wnl.lemmatize(t, "n") for t in topic]
                    topic = " ".join(topic)
                else:
                    topic = wnl.lemmatize(topic, "n")
                topics[topic].add(last_skill)
            if not invalid:
                res["los"].append({"text": ftext})
        for topic, levels in topics.items():
            res["topics"].append(
                {"topic": topic, "levels": list(levels), "highest": max(levels)}
            )
        res["highest"] = max([level["highest"] for level in res["topics"]])
        return res
