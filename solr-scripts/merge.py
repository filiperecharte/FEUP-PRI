import pandas as pd
import json

books_df = pd.read_csv('../datasets/final.csv')
genres_df = pd.read_csv('../datasets/genres.csv')
reviews_df = pd.read_csv('../datasets/reviews.csv')

books_df['domain_type'] = 'book'
genres_df['domain_type'] = 'genre'
reviews_df['domain_type'] = 'review'

books = books_df.to_dict(orient='records')
genres = genres_df.to_dict(orient='records')
reviews = reviews_df.to_dict(orient='records')

print("Merging data...")

# Create unique id for genres
id_set = set()
id = 0
for genre in genres:
    if genre['Id'] not in id_set:
        id = 0
        id_set.add(genre['Id'])
    genre['Id'] = str(genre['Id']) + '-g' + str(id)
    id += 1

# Create unique id for reviews
id_set = set()
id = 0
for review in reviews:
    if review['Id'] not in id_set:
        id = 0
        id_set.add(review['Id'])
    review['Id'] = str(review['Id']) + '-r' + str(id)
    id += 1

# Save merged data
with open("data.json", "w+") as f:
    f.write(json.dumps(books, indent=4))
    f.close()
with open("data.json", "a") as f:
    f.write(json.dumps(genres, indent=4))
    f.close()
with open("data.json", "a") as f:
    f.write(json.dumps(reviews, indent=4))
    f.close()

print("-> Successfully merged items and reviews, saved to solr/data.json\n")