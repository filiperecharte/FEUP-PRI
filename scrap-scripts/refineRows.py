from tempfile import NamedTemporaryFile
import shutil
import pandas as pd
import csv

filename = "../datasets/book900k-1000k.csv"
filename_to_remove = "../datasets/reviews900k-1000k.csv"
#header = ['Id','Name','Authors','ISBN','Rating','PublishYear','PublishMonth','PublishDay','Publisher','CountsOfReviews','pagesNumber','Description']
#header = ['Id', 'Genre']
#header = ['Id', 'Language']
header=['Id', 'Review']
tempfile = NamedTemporaryFile('w+t', newline='', delete=False)

col_list = ["Id"]
df = pd.read_csv(filename, usecols=col_list)

readfile = open(filename_to_remove, 'r', newline='')

reader = csv.reader(readfile, delimiter=',', quotechar='"')
writer = csv.writer(tempfile, delimiter=',', quotechar='"')

next(reader, None)
writer.writerow(header)
for row in reader:
    if int(row[0]) not in df.Id.to_list():
        print(row[0])
        continue
    
    writer.writerow(row)

shutil.move(tempfile.name, filename_to_remove)
readfile.close()