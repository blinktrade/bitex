# ResponseHandler takes care of decoding the response body into suitable type
class ResponseHandler():

	@staticmethod
	def get_body(response):
		typ = response.headers.get('content-type')
		body = response.text

		# Response body is in JSON
		if typ.find('json') != -1:
			body = response.json()

		return body
