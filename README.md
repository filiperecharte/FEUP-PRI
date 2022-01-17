# FEUP-PRI
Information Processing and Recovery Class

## Requirements
```
Node.js
Docker
```

## Run SOLR

```bash
cd solr
docker build . -t goodreads_solr
docker run --name goodreads_books -p 8983:8983 -v ${PWD}/data:/data --rm goodreads_solr
```

## Run website
```bash
cd website/backend
npm install
npm start
cd website/frontend
npm install
npm start
```
Website runs at ```localhost:3000```.