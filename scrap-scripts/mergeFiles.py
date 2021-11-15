import pandas as pd

filenames = ['../datasets/book600k-700k.csv', '../datasets/book700k-800k.csv', '../datasets/book800k-900k.csv','../datasets/book900k-1000k.csv']

#combine all files in the list
combined_csv = pd.concat([pd.read_csv(f) for f in filenames ])

#export to csv
combined_csv.to_csv("books.csv", index=False, encoding='utf-8-sig')