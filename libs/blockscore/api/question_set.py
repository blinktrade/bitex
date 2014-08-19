import json
# 
#
class QuestionSet():

	def __init__(self, client):
		self.client = client

	# 
	# '/questions' POST
	#
	# verification_id - 
	def create(self, verification_id, options = {}):
		body = options['body'] if 'body' in options else {}
		body['verification_id'] = verification_id

		response = self.client.post('/questions', body, options)

		return response

	# 
	# '/questions/score' POST
	#
	# verification_id - 
	# question_set_id - 
	# answers - 
	def score(self, verification_id, question_set_id, answers, options = {}):
		body = options['body'] if 'body' in options else {}

		# set request type to json for this as server parses questions as json
		options['request_type'] = 'json'

		# make the body one json object
		body = {
			'verification_id': verification_id,
			'question_set_id': question_set_id,
			'answers': answers
		}

		response = self.client.post('/questions/score', body, options)

		return response

