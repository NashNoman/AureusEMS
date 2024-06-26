import spacy


class Classifiers:
    """Class to load the spacy models for the CLOs classifier"""

    __mcq = None
    __direct = None
    __spacy = None

    @staticmethod
    def get_mcq():
        if Classifiers.__mcq is None:
            Classifiers.__mcq = spacy.load("mcq-textcat-model")
        return Classifiers.__mcq

    @staticmethod
    def get_direct():
        if Classifiers.__direct is None:
            Classifiers.__direct = spacy.load("direct-textcat-model")
        return Classifiers.__direct

    @staticmethod
    def get_spacy():
        if Classifiers.__spacy is None:
            Classifiers.__spacy = spacy.load("en_core_web_sm")
        return Classifiers.__spacy
