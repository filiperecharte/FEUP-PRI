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
    console.log(req.query.pageNumber);
    console.log(req.query.sort);
    console.log(req.query.selectedLanguages);
    console.log(req.query.numberPages);

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

    if(req.query.numberPages !== '3000')
      params.append('fq', `pagesNumber:[0 TO ${req.query.numberPages}]`);

    if(req.query.selectedLanguages !== undefined) {
      req.query.selectedLanguages.forEach((language) => {
        let object = JSON.parse(language);
        console.log(object.value);
        params.append('fq', `language:${object.value}`);
      })
    }

  if(req.query.selectedGenres !== undefined) {
    req.query.selectedGenres.forEach((genre) => {
      let object = JSON.parse(genre);
      console.log(object.value);
      params.append('fq', `genres:${object.value}`);
    })
  }

    console.log(req.query.selectedGenres);

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

async function getFilters(req, res) {
  const field = req.query.field;

  const params = {
    "q": "*:*",
    "indent": "true",
    "q.op": "OR",
    "facet": "true",
    "facet.field": field
  };

  solr.get('/select', {params: params})
    .then(function (resp) {
      let solrResp;
      if (field === "language") solrResp = resp.data.facet_counts.facet_fields.language;
      else if(field === "genres") solrResp = resp.data.facet_counts.facet_fields.genres;
      const filter = [];

      for (let i = 0; i < solrResp.length; i += 2) {
        filter.push({
          label: solrResp[i] + '(' + solrResp[i+1] + ')',
          value: solrResp[i]
        });
      }

      return res.status(200).send(filter);
    })
    .catch((error) => {
      console.log(error);
      return res.status(400).json('Something went wrong!');
    })
}

async function getAuthors(req, res) {

  const params = {
    "q": "*:*",
    "indent": "true",
    "q.op": "OR",
    "facet": "true",
    "facet.field": "author"
  };

  solr.get('/select', {params: params})
    .then(function (resp) {

      let solrResp = resp.data.facet_counts.facet_fields.author;

      const authors = [];

      for (let i = 0; i < solrResp.length; i += 2) {
        authors.push({
          name: solrResp[i],
          numberOfBooks: solrResp[i+1]
        });
      }

      return res.status(200).send(authors);
    })
    .catch((error) => {
      console.log(error);
      return res.status(400).json('Something went wrong!');
    })
}


module.exports = {
    test,
    search,
    getBook,
    getFilters,
    getAuthors,
};
