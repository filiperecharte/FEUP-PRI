import pandas as pd
import requests
import re
from bs4 import BeautifulSoup

#gets ids from csv with all information
col_list = ["Id"]
df = pd.read_csv("idstest.csv", index_col=0, usecols=col_list)

f = open("genrestest.csv", "w")
f.write('Id, Genres' + '\n')

CLEANGENRE = re.compile('(?<=<span class="Button__labelItem">).+?(?=<\/span>)')

#iterate through ids 
for index, row in df.iterrows():
    print('Getting reviews from ' + str(row.name))
    r = requests.get('https://www.goodreads.com/book/show/' + str(row.name), cookies={"srb_1":"1_wl"})

    soup = BeautifulSoup(r.text, "html.parser")

    genresList = soup.find("ul", class_="CollapsableList")

    soup = BeautifulSoup(str(genresList), "html.parser")

    genres = soup.find_all("span", class_="Button__labelItem")

    genres_final = []
    for genre in genres:
        gg = re.findall('(?<=<span class="Button__labelItem">).+?(?=<\/span>)',str(genre))
        if gg[0] != '...more':
            genres_final.append(gg[0])
    
    f.write(str(row.name) + ',' + '\"' + ','.join(genres_final) + '\"' + '\n')

f.close()