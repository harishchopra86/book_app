const database = require('../src/models');

class BookService {
    static async getAllBooks() {
        try {
            return await database.Book.findAll({order:[['id','ASC']]});
        } catch (error) {
            throw error;
        }
    }

    static async addBook(book) {
        try {
            return await database.Book.create(book);
        } catch (error) {
            throw error;
        }
    }

    static async getABook(id) {
        try {
          const theBook = await database.Book.findOne({
            where: { id: Number(id) }
          });
          return theBook;
        } catch (error) {
          throw error;
        }
      }

    static async updateBook(id, updateBook) {
        try {
            const bookToUpdate = await BookService.getABook(id);
            if (bookToUpdate) {
                await database.Book.update(updateBook, {where: 
                    {id: Number(id)}})
                    return updateBook;
            }
            return null;
        } catch (error) {
            throw error;
        }
    }

    static async deleteBook(id) {
        try {
            const bookToDelete = await BookService.getABook(id);
            if (bookToDelete) {
                const deletedBook = await database.Book.destroy({
                    where: {id: Number(id)}
                })
                return deletedBook
            }
            return null;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = BookService;
