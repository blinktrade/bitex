__author__ = 'rodrigo'



class TradeRuntimeError(RuntimeError):
  error_description = "Unknow error"

class DuplicateSession(TradeRuntimeError):
  error_description = "Duplicated session"

class UserAlreadyLogged(TradeRuntimeError):
  error_description = "User is already logged in"

class InvalidOptCodeError(TradeRuntimeError):
  error_description = "Invalid message opt_code"

class InvalidSessionError(TradeRuntimeError):
  error_description = "Invalid session"

class SessionTimeoutError(TradeRuntimeError):
  error_description = "Session timeout"

class InvalidMessageError(TradeRuntimeError):
  error_description = "Invalid message"

class NotAuthorizedError(TradeRuntimeError):
  error_description = "Not authorized"

class InvalidClientIDError(TradeRuntimeError):
  error_description = "Invalid Client ID"

class InvalidParameter(TradeRuntimeError):
  error_description = "Invalid Parameter"

class InvalidApiKeyError(TradeRuntimeError):
  error_description = "ApiKey is not valid"

class ApiKeyIsNotRevocableError(TradeRuntimeError):
  error_description = "ApiKey is not revocable"
