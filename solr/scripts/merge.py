import pandas as pd
import json

books_df = pd.read_csv('../datasets/final_wg.csv')
reviews_df = pd.read_csv('../datasets/reviews.csv')

books_df['domainType'] = 'book'
reviews_df['domainType'] = 'review'

books = books_df.to_dict(orient='records')
reviews = reviews_df.to_dict(orient='records')

print("Merging data...")

# Create unique id for reviews
id_set = set()
id = 0
for book in books:
    id = book['id']
    print(id)
    book['reviews'] = []
    i=0
    for review in reviews:
        if review['id'] == id:
            review['id'] = str(id) + '-r' + str(i)
            book['reviews'].append(review)
            i+=1

# Save merged data
with open("data.json", "w+") as f:
    f.write(json.dumps(books, indent=4))
    f.close()

print("-> Successfully merged books, genres and reviews\n")