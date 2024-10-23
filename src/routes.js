const bookController = require('./bookController');

const routes = [
    // POST - create a new book 
    {
        method: 'POST',
        path: '/books',
        handler: bookController.createBook,
    },

    // GET - get all books
    {
        method: 'GET',
        path: '/books',
        handler: bookController.getAllBooks,
    },

    // GET - get a specific book by ID 
    {
        method: 'GET',
        path: '/books/{bookId}',
        handler: bookController.getById,
    },

    // PUT - update book by ID
    {
        method: 'PUT',
        path: '/books/{bookId}',
        handler: bookController.updateById,
    },

    // DELETE - delete book by ID
    {
        method: 'DELETE',
        path: '/books/{bookId}',
        handler: bookController.deleteById,
    }
];

module.exports = routes;
