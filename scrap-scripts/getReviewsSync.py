import pandas as pd
import requests
import re
from bs4 import BeautifulSoup

#gets ids from csv with all information
col_list = ["Id"]
df = pd.read_csv("book700k-800k.csv", index_col=0, usecols=col_list)

f = open("reviews700k-800k.csv", "w")
f.write('Id, Review' + '\n')

#iterate through ids 
for index, row in df.iterrows():
    print('Getting reviews from ' + str(row.name))
    r = requests.get('https://www.goodreads.com/book/show/' + str(row.name), cookies={"srb_1":"1_wl"})

    soup = BeautifulSoup(r.text, "html.parser")

    reviews = soup.find_all("div", class_="ReviewsList")

    soup = BeautifulSoup(str(reviews[0]), "html.parser")

    reviews = soup.find_all("span", class_="Formatted")

    CLEANR = re.compile('<.*?>')

    for review in reviews:
        rr = re.findall('(?<=<span class="Formatted">).+?(?=<\/span>)',str(review))
        if rr and re.match('.[a-zA-Z0-9-()]', rr[0]):
            r = CLEANR.sub('', rr[0])
            f.write(str(row.name) + ',' + '\"' + str(r) + '\"' + '\n')

f.close()