#!/bin/bash

precreate-core books

# Start Solr in background mode so we can use the API to upload the schema
solr start

sleep 10

cp /data/synonyms.txt /var/solr/data/books/conf

# Schema definition via API
curl -X POST -H 'Content-type:application/json' \
    --data-binary @/data/schemaM3.json \
    http://localhost:8983/solr/books/schemaM3

# Populate collection
bin/post -c books /data/data_final_genres.json

# Restart in foreground mode so we can access the interface
solr restart -f
