import numpy as np
import pandas
import random
import re
import json

books = open('data.json')

books_json = json.load(books)

parsed_books_json = [book for book in books_json if len(book['genres']) > 3 and len(book['reviews']) > 5]

books_100 = random.sample(parsed_books_json, 200)

### Save JSON
with open("data_subset.json", 'w+') as jsonfile:
    jsonfile.write(json.dumps(books_100, indent=4))