from tempfile import NamedTemporaryFile
import shutil
import pandas as pd
import csv
import re
import html

filename = "../datasets/book900k-1000k.csv"

filename1 = "../datasets/authors900k-1000k.csv"

col_list = ["Id"]
df = pd.read_csv(filename, usecols=col_list)

readfile = open(filename, 'r', newline='')
writefile = open(filename1, 'w', newline='')

reader = csv.reader(readfile, delimiter=',', quotechar='"')
writer = csv.writer(writefile, delimiter=',', quotechar='"')

header = ['Id', 'Author']

next(reader, None)
writer.writerow(header)

for row in reader:
    newRow = [row[0], row[2]]
    writer.writerow(newRow)

readfile.close()
writefile.close()