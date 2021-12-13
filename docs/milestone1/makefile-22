SHELL := bash

default: 
    python refineDataset.py
    merge

merge:
    python mergeFiles.py
    data

data: 
    python retrieveAuthors.py
    python getData.py genre
    python getData.py language
    python getData.py review
    refine

refine:
    python refineRows.py

database:
    python create.py
    python populate.py

