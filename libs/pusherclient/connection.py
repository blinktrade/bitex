from threading import Thread, Timer
import websocket
import logging
import time

try:
  import simplejson as json
except:
  import json


class Connection(Thread):
  def __init__(self, event_handler, url, log_level=logging.INFO):
    self.event_handler = event_handler
    self.url = url

    self.socket = None
    self.socket_id = ""

    self.event_callbacks = {}

    self.needs_reconnect = False
    self.reconnect_interval = 10

    self.pong_timer = None
    self.pong_received = False
    self.pong_timeout = 30

    self.bind("pusher:connection_established", self._connect_handler)
    self.bind("pusher:connection_failed", self._failed_handler)
    self.bind("pusher:pong", self._pong_handler)
    self.bind("pusher:ping", self._ping_handler)
    self.bind("pusher:error", self._pusher_error_handler)

    self.state = "initialized"

    self.logger = logging.getLogger(self.__module__)  # create a new logger
    self.logger.addHandler(logging.StreamHandler())
    if log_level == logging.DEBUG:
      websocket.enableTrace(True)
    self.logger.setLevel(log_level)

    # From Martyn's comment at:
    # https://pusher.tenderapp.com/discussions/problems/36-no-messages-received-after-1-idle-minute-heartbeat
    #   "We send a ping every 5 minutes in an attempt to keep connections
    #   alive..."
    # This is why we set the connection timeout to 5 minutes, since we can
    # expect a pusher heartbeat message every 5 minutes.  Adding 5 sec to
    # account for small timing delays which may cause messages to not be
    # received in exact 5 minute intervals.

    self.connection_timeout = 305
    self.connection_timer = None

    self.ping_interval = 120
    self.ping_timer = None

    Thread.__init__(self)

  def bind(self, event_name, callback):
    """Bind an event to a callback

    :param event_name: The name of the event to bind to.
    :type event_name: str

    :param callback: The callback to notify of this event.
    """

    if event_name not in self.event_callbacks.keys():
      self.event_callbacks[event_name] = []

    self.event_callbacks[event_name].append(callback)

  def disconnect(self):
    self.needs_reconnect = False
    if self.socket:
      self.socket.close()

  def reconnect(self, reconnect_interval=10):
    self.logger.info("Connection: Reconnect in %s" % reconnect_interval)
    self.reconnect_interval = reconnect_interval

    self.needs_reconnect = True
    if self.socket:
      self.socket.close()

  def run(self):
    self._connect()

  def _connect(self):
    self.state = "connecting"

    self.socket = websocket.WebSocketApp(
      self.url,
      on_open=self._on_open,
      on_message=self._on_message,
      on_error=self._on_error,
      on_close=self._on_close
    )

    self.socket.run_forever()

    while self.needs_reconnect:
      self.logger.info("Attempting to connect again in %s seconds." % self.reconnect_interval)
      self.state = "unavailable"
      time.sleep(self.reconnect_interval)

      # We need to set this flag since closing the socket will set it to
      # false
      self.socket.keep_running = True
      self.socket.run_forever()

  def _on_open(self, ws):
    self.logger.info("Connection: Connection opened")
    self._start_timers()

  def _on_error(self, ws, error):
    self.logger.info("Connection: Error - %s" % error)
    self.state = "failed"
    self.needs_reconnect = True

  def _on_message(self, ws, message):
    self.logger.info("Connection: Message - %s" % message)

    # Stop our timeout timer, since we got some data
    self._stop_timers()

    params = self._parse(message)

    if 'event' in params.keys():
      if 'channel' not in params.keys():
        # We've got a connection event.  Lets handle it.
        if params['event'] in self.event_callbacks.keys():
          for callback in self.event_callbacks[params['event']]:
            callback(params['data'])
        else:
          self.logger.info("Connection: Unhandled event")
      else:
        # We've got a channel event.  Lets pass it up to the pusher
        # so it can be handled by the appropriate channel.
        self.event_handler(
          params['event'],
          params['data'],
          params['channel']
        )

    # We've handled our data, so restart our connection timeout handler
    self._start_timers()

  def _on_close(self, ws, *args):
    self.logger.info("Connection: Connection closed")
    self.state = "disconnected"
    self._stop_timers()

  @staticmethod
  def _parse(message):
    return json.loads(message)

  def _stop_timers(self):
    if self.ping_timer:
      self.ping_timer.cancel()

    if self.connection_timer:
      self.connection_timer.cancel()

  def _start_timers(self):
    self._stop_timers()

    self.ping_timer = Timer(self.ping_interval, self.send_ping)
    self.ping_timer.start()

    self.connection_timer = Timer(self.connection_timeout, self._connection_timed_out)
    self.connection_timer.start()

  def send_event(self, event_name, data, channel_name=None):
    event = {'event': event_name, 'data': data}
    if channel_name:
      event['channel'] = channel_name

    self.logger.info("Connection: Sending event - %s" % event)
    self.socket.send(json.dumps(event))

  def send_ping(self):
    self.logger.info("Connection: ping to pusher")
    self.socket.send(json.dumps({'event': 'pusher:ping', 'data': ''}))
    self.pong_timer = Timer(self.pong_timeout, self._check_pong)
    self.pong_timer.start()

  def send_pong(self):
    self.logger.info("Connection: pong to pusher")
    self.socket.send(json.dumps({'event': 'pusher:pong', 'data': ''}))

  def _check_pong(self):
    self.pong_timer.cancel()

    if self.pong_received:
      self.pong_received = False
    else:
      self.logger.info("Did not receive pong in time.  Will attempt to reconnect.")
      self.state = "failed"
      self.reconnect()

  def _connect_handler(self, data):
    parsed = json.loads(data)

    self.socket_id = parsed['socket_id']

    self.state = "connected"

  def _failed_handler(self, data):
    parsed = json.loads(data)

    self.state = "failed"

  def _ping_handler(self, data):
    self.send_pong()
    # Restart our timers since we received something on the connection
    self._start_timers()

  def _pong_handler(self, data):
    # self. logger.info("Connection: pong from pusher")
    self.pong_received = True

  def _pusher_error_handler(self, data):
    if 'code' in data:
      error_code = None

      try:
        error_code = int(data['code'])
      except:
        pass

      if error_code is not None:
        self.logger.error("Connection: Received error %s" % error_code)

        if (error_code >= 4000) and (error_code <= 4099):
          # The connection SHOULD NOT be re-established unchanged
          self.logger.info("Connection: Error is unrecoverable.  Disconnecting")
          self.disconnect()
        elif (error_code >= 4100) and (error_code <= 4199):
          # The connection SHOULD be re-established after backing off
          self.reconnect()
        elif (error_code >= 4200) and (error_code <= 4299):
          # The connection SHOULD be re-established immediately
          self.reconnect(0)
        else:
          pass
      else:
        self.logger.error("Connection: Unknown error code")
    else:
      self.logger.error("Connection: No error code supplied")

  def _connection_timed_out(self):
    self.logger.info("Did not receive any data in time.  Reconnecting.")
    self.state = "failed"
    self.reconnect()