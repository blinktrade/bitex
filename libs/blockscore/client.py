from .http_client import HttpClient

# Assign all the api classes
from .api.verification import Verification
from .api.question_set import QuestionSet

class Client():

	def __init__(self, auth = {}, options = {}):
		self.http_client = HttpClient(auth, options)
		self.verification = Verification(self.http_client)
		self.question_set = QuestionSet(self.http_client)