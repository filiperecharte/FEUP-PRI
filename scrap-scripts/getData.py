import pandas as pd
import requests
import re
from bs4 import BeautifulSoup
from timeit import default_timer
import asyncio
from concurrent.futures import ThreadPoolExecutor
from threading import Thread
from queue import Empty, Queue
import signal
import sys
import json

START_TIME = default_timer()
CLEANR = re.compile('<.*?>')

queue = Queue()

f = None

def signal_handler(sig, frame):
    print('You pressed Ctrl+C!')
    f.flush()
    f.close()
    sys.exit(0)

signal.signal(signal.SIGINT, signal_handler)


def consume():
    global f
    while True:
        if not queue.empty():
            bookId, rows = queue.get()
            # Row comes out of queue; CSV writing goes here
            for row in rows:
                f.write(row)

def parseLanguages(bookId, data):
    soup = BeautifulSoup(data, "html.parser")
    languageList = soup.find("script", type="application/ld+json")
    ll = re.findall('(?<=<script type="application\/ld\+json">).+?(?=<\/script>)',str(languageList))
    language = json.loads(ll[0])['inLanguage']

    return bookId, [str(bookId) + ',' + language + '\n']

def parseGenres(bookId, data):
    soup = BeautifulSoup(data, "html.parser")
    genresList = soup.find("ul", class_="CollapsableList")
    soup = BeautifulSoup(str(genresList), "html.parser")
    genres = soup.find_all("span", class_="Button__labelItem")

    genres_final = []
    for genre in genres:
        gg = re.findall('(?<=<span class="Button__labelItem">).+?(?=<\/span>)',str(genre))
        if gg and not re.search('[0-9-.]', gg[0]) and re.search('(?=.*[A-Z])', gg[0]): #match genres without numbers chars and with uppercase letters
            genres_final.append(gg[0])
    if not genres_final:
        return bookId, []

    csv_genres = []

    for genre in genres_final:
        csv_genres.append(str(bookId) + ',' + genre + '\n')

    return bookId, csv_genres


def parseReviews(bookId, data):
    soup = BeautifulSoup(data, "html.parser")
    reviews = soup.find_all("div", class_="ReviewsList")
    soup = BeautifulSoup(str(reviews[0]), "html.parser")
    reviews = soup.find_all("span", class_="Formatted")

    csv_reviews = []

    for review in reviews:
        rr = re.findall('(?<=<span class="Formatted">).+?(?=<\/span>)',str(review))
        if rr and re.match('.[a-zA-Z0-9-()]', rr[0]):
            r = CLEANR.sub('', rr[0])
            csv_reviews.append(str(bookId) + ',' + '\"' + str(r) + '\"' + '\n')
    return bookId, csv_reviews


def fetch(session, bookId):

    base_url = 'https://www.goodreads.com/book/show/'

    with session.get(base_url + str(bookId)) as response:
        data = response.text
        if response.status_code != 200:
            print("FAILURE::" + base_url + str(bookId))

        if sys.argv[1] == 'genre':
            queue.put(parseGenres(bookId,data))
        elif sys.argv[1] == 'review':
            queue.put(parseReviews(bookId,data))
        elif sys.argv[1] == 'language':
            queue.put(parseLanguages(bookId,data))
        else:
            return

        elapsed = default_timer() - START_TIME
        time_completed_at = "{:5.2f}s".format(elapsed)
        print("{0:<30} {1:>20}".format(bookId, time_completed_at))

        return


async def get_data_asynchronous(bookIds_to_fetch):
    print("{0:<30} {1:>20}".format("Book", "Completed at"))

    with ThreadPoolExecutor(max_workers=35) as executor:
        with requests.Session() as session:
            
            # Set any session parameters here before calling `fetch`
            session.cookies.set("srb_1", "1_wl")

            # Initialize the event loop        
            loop = asyncio.get_event_loop()

            # Set the START_TIME for the `fetch` function
            START_TIME = default_timer()

            # Use list comprehension to create a list of
            # tasks to complete. The executor will run the `fetch`
            # function for each csv in the csvs_to_fetch list
            
            tasks = [
                loop.run_in_executor(
                    executor,
                    fetch,
                    *(session, row.name) # Allows us to pass in multiple arguments to `fetch`
                )
                for index, row in bookIds_to_fetch.iterrows()
            ]

            # Initializes the tasks to run and awaits their results
            

consumer = Thread(target=consume)
consumer.setDaemon(True)
consumer.start()

def main():
    global f
    f = open(sys.argv[1] + '.csv', "w")
    f.write('Id,' + sys.argv[1] + '\n')

    if sys.argv[1] != 'genre' and sys.argv[1] != 'review' and sys.argv[1] != 'language':
        print("invalid args")
        return

    col_list = ["Id"]

    #input file to get ids
    bookIds_to_fetch = pd.read_csv("books1.csv", index_col=0, usecols=col_list)

    print("Press CTRL-C when scrapping is finished")
    
    loop = asyncio.get_event_loop()
    future = asyncio.ensure_future(get_data_asynchronous(bookIds_to_fetch))
    loop.run_until_complete(future)

    consumer.join()

main()