import getopt, sys
import os.path
import filecmp
import re

from xml.dom import minidom

def usage():
    print 'please inform first file ( --file1 ) and second file ( --file2 )'

def main(argv):
    try:
        opts, args = getopt.getopt(argv, '', ["file1=", "file2="])
    except getopt.GetoptError:
        sys.exit(2)

    output_file = None
    from_file = None
    to_file = None
    for o, a in opts:
        if o in ("-o"):
            output_file = a
        elif o in ("--file1"):
            from_file = a
        elif o in ("--file2"):
            to_file = a

    if from_file is None or to_file is None:
        usage()
        sys.exit(-1)

    if not os.path.isfile(from_file) :
        print 'could not found ', from_file 
        sys.exit(-2)

    if not os.path.isfile(to_file):
        print 'could not found ', to_file 
        sys.exit(-3)

    if from_file.strip() == to_file.strip():
        print 'please inform a diferent file'
        sys.exit(-4)

    if  filecmp.cmp(from_file, to_file):
        print 'from file: ', from_file, ' and to file:', to_file, ' has the same content'
        sys.exit(-4)

    to_tokens =  {}
    xmlto = minidom.parse(to_file)
    for s in xmlto.getElementsByTagName('translation'):
        to_tokens[s.attributes['id'].value] = s.firstChild.nodeValue

    with open(from_file, "r") as f:
        for l in f:
            line = l.rstrip('\n')
            match = re.match( r'.*translation id="(.*)"', line, re.M|re.I)
            if match:
                id = match.group(1)
                if id in to_tokens:
                    print '<translation id="%s">%s<translation>' % ( id, to_tokens[id] )
                    continue

            print line

    


if __name__ == "__main__":
    main(sys.argv[1:])
