import pickle
import json
import os
import sys

from jsonrpc import ServiceProxy

from twisted.internet import task, reactor, protocol
from twisted.protocols import basic

ROOT_PATH = os.path.abspath( os.path.join(os.path.dirname(__file__), "../../"))
sys.path.insert( 0, os.path.join(ROOT_PATH, 'libs'))

from bitex.secret import Secret

class BtcProtocol(basic.LineReceiver):
    def __init__(self, factory):
        self.factory = factory

    def connectionMade(self):
        self.factory.clients.add(self)

    def connectionLost(self, reason):
        self.factory.clients.remove(self)


    def lineReceived(self, line):
        print "received", repr(line)
        try:
            msg = json.loads(str(line))
            if msg['address'] in self.accounts:
                self.sendLine(json.dumps(self.accounts[msg['address']]))
            else:
                self.sendLine(json.dumps({"address":msg['address'], "amount":  0, "confirmations": 0}))

        except ValueError:
            pass

class BtcFactory(protocol.Factory):
    def __init__(self):
        self.clients = set()

    def buildProtocol(self, addr):
        return BtcProtocol(self)

    def publish(self, line):
        print "sending", repr(line)
        for c in self.clients:
            c.sendLine(json.dumps(line))

class BtcServer:

    def __init__(self):
        self.accounts = {}
        self.secret = Secret()

    def start(self):
        if self.secret.prompt_decrypt() != self.secret.S_FAIL_FATAL:
            self.connection = ServiceProxy("http://%s:%s@127.0.0.1:8332" % (self.secret.key, self.secret.secret))
            self.load_file()
            self.factory = BtcFactory() 
            task.LoopingCall(self.check_positions).start(0.5)
            reactor.listenTCP(60025, self.factory)
            reactor.run()

    def load_file(self):
        try:
            output = open('data.pkl', 'r+')
            try:
                self.accounts = pickle.load(output)
            except EOFError:
                print 'error reading'
        except IOError:
            pass

    def save_file(self):
        output = open('data.pkl', 'wb')
        pickle.dump(self.accounts, output)

    def check_positions(self):
        for acct in self.connection.listreceivedbyaddress(0):
            address = acct['address']
            cfmt = acct['confirmations']
            amt = acct['amount']
            if address in self.accounts:
                prev_amt = self.accounts[address]['amount']
                if amt != prev_amt:
                    self.accounts[address]['amount'] = amt
                    self.factory.publish( self.accounts[address])
                    print 'account %s has a new amount %f previous %f' % (address, amt, prev_amt)
                prev_cfmt = self.accounts[address]['confirmations']
                if cfmt != prev_cfmt:
                    self.accounts[address]['confirmations'] = cfmt
                    self.save_file()
                    self.factory.publish( accounts[address])
                    print 'account %s has a new confirmation %d previous %d' % (address, cfmt, prev_cfmt)
            else:
                self.accounts[address] = {'address':address, 'amount':  amt, 'confirmations': cfmt}
                self.save_file()
                print 'account %s position %f confirmations %d' % (address, amt, cfmt)

if __name__ == "__main__":
    BtcServer().start()


