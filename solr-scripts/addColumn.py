import pandas as pd
  
# reading csv files
data1 = pd.read_csv('../datasets/books.csv')
data2 = pd.read_csv('../datasets/authors.csv')
data3 = pd.read_csv('../datasets/languages.csv')
  
# using merge function by setting how='left'
output2 = pd.merge(data1, data2, 
                   on='Id', 
                   how='left')

output3 = pd.merge(output2, data3, 
                   on='Id', 
                   how='left')

output3.to_csv('../datasets/final.csv',index=False)

