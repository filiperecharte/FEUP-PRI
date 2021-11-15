from tempfile import NamedTemporaryFile
import shutil
import csv
import re
import html

CLEANR = re.compile('(<.*?>|\r\n)')

filenames = ['../datasets/book600k-700k.csv', '../datasets/book700k-800k.csv', '../datasets/book800k-900k.csv','../datasets/book900k-1000k.csv']

header = ['Id','Name','ISBN','Rating','PublishYear','PublishMonth','PublishDay','Publisher','CountsOfReviews','pagesNumber','Description']

for filename in filenames:
    print('refining: ' + filename)
    tempfile = NamedTemporaryFile('w+t', newline='', delete=False)

    with open(filename, 'r', newline='') as csvFile, tempfile:
        reader = csv.reader(csvFile, delimiter=',', quotechar='"')
        writer = csv.writer(tempfile, delimiter=',', quotechar='"')

        next(reader, None)
        writer.writerow(header)
        
        for row in reader:
            if not re.match('.[a-zA-Z0-9-()]', row[1]):
                continue
            try:
                if row[18] == '':
                    continue
                row[18] = html.unescape(str(CLEANR.sub('', row[18]))) # remove tags from description
                
                # remove rating dist
                del row[9]
                del row[9]
                del row[9]
                del row[9]
                del row[9]
                del row[9]

                del row[10] # remove language

                #book600k-700k.csv does not contain this
                del row[12] # remove count of text reviews

            except: #already refined
                None

            writer.writerow(row)
    shutil.move(tempfile.name, filename)
    csvFile.close()


