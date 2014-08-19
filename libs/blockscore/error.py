import json

STATUS_CODES = {
	'ValidationError': 400,
	'ParameterError': 400,
	'AuthError': 401,
	'NotFoundError': 404,
	'InternalError': 500
}

# Generic Exception
class BlockscoreError(Exception):
	
	def __init__(self, message=None, json_body=None, http_status=None,
				 error_type=None, param=None, error_code=None):
		super(BlockscoreError, self).__init__(message)

		self.error_type = error_type

		self.http_status = http_status
		self.json_body = json_body

	def __str__(self):
		return "Status: {0}. Type: {1}, Message: {2}" \
			.format(self.http_status, self.error_type, self.message)


# Input could not be validated.
class ValidationError(BlockscoreError):

	def __init__(self, message=None, json_body=None, param=None, 
				 error_type=None, error_code=None):

		status_code = STATUS_CODES['ValidationError']

		super(ValidationError, self).__init__(
				message=message, error_type=error_type,
				http_status=status_code, json_body=json_body, param=param)

		self.error_code = error_code
		self.param = param

	def __str__(self):
		return "Status: {0}. Type: {1}, Param: {2}, Code: {3}, Message: {4}" \
			.format(self.http_status, self.error_type, self.param,
					self.error_code, self.message)


# Required parameter missing
class ParameterError(BlockscoreError):

	def __init__(self, message=None, json_body=None, error_type=None):
		status_code = STATUS_CODES['ParameterError']

		super(ParameterError, self).__init__(
				message=message, error_type=error_type,
				http_status=status_code, json_body=json_body)


# Invalid API Key
class AuthorizationError(BlockscoreError):

	def __init__(self, message=None, json_body=None, error_type=None):
		status_code = STATUS_CODES['AuthError']

		super(AuthorizationError, self).__init__(
				message=message, error_type=error_type,
				http_status=status_code, json_body=json_body)


# Tried to reference a nonexistent endpoint
class NotFoundError(BlockscoreError):

	def __init__(self, message=None, json_body=None, error_type=None):
		status_code = STATUS_CODES['NotFoundError']

		super(NotFoundError, self).__init__(
				message=message, error_type=error_type,
				http_status=status_code, json_body=json_body)


# Error on the Blockscore API
class InternalServerError(BlockscoreError):

	def __init__(self, message=None, json_body=None, error_type=None):
		status_code = STATUS_CODES['InternalError']

		super(InternalServerError, self).__init__(
				message=dict(), error_type=error_type,
				http_status=status_code, json_body=json_body)

	pass