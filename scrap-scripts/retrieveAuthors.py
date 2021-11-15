from tempfile import NamedTemporaryFile
import shutil
import pandas as pd
import csv

headerBooks = ['Id','Name','Authors','ISBN','Rating','PublishYear','PublishMonth','PublishDay','Publisher','CountsOfReviews','pagesNumber','Description']
filename = "books.csv"

filename1 = "authors.csv"

col_list = ["Id"]
df = pd.read_csv(filename, usecols=col_list)

readfile = open(filename, 'r+', newline='')
writefile = open(filename1, 'w', newline='')

tempfile = NamedTemporaryFile('w+t', newline='', delete=False)

reader = csv.reader(readfile, delimiter=',', quotechar='"')
writer = csv.writer(writefile, delimiter=',', quotechar='"')
writerTemp = csv.writer(tempfile, delimiter=',', quotechar='"')

header = ['Id', 'Author']

next(reader, None)
writer.writerow(header)
writerTemp.writerow(headerBooks)

for row in reader:
    newRow = [row[0], row[2]]
    writer.writerow(newRow)
    del row[2]
    writerTemp.writerow(row)

shutil.move(tempfile.name, filename)
readfile.close()
writefile.close()