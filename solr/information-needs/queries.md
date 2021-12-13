# Information Needs

## Subset of 200 books

### IN1: History book about family

*With Schema*

```
q: history family

qf: genres, description, reviews

url: http://localhost:8983/solr/books/select?defType=edismax&indent=true&q.op=AND&q=history%20family&qf=genres%20description%20reviews&rows=10

```

*Bosted*

```
q: history family

qf: genres, description, reviews

bq: (genres:history)^20 (description:family)^15

url: http://localhost:8983/solr/books/select?bq=(genres%3Ahistory)%5E20%20(description%3Afamily)%5E15&defType=edismax&fl=*%2C%20score&indent=true&q.op=AND&q=history%20family&qf=genres%20description%20reviews&rows=10
```

---

### IN2: Books about Fiction Novels

*With Schema*

```
q: fiction novel

qf: genres description name

url: http://localhost:8983/solr/books/select?defType=edismax&fl=*%2C%20score&indent=true&q.op=AND&q=fiction%20novel&qf=genres%20description%20name&rows=10
```

*Bosted*

```
q: fiction novel

qf: genres^20 description^10 name^15

url: http://localhost:8983/solr/books/select?defType=edismax&fl=*%2C%20score&indent=true&q.op=AND&q=fiction%20novel&qf=genres%5E20%20description%5E10%20name%5E15&rows=10
```

---

### IN3: Books fast to read

*With Schema*

```
q: fast read

qf: reviews

url: http://localhost:8983/solr/books/select?defType=edismax&fl=*%2C%20score&indent=true&q.op=AND&q=fast%20read&qf=reviews&rows=10
```

*Bosted*

```
q: fast read

qf: reviews

pf: reviews^20

ps: 5

url: http://localhost:8983/solr/books/select?defType=edismax&fl=*%2C%20score&indent=true&pf=reviews%5E20&ps=5&q.op=AND&q=fast%20read&qf=reviews&rows=10
```

---

## Entire dataset

### IN4: Emotive books about World War II holocaust

*With Schema*

```
q: "world war II" emotive holocaust

qf: genres description reviews

url: http://localhost:8983/solr/books/select?defType=edismax&fl=*%2C%20score&indent=true&q.op=AND&q=%22world%20war%20II%22%20emotive%20holocaust&qf=reviews%20genres%20description&rows=10
```

*Bosted*

```
q:"world war II" emotive holocaust

qf: reviews^80 genres^100 description^10


url: http://localhost:8983/solr/books/select?bq=(reviews%3Aemotive)%5E80&defType=edismax&fl=*%2C%20score&indent=true&q.op=AND&q=%22world%20war%20II%22%20emotive%20holocaust&qf=reviews%5E20%20genres%5E100%20description%5E10&rows=10
```

---

### IN5: Romance books about Friends for a christmas gift

*With Schema*

```
q: christmas gift

fq: description: family
fq: genres: romance

qf: reviews genres description

url: http://localhost:8983/solr/books/select?defType=edismax&fl=*%2C%20score&fq=description%3A%20family&fq=genres%3Aromance&indent=true&q.op=OR&q=christmas%20gift&qf=reviews%20genres%20description&rows=10
```

*Bosted*

```
q: christmas gift

qf: reviews

pf: reviews^30

ps: 5

bq: (genres:romance)^60 (description:friends)^20

url:http://localhost:8983/solr/books/select?bq=(genres%3Aromance)%5E60%20(description%3Afriends)%5E20&defType=edismax&fl=*%2C%20score&indent=true&pf=reviews%5E30&ps=5&q.op=OR&q=christmas%20gift&qf=reviews&rows=10
```