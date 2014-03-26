import os
import sys

ROOT_PATH = os.path.abspath( os.path.join(os.path.dirname(__file__), "../../"))
sys.path.insert( 0, os.path.join(ROOT_PATH, 'libs/coinkit'))
sys.path.insert( 0, os.path.join(ROOT_PATH, 'libs/characters'))


from coinkit import BitcoinKeypair, LitecoinKeypair

import tornado.ioloop
import tornado.web
import tornado.options

from tornado.escape import json_encode

class ReceiveHandler(tornado.web.RequestHandler):
    def get(self):
        method = self.get_argument("method", None)
        if method == None: 
            self.write("Error No Method Provided\n")
            return


        keypair = None
        currency = self.get_argument("currency", None)
        if currency == None: 
            self.write("Error No Curency Provided\n")
            return
        elif currency == 'BTC': 
            keypair = BitcoinKeypair()
        elif currency == 'LTC': 
            keypair = LitecoinKeypair()
        else: 
            self.write("Error Invalid Curency Provided\n")
            return

        address = self.get_argument("address", None)
        if address == None: 
            self.write("Error You Must Provide a Destination Address\n")
            return

        result = {}
        result['input_address'] = keypair.address()
        result['fee_percent'] = 0
        result['destination'] = address

        self.write(json_encode(result))

if __name__ == "__main__":
    #args = sys.argv
    #args.append("--log_file_prefix=/opt/bitex-satoshi/apps/api/api.log")
    #args.append("--logging=debug")

    tornado.options.parse_command_line()

    application = tornado.web.Application([
        (r"/", ReceiveHandler),
    ])
    application.listen(8888)

    tornado.ioloop.IOLoop.instance().start()
