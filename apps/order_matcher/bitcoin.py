import socket

from bitex.secret import Secret
from jsonrpc import ServiceProxy

from tornado.iostream import IOStream

from bitex.signals import Signal

bitcoin_updates_signal = Signal()

class Bitcoin:
  def __init__(self):
    self.secret = Secret()
    self.connection = None

  def on_stream_close(self):
    if self._stream:
        self._stream = None

  def on_stream_receive(self, data):
    if self._stream:
        msg = json.loads(str(data.rstrip()))
        bitcoin_updates_signal(msg)
        print '---------------> ', msg
        self.stream.read_until("\r\n", self.on_stream_receive)

  def connect(self):
    if self.secret.prompt_decrypt() != self.secret.S_FAIL_FATAL:
        self.connection = ServiceProxy("http://%s:%s@127.0.0.1:8332" % (self.secret.key, self.secret.secret))
        try:
            sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM, 0)
            sock.setsockopt(socket.SOL_TCP, socket.TCP_NODELAY, 1)
            sock.setblocking(0)
            sock.connect(('localhost', 60025))
            self.stream = IOStream(sock)
            self.stream.set_close_callback(self.on_stream_close)
            self.stream.read_until("\r\n", self.on_stream_receive)
        except socket.error, e:
            print 'socket error: ', e
    else:
        print 'esqueceu a senha truta ?'

  def getposition(self, address):
    if self._stream:
        self._stream.write(json.dumps({ 'address': address }))
        self._stream.write('\r\n')
  
  def getnewaddress(self):
    if self.connection != None:
        return self.connection.getnewaddress()

if __name__ == "__main__":
    btc = Bitcoin()
    btc.connect()
    print btc.getnewaddress()
    raw_input("close it ?")
