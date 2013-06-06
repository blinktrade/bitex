import pickle
import json

from jsonrpc import ServiceProxy

from twisted.internet import task, reactor, protocol
from twisted.protocols import basic

accounts = {}
factory = None

class BtcProtocol(basic.LineReceiver):
    def __init__(self, factory):
        self.factory = factory

    def connectionMade(self):
        self.factory.clients.add(self)

    def connectionLost(self, reason):
        self.factory.clients.remove(self)


    def lineReceived(self, line):
        print "received", repr(line)

        global accounts
        try:
            msg = json.loads(str(line))
            if msg['address'] in accounts:
                self.sendLine(json.dumps(accounts[msg['address']]))
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

def load_file():
    global accounts
    try:
        output = open('data.pkl', 'r+')
        try:
            accounts = pickle.load(output)
        except EOFError:
            print 'error reading'
    except IOError:
        pass

def save_file():
    global accounts
    output = open('data.pkl', 'wb')
    pickle.dump(accounts, output)

access = ServiceProxy("http://btcrcp:Xi6xn7N5Rsyya1LYr8ICl351cRpe0xbF2Yub6JZNxRzOfU2zfOmvmNkwfo3dE5LYArzhZ35kdS0V1y57zflaz0lOL@127.0.0.1:8332")

def check_positions():
    global accounts
    global factory
    for acct in access.listreceivedbyaddress(0):
        address = acct['address']
        cfmt = acct['confirmations']
        amt = acct['amount']
        if address in accounts:
            prev_amt = accounts[address]['amount']
            if amt != prev_amt:
                accounts[address]['amount'] = amt
                factory.publish( accounts[address])
                print 'account %s has a new amount %f previous %f' % (address, amt, prev_amt)
            prev_cfmt = accounts[address]['confirmations']
            if cfmt != prev_cfmt:
                accounts[address]['confirmations'] = cfmt
                save_file()
                factory.publish( accounts[address])
                print 'account %s has a new confirmation %d previous %d' % (address, cfmt, prev_cfmt)
        else:
            accounts[address] = {'address':address, 'amount':  amt, 'confirmations': cfmt}
            save_file()
            print 'account %s position %f confirmations %d' % (address, amt, cfmt)

if __name__ == "__main__":
    load_file()
    factory = BtcFactory() 
    task.LoopingCall(check_positions).start(0.5)

    reactor.listenTCP(60025, factory)
    reactor.run()


