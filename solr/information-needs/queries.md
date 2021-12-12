# Information Needs

## Subset of 200 books

### IN1: History book about family

*With Schema*

```
q: history family

qf: genres, description, reviews

url: http://localhost:8983/solr/books/select?defType=edismax&indent=true&q.op=AND&q=history%20family&qf=genres%20description%20reviews&rows=29

```

*Bosted*

```
q: history family

qf: genres, description, reviews

bq: (genres:history)^20 (description:family)^15

url: http://localhost:8983/solr/books/select?bq=(genres%3Ahistory)%5E20%20(description%3Afamily)%5E15&defType=edismax&fl=*%2C%20score&indent=true&q.op=AND&q=history%20family&qf=genres%20description%20reviews&rows=37
```

---

### IN2: Books about Fiction Novels

*With Schema*

```
q: fiction novel

qf: genres description name

url: http://localhost:8983/solr/books/select?defType=edismax&fl=*%2C%20score&indent=true&q.op=AND&q=fiction%20novel&qf=genres%20description%20name&rows=37
```

*Bosted*

```
q: fiction novel

qf: genres^20 description^10 name^15

url: http://localhost:8983/solr/books/select?defType=edismax&fl=*%2C%20score&indent=true&q.op=AND&q=fiction%20novel&qf=genres%5E20%20description%5E10%20name%5E15&rows=37
```

---

### IN3: Books fast to read

*With Schema*

```
q: fast read

qf: reviews

pf: reviews^20

url: http://localhost:8983/solr/books/select?defType=edismax&fl=*%2C%20score&indent=true&q.op=AND&q=fast%20read&qf=reviews&rows=37
```

*Bosted*

```
q: fast read

qf: reviews

pf: reviews^20

ps: 5

url: http://localhost:8983/solr/books/select?defType=edismax&fl=*%2C%20score&indent=true&pf=reviews%5E20&ps=5&q.op=AND&q=fast%20read&qf=reviews&rows=37
```

---

## Entire dataset

### IN4: Best books about nonfiction ever

*With Schema*

```
q: nonfiction best

qf: genres description reviews

url: http://localhost:8983/solr/books/select?defType=edismax&fl=*%2C%20score&indent=true&ps=0&q.op=AND&q=nonfiction%20best&qf=genres%20description%20reviews&rows=43
```

*Bosted*

```
q:nonfiction best

qf: genres description reviews

bq: 

url: http://localhost:8983/solr/books/select?bq=(description%3Abest)%5E10%20(reviews%3Abest)%5E20&defType=edismax&fl=*%2C%20score&indent=true&q.op=AND&q=nonfiction%20best&qf=genres%20description%20reviews&rows=43
```

---

### IN5: Gift on Christmas a Romance book about friends

*With Schema*

```
q: best story

qf: genres description reviews

url: http://localhost:8983/solr/books/select?defType=dismax&indent=true&q.op=AND&q=world%20war&qf=genres%20description%20reviews
```

*Bosted*

```
q:

qf: 

url:
```