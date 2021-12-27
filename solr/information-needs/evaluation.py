# SETUP
import matplotlib.pyplot as plt
from sklearn.metrics import PrecisionRecallDisplay
import numpy as np
import json
import requests
import pandas as pd
from itertools import cycle

# setup plot details
colors = cycle(["navy", "turquoise", "cornflowerblue", "teal"])

BOOSTED = True
NOSCHEMA = False
QRELS_FILE = "query5/5_qrels.txt"
QUERY_URL = "http://localhost:8983/solr/books/select?bq=(genres%3Aromance)%5E60%20(description%3Afriends)%5E20&defType=edismax&fl=*%2C%20score&indent=true&pf=reviews%5E30&ps=5&q.op=OR&q=christmas%20gift&qf=reviews&rows=10"

# Read qrels to extract relevant documents
relevant = list(map(lambda el: el.strip(), open(QRELS_FILE).readlines()))
# Get query results from Solr instance
results = requests.get(QUERY_URL).json()['response']['docs']
# results = json.load(open('query4/noschema.json', encoding="utf8"))['response']['docs']


# METRICS TABLE
# Define custom decorator to automatically calculate metric based on key
metrics = {}
metric = lambda f: metrics.setdefault(f.__name__, f)

@metric
def ap(results, relevant):
    """Average Precision"""
    precision_values = [
        len([
            doc 
            for doc in results[:idx]
            if doc['id'] in relevant
        ]) / idx 
        for idx in range(1, len(results))
    ]
    return sum(precision_values)/len(precision_values)

@metric
def p10(results, relevant, n=10):
    """Precision at N"""
    return len([doc for doc in results[:n] if doc['id'] in relevant])/n

@metric
def r10(results, relevant, n=10):
    """Recall at N"""
    return len([doc for doc in results[:n] if doc['id'] in relevant]) / len(relevant)

def calculate_metric(key, results, relevant):
    return metrics[key](results, relevant)

# Define metrics to be calculated
evaluation_metrics = {
    'ap': 'Average Precision',
    'p10': 'Precision at 10 (P@10)',
    'r10': 'Recall at 10(R@10)'
}

# Calculate all metrics and export results as LaTeX table
df = pd.DataFrame([['Metric','Value']] +
    [
        [evaluation_metrics[m], calculate_metric(m, results, relevant)]
        for m in evaluation_metrics
    ]
)

if(BOOSTED):
    with open('query5/results_boosted.tex','w') as tf:
        tf.write(df.to_latex())
elif(NOSCHEMA):
    with open('query5/results_noschema.tex','w') as tf:
        tf.write(df.to_latex())
else:
    with open('query5/results.tex','w') as tf:
        tf.write(df.to_latex())
