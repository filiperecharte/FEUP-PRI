const express = require('express');
const router = express.Router();
const controller = require('../controllers/index');

router.get('/', controller.test);
router.get('/search', controller.search);
router.get('/book:id', controller.getBook);
router.get('/filters', controller.getFilters);
router.get('/authors', controller.getAuthors);

module.exports = router;
