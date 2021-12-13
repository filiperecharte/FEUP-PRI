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
QRELS_FILE = "query1/1_qrels.txt"
QUERY_URL = "http://localhost:8983/solr/books/select?bq=(genres%3Ahistory)%5E20%20(description%3Afamily)%5E15&defType=edismax&fl=*%2C%20score&indent=true&q.op=AND&q=history%20family&qf=genres%20description%20reviews&rows=10"

# Read qrels to extract relevant documents
relevant = list(map(lambda el: el.strip(), open(QRELS_FILE).readlines()))
# Get query results from Solr instance
results = requests.get(QUERY_URL).json()['response']['docs']



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
    with open('query1/results_boosted.tex','w') as tf:
        tf.write(df.to_latex())
else:
    with open('query1/results.tex','w') as tf:
        tf.write(df.to_latex())
