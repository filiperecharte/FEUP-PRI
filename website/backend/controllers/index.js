const solr = require('../config');

async function test(req, res) {
    console.log("hi there!")
    return res.status(200).json({ message: 'Hello from Backend' });
}

async function getBook(req, res) {
  const id = req.params.id;

  const params = {
    "q": `id:${id}`,
    "indent": "true",
    "q.op": "AND",
  };

  solr.get('/select', {params: params})
    .then(function (response) {
      if(response.data.response.numFound !== 0)
        return res.status(200).send(response.data.response.docs[0]);
      else
        return res.status(404).json('Not Found!');
    })
    .catch((error) => {
      return res.status(404).json('Not Found!');
    })
}

async function search(req, res) {
    let query = req.query.inputText;
    if (req.query.inputText === "") query = '*';

    const params = {
        'q': query,
        'q.op': 'AND',
        'wt' : 'json',
        'defType': 'edismax',
        'qf' : 'name',
        'rows' : '10',
    }

    console.log(query);
    solr.get('/select', {params: params})
      .then((response) => {
          const num = response.data.response.numFound;

          if(num === 0) {
              return res.status(404).send('Not found');
          }

          const books = [];

          response.data.response.docs.forEach((doc) => {
              books.push(doc);
          })

          return res.send({books: books, numberFound: response.data.response.numFound});
      })
      .catch((error) => {
          console.log(error);
      });
}

module.exports = {
    test,
    search,
    getBook,
};