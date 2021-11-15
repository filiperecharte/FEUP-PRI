from tempfile import NamedTemporaryFile
import shutil
import pandas as pd
import csv
import sys

fileGenres = "../datasets/genres.csv"
fileLanguages = "../datasets/languages.csv"
filename_to_remove = "../datasets/books.csv"

headerBook = ['Id','Name','ISBN','Rating','PublishYear','PublishMonth','PublishDay','Publisher','CountsOfReviews','pagesNumber','Description']
headerGenre = ['Id', 'Genre']
headerLanguage = ['Id', 'Language']
headerReview=['Id', 'Review']

tempfile = NamedTemporaryFile('w+t', newline='', delete=False)

col_list = ["Id"]
dfGenres = pd.read_csv(fileGenres, usecols=col_list)
dfLanguages = pd.read_csv(fileLanguages, usecols=col_list)

readfile = open(filename_to_remove, 'r', newline='')

reader = csv.reader(readfile, delimiter=',', quotechar='"')
writer = csv.writer(tempfile, delimiter=',', quotechar='"')

next(reader, None)
writer.writerow(headerBook)

for row in reader:
    if int(row[0]) not in dfGenres.Id.to_list() or int(row[0]) not in dfLanguages.Id.to_list():
        print(row[0])
        continue
    
    writer.writerow(row)

shutil.move(tempfile.name, filename_to_remove)
readfile.close()

def main():
    global filename
    global filename_to_remove

    filename = sys.argv[1]
    filename_to_remove = sys.argv[2]

main()