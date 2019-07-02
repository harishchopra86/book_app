const BookService = require('../services/BookService');
const Util = require('../utilities/Utils');

const util = new Util();

class BookController {

    static async getAllBooks(req, res) {
        try {
            const allBooks = await BookService.getAllBooks();
            if (allBooks.length > 0) {
                util.setSuccess(200,'Books retrieved', allBooks);
            } else {
                util.setSuccess(200,'No Books found');
            }
            util.send(res);
        } catch (error) {
            util.setError(400, error);
            util.send(res);
        }
    }

    static async addBook(req, res) {
        if (!req.body.title || !req.body.price || !req.body.description ) {
            util.setError(400, 'Please provide book title, price and description')
            return util.send(res)
        }

        const newBook = req.body;
        try {
            const createdBook = await BookService.addBook(newBook);
            util.setSuccess(201, "Book Added", createdBook)
            util.send(res);

        } catch (error) {
            util.setError(400, error);
            util.send(res);
        }
    }

    static async getABook(req, res) {
        const id = Number(req.params.id);
        if (!id) {
            util.setError(400, 'Please input a valid number');
            return util.send(res);
        }

        try {
            const book = await BookService.getABook(id)
            if (!book) {
                util.setError(404, 'Cannot find book with id ' + id);
            } else {
                util.setSuccess(200, 'Book found', book);
            }
            return util.send(res);
        } catch (error) {
            util.setError(404, error);
            return util.send(res);
        }
    }

    static async updateBook(req, res) {
        const newBook = req.body;
        const id = Number(req.params.id);
        if (!id) {
            util.setError(400, 'Please input a valid number');
            return util.send(res);
        }

        try {
            const updatedBook = await BookService.updateBook(id, newBook)
            if (updatedBook) {
                util.setSuccess(200, 'Book Updated', updatedBook);
            } else {
                util.setError(404, 'Book not found with id ' + id);
            }
            return util.send(res);
        } catch (error) {
            util.setError(404, error);
            return util.send(res);
        }
    }

    static async deleteBook(req, res) {
        const id = Number(req.params.id);
        if (!id) {
            util.setError(400, 'Please input a valid number');
            return util.send(res);
        }

        try {
            const deletedBook = await BookService.deleteBook(id)
            if (deletedBook) {
                util.setSuccess(200, 'Book deleted', deletedBook)
            } else {
                util.setError(404, 'Book not found with id ' + id);
            }
            return util.send(res);
        } catch (error) {
            util.setError(400, error);
            return util.send(res);
        }


    }
}

module.exports = BookController;