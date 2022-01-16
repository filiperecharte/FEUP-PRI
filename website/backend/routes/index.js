const express = require('express');
const router = express.Router();
const controller = require('../controllers/index');

router.get('/search', controller.search);
router.get('/book:id', controller.getBook);
router.get('/filters', controller.getFilters);
router.get('/author', controller.getAuthor);

module.exports = router;
