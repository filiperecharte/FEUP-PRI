import pandas as pd

all_filenames = ['../datasets/languages600k-700k.csv', '../datasets/languages700k-800k.csv', '../datasets/languages800k-900k.csv', '../datasets/languages900k-1000k.csv']

#combine all files in the list
combined_csv = pd.concat([pd.read_csv(f, usecols=range(2),
                 header=None) for f in all_filenames ])
#export to csv
combined_csv.to_csv("languages.csv", index=False, encoding='utf-8-sig')