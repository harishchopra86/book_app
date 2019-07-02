const chai = require('chai');
const chaiHttp = require('chai-http');
require('chai/register-should'); 
const app = require('../index')

chai.use(chaiHttp);

const { expect } = require('chai');

describe('Testing book endpoints:', () => {
    it('It should create a book', (done) => {
        const book = {
            title: 'My first book',
            price: '1.55',
            description: 'This is my first book description'
        };

        chai.request(app)
        .post('/books')
        .set('Accept', 'application/json')
        .send(book)
        .end((err, res) => {
            expect(res.status).to.equal(201);
            expect(res.body.data).to.include({
                id:1,
                title: book.title,
                description: book.description
            });
            done();
        });
    });
    
    it('It should not create a book because of invalid parameters', (done) => {
        const book = {
            price: '1.55'
        };
        chai.request(app)
        .post('/books')
        .set('Accept', 'application/json')
        .send(book)
        .end((err, res) => {
            expect(res.status).to.equal(400);
            done();
        });
    });


    it('It should fetch book from database', (done) => {
        const bookID = 1
        chai.request(app)
        .get('/books/'+bookID)
        .set('Accept', 'application/json')
        .end((err, res) => {
            expect(res.status).to.equal(200);
            res.body.data.should.have.property('id');
            res.body.data.should.have.property('title');
            res.body.data.should.have.property('description');
            res.body.data.should.have.property('price');
            done();
        });
    })

    it('It should not fetch book from database with invalid id', (done) => {
        const bookID = 10
        chai.request(app)
        .get('/books/'+bookID)
        .set('Accept', 'application/json')
        .end((err, res) => {
            expect(res.status).to.equal(404);
            console.log(res.body)
            res.body.should.have.property('message').equal('Cannot find book with id ' + bookID);
            done();
        });
    })

    it('It should not fetch book from database with non-numeric id', (done) => {
        const bookID = 'abcd'
        chai.request(app)
        .get('/books/'+bookID)
        .set('Accept', 'application/json')
        .end((err, res) => {
            expect(res.status).to.equal(400);
            console.log(res.body)
            res.body.should.have.property('message').equal('Please input a valid number');
            done();
        });
    })

    it('It should update a book', (done) => {
        const bookID = 1;
        const updatedBook = {
            id: bookID,
            price: 15,
            title: 'My updated book',
            description: 'This is my updated book'
        }

        chai.request(app)
        .put('/books/' + bookID)
        .set('Accept', 'application/json')
        .send(updatedBook)
        .end((err, res) => {
            expect(res.status).to.equal(200);
            expect(res.body.data.id).equal(updatedBook.id);
            expect(res.body.data.price).equal(updatedBook.price);
            expect(res.body.data.title).equal(updatedBook.title);
            expect(res.body.data.description).equal(updatedBook.description);
            done();
        });
    });

    it('It should not update a book with invalid id', (done) => {
        const bookID = 10;
        const updatedBook = {
            id: bookID,
            price: 15,
            title: 'My updated book',
            description: 'This is my updated book'
        }

        chai.request(app)
        .put('/books/' + bookID)
        .set('Accept', 'application/json')
        .send(updatedBook)
        .end((err, res) => {
            expect(res.status).to.equal(404);
            res.body.should.have.property('message').equal('Book not found with id ' + bookID)
            done();
        });
    });

    it('It should not update a book with non-number id', (done) => {
        const bookID = 'bookId';
        const updatedBook = {
            id: bookID,
            price: 15,
            title: 'My updated book',
            description: 'This is my updated book'
        }

        chai.request(app)
        .put('/books/' + bookID)
        .set('Accept', 'application/json')
        .send(updatedBook)
        .end((err, res) => {
            expect(res.status).to.equal(400);
            res.body.should.have.property('message').equal('Please input a valid number')
            done();
        });
    });

    it('it should delete a book', (done) => {
        const bookID = 1;

        chai.request(app)
        .delete('/books/' + bookID)
        .set('Accept', 'application/json')
        .end((err, res) => {
            expect(res.status).to.equal(200);
            done();
        });
    })

    it('it should not delete a book with invalid id', (done) => {
        const bookID = 10;

        chai.request(app)
        .delete('/books/' + bookID)
        .set('Accept', 'application/json')
        .end((err, res) => {
            expect(res.status).to.equal(404);
            expect(res.body.message).to.equal('Book not found with id ' + bookID)
            done();
        });
    })

    it('it should not delete a book with non-numeric id', (done) => {
        const bookID = 'bookID';

        chai.request(app)
        .delete('/books/' + bookID)
        .set('Accept', 'application/json')
        .end((err, res) => {
            expect(res.status).to.equal(400);
            expect(res.body.message).to.equal('Please input a valid number')
            done();
        });
    })
})