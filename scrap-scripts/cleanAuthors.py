from tempfile import NamedTemporaryFile
import shutil
import csv
import re
import html

CLEANR = re.compile('\r\n')

file = open('authors_clean.csv', 'w+', newline='')

with open('author.csv', 'r', newline='') as csvFile, file:
    reader = csv.reader(csvFile, delimiter=',', quotechar='"')
    writer = csv.writer(file, delimiter=',', quotechar='"')

    next(reader, None)
    
    for row in reader:
        try:
            if(row[0] == "601134"):
                print(row)
            if row[3] == '':
                writer.writerow(row)
                continue
            row[3] = str(CLEANR.sub('', row[3])) # remove tags from description
        except:
            writer.writerow(row)
            continue

        writer.writerow(row)
csvFile.close()