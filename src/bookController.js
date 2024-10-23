const { nanoid } = require('nanoid');

let books = [];

const createBook = (request, h) => {
    const { name, year, author, summary, publisher, pageCount, readPage, reading } = request.payload;

    if (!name) {
        return h.response({
            status: 'fail',
            message: 'Gagal menambah buku. Mohon isi nama buku',
        }).code(400);
    }

    if (readPage > pageCount) {
        return h.response({
            status: 'fail',
            message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
        }).code(400);
    }

    const id = nanoid();
    const newBook = {
        id,
        name,
        year,
        author,
        summary,
        publisher,
        pageCount,
        readPage,
        finished: pageCount === readPage,
        reading,
        insertedAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    };

    books.push(newBook);

    return h.response({
        status: 'success',
        message: 'Buku berhasil ditambahkan',
        data: {
            bookId: id,
        },
    }).code(201);
};

const getAllBooks = (request, h) => {
    return h.response({
        status: "success",
        data: {
            books: allBooks,
        },
    }).code(200);
};

const allBooks = [
    {
        id: "4j21vYIP22jF6s7MvbIpb",
        name: "New Book",
        publisher: "Publisher Name"
    },
    {
        id: "1L7ZtDUFeGs7VlEt",
        name: "Buku B",
        publisher: "Dicoding Indonesia"
    },
    {
        id: "K8DZbfI-t3LrY7lD",
        name: "Buku C",
        publisher: "Dicoding Indonesia"
    }
];

const getById = (request, h) => {
    const { bookId } = request.params;
    const book = books.find(b => b.id === bookId);

    if (!book) {
        return h.response({
            status: "fail",
            message: "Buku tidak ditemukan",
        }).code(404);
    }

    return h.response({
        status: "success",
        data: {
            book: book,
        },
    }).code(200);
};

const updateById = (request, h) => {
    const { bookId } = request.params;
    const { name, year, author, summary, publisher, pageCount, readPage, reading } = request.payload;

    if (!name) {
        return h.response({
            status: "fail",
            message: "Gagal memperbarui buku. Mohon isi nama buku",
        }).code(400);
    }

    if (readPage > pageCount) {
        return h.response({
            status: "fail",
            message: "Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount",
        }).code(400);
    }

    const index = books.findIndex(b => b.id === bookId);
    
    if (index === -1) {
        return h.response({
            status: "fail",
            message: "Gagal memperbarui buku. Id tidak ditemukan",
        }).code(404);
    }

    books[index] = {
        ...books[index],
        name,
        year,
        author,
        summary,
        publisher,
        pageCount,
        readPage,
        reading,
        updatedAt: new Date().toISOString(),
    };

    return h.response({
        status: "success",
        message: "Buku berhasil diperbarui",
    }).code(200);
};

const deleteById = (request, h) => {
    const { bookId } = request.params;
    const index = books.findIndex(b => b.id === bookId);

    if (index === -1) {
        return h.response({
            status: "fail",
            message: "Buku gagal dihapus. Id tidak ditemukan",
        }).code(404);
    }

    books.splice(index, 1);

    return h.response({
        status: "success",
        message: "Buku berhasil dihapus",
    }).code(200);
};

module.exports = {
    createBook,
    getAllBooks,
    getById,
    updateById,
    deleteById,
};
