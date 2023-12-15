from flask import request
from flask.views import MethodView
from flask_smorest import Blueprint, abort
from clo_ner import NER
from skills import skills, skill_levels

blp = Blueprint("clos", __name__, description="Operations on CLOs")


@blp.route("/clos")
class Clos(MethodView):
    """Class to handle the CLOs requests"""

    def post(self):
        data = request.json
        if not data or not data.get("clos"):
            abort(400)
        ner = NER.get_instance()
        clos = data["clos"]
        res = {"clos": [], "levels": []}
        topics = {}
        for clo in clos:
            doc = ner(clo)
            ents = doc.ents
            if not ents:
                res["clos"].append({"error": "no learning outcome verbs found"})
                continue
            lo = {"text": clo}
            ftext = clo
            padding = 0
            last_skill = None
            error = False
            for ent in ents:
                if ent.label_ == "SKILL":
                    skill = skills.get(ent.text.lower(), None)
                    if skill:
                        ftext = (
                            ftext[: ent.start_char + padding]
                            + f"<{skill}>"
                            + ftext[ent.start_char + padding : ent.end_char + padding]
                            + f"<{skill}>"
                            + ftext[ent.end_char + padding :]
                        )
                        lo["text"] = ftext
                        last_skill = skill_levels[skill]
                        padding += 8
                        continue
                    else:
                        res["clos"].append({"error": f"skill {ent.text} not found"})
                        error = True
                        break
                if ent.text in topics.keys() and topics[ent.text] >= last_skill:
                    continue
                if last_skill is None:
                    res["clos"].append({"error": "no learning outcome verbs found"})
                    error = True
                    break
                topics[ent.text] = last_skill
                res["levels"].append({"topic": ent.text.lower(), "level": last_skill})
            if not error:
                res["clos"].append(lo)
        return res
