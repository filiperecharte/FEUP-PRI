FROM solr:8.10

#COPY data.json /data/data.json

#COPY schema.json /data/schema.json

COPY startup.sh /scripts/startup.sh

ENTRYPOINT ["sh", "/scripts/startup.sh"]
