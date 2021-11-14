from tempfile import NamedTemporaryFile
import shutil
import pandas as pd
import csv
import re
import html

filename = "../datasets/genres600k-700k.csv"

tempfile = NamedTemporaryFile('w+t', newline='', delete=False)

col_list = ["Id"]
df = pd.read_csv(filename, usecols=col_list)

readfile = open(filename, 'r', newline='')

reader = csv.reader(readfile, delimiter=',', quotechar='"')
writer = csv.writer(tempfile, delimiter=',', quotechar='"')

header = ['Id', 'Genre']

next(reader, None)
writer.writerow(header)
for row in reader:
    if ',' in row[1]:
        genres = row[1].split(',')
        for genre in genres:
            newRow = [row[0],genre]
            writer.writerow(newRow)
    else:
        writer.writerow(row)

shutil.move(tempfile.name, filename)
readfile.close()