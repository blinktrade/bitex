#!/usr/bin/env python
import fileinput
import sys
import json
import datetime
import csv

cancel_order_dict = {}
new_order_single_dict = {}

line_number = 0

csv_file = open(sys.argv[2], 'wt')
csv_writer = csv.writer(csv_file)
csv_writer.writerow( ('Timestamp','LineNumber', 'MessageType', 'ClOrdID', 'Latency(ms)') )

def latency_in_ms(t1, t2):
  return ( t2 - t1 ).microseconds / 1000

for line in fileinput.input(sys.argv[1]):
  timestamp = line[:23]
  timestamp = datetime.datetime.strptime(timestamp + '000', "%Y-%m-%d %H:%M:%S,%f")


  line_number += 1

  log_data = line[26:].split(',')
  if len(log_data) > 2:
    log_type = log_data[0]
    session = log_data[1]
    message = log_data[2]
    message_start_index = line.find(message)
    message = line[message_start_index:]

    try:
      message = json.loads(message)
      log_record = [timestamp,  log_type, session, message ]


      if 'MsgType' in message and  message['MsgType'] == 'F':
        cancel_order_dict[ message['OrigClOrdID'] ] = log_record

      if 'MsgType' in message and  message['MsgType'] == 'D':
        new_order_single_dict[ message['ClOrdID'] ] = log_record


      if 'MsgType' in message and  message['MsgType'] == '8':
        if message['ExecType'] == '4':
          if message['ClOrdID'] in cancel_order_dict:
            latency = latency_in_ms(cancel_order_dict[ message['ClOrdID'] ][0], timestamp)
            row = (timestamp,  line_number, 'CANCEL_ORDER', message['ClOrdID'], latency  )
            csv_writer.writerow( row )
            del cancel_order_dict[ message['ClOrdID'] ]

        if message['ExecType'] == '0':
          if message['ClOrdID'] in new_order_single_dict:
            latency = latency_in_ms(new_order_single_dict[ message['ClOrdID'] ][0], timestamp)
            row = (timestamp, line_number, 'NEW_ORDER', message['ClOrdID'], latency   )
            csv_writer.writerow( row )
            del new_order_single_dict[ message['ClOrdID'] ]

      #print line_number, timestamp, log_type, session, message
    except Exception,e :
      pass
