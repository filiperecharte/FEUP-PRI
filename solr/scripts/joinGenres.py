from tempfile import NamedTemporaryFile
import shutil
import pandas as pd
import csv

filename = "../datasets/genres.csv"
final_filename = "../datasets/final.csv"

finalfile = "../datasets/final_wg.csv"

col_list = ["Id"]
df = pd.read_csv(filename, usecols=col_list)

readfile = open(filename, 'r', newline='')
readfile_final = open(final_filename, 'r', newline='', encoding='utf-8')
finalfile = open(finalfile,'w', newline='', encoding='utf-8' )

reader = csv.reader(readfile, delimiter=',', quotechar='"')
reader_final = csv.reader(readfile_final, delimiter=',', quotechar='"')

writer = csv.writer(finalfile, delimiter=',', quotechar='"')

next(reader, None)

header = ['id','name','ISBN','rating','publishYear','publishMonth','publishDay','publisher','countsOfReviews','pagesNumber','description','author','language']

writer.writerow(header)

genres_set = dict()

for row in reader:
    if row[0] in genres_set:
        genres_set[row[0]] = genres_set[row[0]] + ',' + row[1]
    else:
        genres_set[row[0]] = row[1]

for f_row in reader_final:
    if (f_row[0] == 'id'):
        continue
    f_row.append(genres_set[f_row[0]])
    writer.writerow(f_row)

readfile.close()