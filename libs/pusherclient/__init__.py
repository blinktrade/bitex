from channel import Channel
from connection import Connection
import hashlib
import thread
import hmac
import logging

try:
  import simplejson as json
except:
  import json


VERSION = "0.2.0"


class Pusher(object):
  host = "ws.pusherapp.com"
  client_id = 'PythonPusherClient'
  protocol = 6

  def __init__(self, key, secure=True, secret=None, user_data=None, log_level=logging.INFO):
    self.key = key
    self.secret = secret
    self.user_data = user_data or {}

    self.channels = {}

    self.connection = Connection(self._connection_handler, self._build_url(key, secure), log_level=log_level)

  def connect(self):
    """Connect to Pusher"""
    thread.start_new_thread(self.connection.run, ())

  def disconnect(self):
    """Disconnect from Pusher"""
    self.connection.disconnect()
    self.channels = {}

  def subscribe(self, channel_name):
    """Subscribe to a channel

    :param channel_name: The name of the channel to subscribe to.
    :type channel_name: str

    :rtype : Channel
    """
    data = {'channel': channel_name}

    if channel_name.startswith('presence-'):
      data['auth'] = self._generate_presence_key(
        self.connection.socket_id,
        self.key,
        channel_name,
        self.secret,
        self.user_data
      )
      data['channel_data'] = json.dumps(self.user_data)
    elif channel_name.startswith('private-'):
      data['auth'] = self._generate_private_key(
        self.connection.socket_id,
        self.key,
        channel_name,
        self.secret
      )

    self.connection.send_event('pusher:subscribe', data)

    self.channels[channel_name] = Channel(channel_name, self.connection)

    return self.channels[channel_name]

  def unsubscribe(self, channel_name):
    """Unsubscribe from a channel

    :param channel_name: The name of the channel to unsubscribe from.
    :type channel_name: str
    """
    if channel_name in self.channels:
      self.connection.send_event(
        'pusher:unsubscribe', {
          'channel': channel_name,
          }
      )
      del self.channels[channel_name]

  def channel(self, channel_name):
    """Get an existing channel object by name

    :param channel_name: The name of the channel you want to retrieve
    :type channel_name: str

    :rtype: Channel or None
    """
    return self.channels.get(channel_name)

  def _connection_handler(self, event_name, data, channel_name):
    if channel_name in self.channels:
      self.channels[channel_name]._handle_event(event_name, data)

  @staticmethod
  def _generate_private_key(socket_id, key, channel_name, secret):
    auth_key = ""

    if socket_id and key and channel_name and secret:
      subject = "%s:%s" % (socket_id, channel_name)
      h = hmac.new(secret, subject, hashlib.sha256)
      auth_key = "%s:%s" % (key, h.hexdigest())

    return auth_key

  @staticmethod
  def _generate_presence_key(socket_id, key, channel_name, secret, user_data):
    auth_key = ""

    if socket_id and key and channel_name and secret and user_data:
      subject = "%s:%s:%s" % (socket_id, channel_name, json.dumps(user_data))
      h = hmac.new(secret, subject, hashlib.sha256)
      auth_key = "%s:%s" % (key, h.hexdigest())

    return auth_key

  @classmethod
  def _build_url(cls, key, secure):
    path = "/app/%s?client=%s&version=%s&protocol=%s" % (
      key,
      cls.client_id,
      VERSION,
      cls.protocol
      )

    return "%s://%s:%s%s" % (
      "wss" if secure else "ws",
      cls.host,
      443 if secure else 80,
      path
      )