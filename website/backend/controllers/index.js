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
    .catch(() => {
      return res.status(404).json('Not Found!');
    })
}

async function search(req, res) {
    let query = req.query.input;
    if (req.query.input === "") query = '*';
    let startRow;
    if (req.query.pageNumber === '0') {
      startRow = 10 * req.query.pageNumber;
    }
    else {
      startRow = 10 * (req.query.pageNumber - 1);
    }
    console.log(query);

    let params = new URLSearchParams();
    params.append('q', query);
    params.append('q.op', 'AND');
    params.append('wt', 'json');
    params.append('defType', 'edismax');
    params.append('qf', 'name description reviews author');
    params.append('rows', '10');
    params.append('start', startRow.toString());

    switch (req.query.sort) {
      case 'yearUp':
        params.append('sort', 'publishYear ASC');
        break;
      case 'yearDown':
        params.append('sort', 'publishYear DESC');
        break;
      case 'ratingUp':
        params.append('sort', 'rating ASC');
        break;
      case 'ratingDown':
        params.append('sort', 'rating DESC');
        break;
    }

    params.append('fq', `pagesNumber:[0 TO ${req.query.numberPages}]`);


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
