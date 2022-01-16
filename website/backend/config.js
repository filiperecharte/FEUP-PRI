const axios = require('axios');

const books = axios.create({
  baseURL: 'http://localhost:8983/solr/books',
  timeout: 1000
});

module.exports = books;