const express = require('express');
const BookController = require('../controllers/BookController');
const router = express.Router();

router.get('/', BookController.getAllBooks);
router.post('/', BookController.addBook)
router.get('/:id', BookController.getABook);
router.put('/:id', BookController.updateBook);
router.delete('/:id', BookController.deleteBook);

module.exports = router;