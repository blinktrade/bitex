# Returns user api instance
#
class Verification():

	def __init__(self, client):
		self.client = client

	# 
	# '/verifications' POST
	#
	# date_of_birth - 
	# identification - 
	# name - 
	# address - 
	def create(self, date_of_birth, identification, name, address, options = {}):
		body = options['body'] if 'body' in options else {}
		body['date_of_birth'] = date_of_birth
		body['identification'] = identification
		body['name'] = name
		body['address'] = address

		response = self.client.post('/verifications', body, options)

		return response

	# 
	# '/verifications/:id' GET
	#
	# id - 
	def retrieve(self, id, options = {}):
		body = options['query'] if 'query' in options else {}
		
		response = self.client.get('/verifications/'+str(id), body, options)

		return response

	# 
	# '/verifications' GET
	#
	def all(self, count=None, offset=None, options = {}):
		body = options['query'] if 'query' in options else {}

		if count != None:
			body['count'] = count
		if offset != None:
			body['offset'] = offset

		response = self.client.get('/verifications', body, options)

		return response
