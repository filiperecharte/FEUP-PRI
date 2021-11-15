from numpy.core.numeric import NaN
import pandas as pd
import numpy as np
from wordcloud import WordCloud
from matplotlib.pyplot import *

def analyseGenres():
    df = pd.read_csv('../datasets/genres.csv')

    ser = df.groupby(df["Genre"])["Id"].count()

    ### Combine categories
    ser = ser.sort_values(ascending=False)
    ser['Others'] = ser[11:].sum()
    ser = ser.iloc[[0,1,2,3,4,5,6,7,8,9,10,-1]]
    print(ser)

    axis('equal');
    pie(ser.values, labels=ser.index, startangle=90, autopct=lambda x:int(x/100.*ser.sum()), pctdistance=0.8, counterclock=False)
    show()

def analyseLanguages():
    df = pd.read_csv ('../datasets/languages.csv')

    ser = df.groupby(df["Language"])["Id"].count()

    fig = figure()

    ### Combine categories
    ser = ser.sort_values(ascending=False)
    ser['Others'] = ser[6:].sum()
    ser = ser.iloc[[0,1,2,3,4,5,-1]]
    print(ser)

    fig, ax = subplots()
    ax.bar(ser.index, ser)
    xticks(rotation=90)

    ax.set_ylabel('Books')
    ax.set_xlabel('Language')

    for i, v in enumerate(ser):
        text(i, v, str(v), ha='center')
    show()

def analyseYears():
    df = pd.read_csv ('../datasets/books.csv')

    ser = df.groupby(df["PublishYear"])["Id"].count()

    fig = figure()

    ### Combine categories
    ser = ser.sort_values(ascending=False)
    ser = ser.iloc[:50]
    print(ser)

    xlim([1965, 2020])

    fig, ax = subplots()
    ax.bar(ser.index, ser)

    ax.set_ylabel('Books')
    ax.set_xlabel('Year')

    for i, v in enumerate(ser):
        text(i, v, str(v), ha='center')
    show()

def analyseRating():
    df = pd.read_csv ('../datasets/books.csv')

    ser = df.groupby(pd.cut(df["Rating"], bins=[0.0,1,2,3,4,5], include_lowest=True).astype(str))["Id"].count()

    fig, ax = subplots()
    ax.bar(ser.index, ser)

    ax.set_ylabel('Books')
    ax.set_xlabel('Rating')

    for i, v in enumerate(ser):
        text(i, v, str(v), ha='center')
    show()

def analyseDescriptionWords():
    df = pd.read_csv ('../datasets/books.csv', keep_default_na=False)

    ser = df.groupby(pd.cut(df["Description"].apply(lambda x: len(x.split(' '))), bins=[0,100,200,300,float("inf")], include_lowest=True).astype(str))["Id"].count()
    fig, ax = subplots()
    ax.bar(ser.index, ser)

    ax.set_ylabel('Descriptions')
    ax.set_xlabel('Words')

    for i, v in enumerate(ser):
        text(i, v, str(v), ha='center')
    
    show()

def analyseNumberReviews():
    df = pd.read_csv ('../datasets/reviews.csv')

    ser = df.groupby(df["Id"]).count()
    ser = ser.groupby(ser["Review"])["Review"].count()

    print(ser)

    fig, ax = subplots()

    ax.bar(ser.index, ser)

    ax.set_ylabel('Books')
    ax.set_xlabel('Reviews')

    # for i, v in enumerate(ser):
    #     text(i + 1, v, str(v), ha='center')
    
    show()

def analyseReviewsWords():
    df = pd.read_csv ('../datasets/reviews.csv', keep_default_na=False)

    ser = df.groupby(pd.cut(df["Review"].apply(lambda x: len(x.split(' '))), bins=[0,100,200,300,float("inf")], include_lowest=True).astype(str))["Id"].count()
    fig, ax = subplots()
    ax.bar(ser.index, ser)

    ax.set_ylabel('Reviews')
    ax.set_xlabel('Words')

    for i, v in enumerate(ser):
        text(i, v, str(v), ha='center')
    
    show()

def analyseAuthors():
    df = pd.read_csv ('../datasets/authors.csv')

    ser = df.groupby(df["Author"])["Id"].count()

    fig = figure()

    ### Combine categories
    ser = ser.sort_values(ascending=False)
    ser = ser.iloc[:24]
    print(ser)

    fig, ax = subplots()

    ax.bar(ser.index, ser)

    xticks(rotation='vertical')

    ax.set_ylabel('Books')
    ax.set_xlabel('Author')

    for i, v in enumerate(ser):
        text(i, v, str(v), ha='center')
    show()

def analyseReviewsCommonWords():
    # Reads 'Youtube04-Eminem.csv' file
    df = pd.read_csv('../datasets/books.csv')
    
    comment_words = ''
    # iterate through the csv file
    for val in df.Description:
        
        # typecaste each val to string
        val = str(val)
    
        # split the value
        tokens = val.split()
        
        # Converts each token into lowercase
        for i in range(len(tokens)):
            tokens[i] = tokens[i].lower()
        
        comment_words += " ".join(tokens)+" "
    
    wordcloud = WordCloud(width = 800, height = 800,
                    background_color ='white',
                    min_font_size = 10).generate(comment_words)
    
    # plot the WordCloud image                  
    figure(figsize = (8, 8), facecolor = None)
    imshow(wordcloud)
    axis("off")
    tight_layout(pad = 0)
    
    show()

analyseLanguages()