#!/usr/bin/env python

import httplib, urllib, os

def compile_with_google_closure_compiler( js_code ):
  params = urllib.urlencode([
    ('js_code', js_code ),
    ('compilation_level', 'ADVANCED_OPTIMIZATIONS'),
    ('use_closure_library', 'true'),
    ('externs_url','https://closure-compiler.googlecode.com/git/contrib/externs/jquery-1.9.js'),
    ('externs_url','https://raw.github.com/mechatama/externs/master/externs/twitter-bootstrap.js'),
    ('externs_url', 'https://raw.github.com/pinhopro/bitex/master/static/js/externs/parsley.js'),
    ('output_format', 'text'),
    ('formatting', 'pretty_print'),
    ('output_info', 'compiled_code'),
  ])

  # Always use the following value for the Content-type header.
  headers = { "Content-type": "application/x-www-form-urlencoded" }
  conn = httplib.HTTPConnection('closure-compiler.appspot.com')
  conn.request('POST', '/compile', params, headers)
  response = conn.getresponse()
  data = response.read()
  conn.close()

  return  data

def compile_files( file_list, output_filename ):
  js_code = ''
  for file in file_list:
    os_file =  os.path.join( os.path.dirname(__file__), file )
    with open(os_file, 'r') as f:
      js_code += f.read()


  compiled_js_code = compile_with_google_closure_compiler( js_code )

  output_file =  os.path.join( os.path.dirname(__file__), output_filename )
  with open(output_file, 'w'  ) as f:
    f.write( compiled_js_code )


def main():
  print 'compiling bitex api ...'
  compile_files( ['bitex.js', 'bitex_exports.js'], 'bitex.compiled.js' )
  print 'done'


  print 'compiling bitex admin application'
  compile_files( ['bitex.js', 'bitex_datagrid.js', 'bitex_admin_app.js' ], 'bitex_admin_app.compiled.js' )
  print 'done'

if __name__ == '__main__':
  main()