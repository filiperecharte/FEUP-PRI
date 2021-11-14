from tempfile import NamedTemporaryFile
import shutil
import csv
import re
import html

CLEANR = re.compile('(<.*?>|\r\n)')

filename = '../datasets/book600k-700k.csv'
header = ['Id','Name','ISBN','Rating','PublishYear','PublishMonth','PublishDay','Publisher','CountsOfReviews','pagesNumber','Description']
#header = ['Id', 'Review']
tempfile = NamedTemporaryFile('w+t', newline='', delete=False)

with open(filename, 'r', newline='') as csvFile, tempfile:
    reader = csv.reader(csvFile, delimiter=',', quotechar='"')
    writer = csv.writer(tempfile, delimiter=',', quotechar='"')

    next(reader, None)
    writer.writerow(header)
    
    for row in reader:
        if not re.match('.[a-zA-Z0-9-()]', row[1]):
            continue
        if row[18] == '':
            print('no description')
            del row
            continue
        row[18] = html.unescape(str(CLEANR.sub('', row[18]))) # remove tags from description
        del row[19] # remove count of text reviews
        del row[16] # remove language
        
        # remove rating dist
        del row[9]
        del row[9]
        del row[9]
        del row[9]
        del row[9]
        del row[9]

        del row[10] # remove language
        del row[12] # remove count of text reviews

        writer.writerow(row)

shutil.move(tempfile.name, filename)


