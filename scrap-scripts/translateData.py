from turtle import title
import pandas as pd

from googletrans import Translator

def translate_text(text):
    translator = Translator()

    translation = translator.translate(text, dest="en").text

    return translation
    
def translate_data_to_excel():
    lang_df = pd.read_csv('../datasets/languages.csv')

    book_df = pd.read_csv('../datasets/books.csv')

    to_translate_df = lang_df.loc[lang_df['Language'] != 'English']
    to_translate_list = to_translate_df['Id'].to_list()
    
    title_data = {'Id':[], 'Name':[]}
    title_df = pd.DataFrame(title_data)

    description_data = {'Id':[], 'Description':[]}
    description_df = pd.DataFrame(description_data)

    for index, row in book_df.iterrows():

        if str(row['Id']) in to_translate_list:
            print(index)
            
            title_row = {'Id': row['Id'], 'Name': row['Name']}
            title_df = title_df.append(title_row, ignore_index=True)

            description_row = {'Id': row['Id'], 'Description': row['Description']}
            description_df = description_df.append(description_row, ignore_index=True)

    title_df.to_excel('../datasets/translate_title.xlsx', index=False)
    description_df.to_excel('../datasets/translate_description.xlsx', index=False)

#translate_data_to_excel()

def translate_data_from_excel():
    lang_df = pd.read_csv('../datasets/languages.csv')

    book_df = pd.read_csv('../datasets/books.csv')

    title_df = pd.read_excel('../datasets/translate_title.xlsx')
    description_df = pd.read_excel('../datasets/translate_description.xlsx')

    to_translate_df = lang_df.loc[lang_df['Language'] != 'English']
    to_translate_list = to_translate_df['Id'].to_list()

    for index, row in book_df.iterrows():

        if str(row['Id']) in to_translate_list:
            key = row['Id']

            translate_row = title_df.loc[title_df['Id'] == key]
            translate_tile = translate_row['Name'].to_list()[0]

            book_df.at[index, 'Name'] = translate_tile

            translate_row = description_df.loc[description_df['Id'] == key]
            translate_description = translate_row['Description'].to_list()[0]

            book_df.at[index, 'Description'] = translate_description

    book_df.to_csv('../datasets/translate_files.csv', index=False)

translate_data_from_excel()