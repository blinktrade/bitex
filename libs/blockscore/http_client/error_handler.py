from ..error import BlockscoreError, AuthorizationError, \
            InternalServerError, ValidationError, ParameterError, NotFoundError
from .response_handler import ResponseHandler
 
# ErrorHanlder takes care of selecting the error message from response body
class ErrorHandler():
    def check_error(self, response, *args, **kwargs):
        code = response.status_code
        typ = response.headers.get('content-type')
 
        # No error found
        if (200 <= code < 300):
            return
        self.body = ResponseHandler.get_body(response)
        self.message = self.get_message(self.body)
        self.error_type = self.error_code = self.param = None
       
        # determines if an error is in the response's body
        if 'error' in self.body.keys():
            error = self.body['error']
            self.error_type = self.get_value(error, 'type')
            self.error_code = self.get_value(error, 'code')
            self.param = self.get_value(error, 'param') 
 
        # raises the appropriate error if necessary
        self.process_code(code)
 
    def process_code(self, code):
 
        if code == 400:
            # Inputs could not be validated
            if self.param is not None:
                raise ValidationError(self.message, self.body, self.param, \
                                    self.error_type, self.error_code)
            # Required parameter missing
            else:
                raise ParameterError(self.message, self.body, self.error_type)
        # Trying to access nonexistent endpoint
        elif code == 404:
            raise NotFoundError(self.message, self.body, self.error_type)
        # Error with an API Key
        elif code == 401:
            raise AuthorizationError(self.message, self.body, self.error_type)        
        # Internal API Error
        elif code == 500:
            raise InternalServerError(self.message, self.body, self.error_type)        
        # Generic BlockscoreError (fallback)
        else:
            raise BlockscoreError(self.message, self.body)
 
    @staticmethod
    def get_message(body):
        message = ''
        # If HTML, whole body is taken
        if isinstance(body, str):
            message = body
        elif isinstance(body, dict): # body not str
            if 'error' in body.keys():
                message = body['error']['message']
            else:
                message = 'Unable to select error message from json returned by request responsible for error'
            
        else: # body not str or dict
            message = 'Unable to understand the content type of response returned by request responsible for error'
        return message
 
    @staticmethod
    def get_value(obj, key):
        if key in obj.keys():
            return obj[key]
        return None