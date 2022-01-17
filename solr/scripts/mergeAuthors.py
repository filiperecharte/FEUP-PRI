import pandas as pd
import json
import csv

books_df = open('data_final.json')

books = json.load(books_df)

for book in books:
    print(book['id'])
    book['genres'] = book['genres'].split(',')

# Save merged data
with open("data_final_genres.json", "w+") as f:
    f.write(json.dumps(books, indent=4))
    f.close()

print("-> Successfully merged books, authors and pics\n")