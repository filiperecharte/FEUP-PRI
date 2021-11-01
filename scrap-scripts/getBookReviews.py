import requests
import re
from bs4 import BeautifulSoup

r = requests.get('https://www.goodreads.com/book/show/700000.A_Passion_to_Preserve', cookies={"srb_1":"1_wl"})

soup = BeautifulSoup(r.text, "html.parser")

reviews = soup.find_all("div", class_="ReviewsList")

soup = BeautifulSoup(str(reviews[0]), "html.parser")

reviews = soup.find_all("span", class_="Formatted")

CLEANR = re.compile('<.*?>') 

for review in reviews:
    rr = re.findall('(?<=<span class="Formatted">).+?(?=<\/span>)',str(review))
    r = CLEANR.sub('', rr[0])
#print(r.text)
    print(r)

print(len(reviews))
