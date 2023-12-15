import spacy


class NER:
    """Class to load the spacy models for the CLOs classifier"""

    __ner = None

    @staticmethod
    def get_instance():
        if NER.__ner is None:
            NER.__ner = spacy.load("clo-ner-model")
        return NER.__ner
