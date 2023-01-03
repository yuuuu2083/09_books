import express from "express";
import {body, validationResult} from  "express-validator";
import Book from "../models/book.mjs";

const router = express.Router();

// /api/books
router.get('/', async (req, res) => {
    const books = await Book.find().sort({updateAt: -1});
    res.json(books);
});

router.get('/:id', async (req, res) => {
    const _id = req.params.id;
    const books = await Book.findById(_id);
    res.json(books);
});

router.delete('/:id', async (req, res) => {
    const _id = req.params.id;
    await Book.deleteOne({_id: _id});
    res.json({"msg": "Delete succeeded..."});
});



router.post('/', body('title').notEmpty())
router.post('/', async (req, res) => {
    const error = validationResult(req);
    if(!error.isEmpty()) {
        const err = error.array();
        return res.status(400).json(err);
    }
    const book = new Book(req.body);
    const newBook = await book.save();
    res.json(newBook);
});

router.patch('/:id', async (req, res) => {
    const {title, description, comment, rating} = req.body;
    const _id = req.params.id;
    const book = await Book.findById(_id);
    if(title !== undefined) {
        book.title = title;
    }
    if(description !== undefined) {
        book.description = description;
    }
    if(comment !== undefined) {
        book.comment = comment;
    }
    if(rating !== undefined) {
        book.rating = rating;
    }
    await book.save();
    res.json(book);
});

export default router;























// import express from 'express';
// import { body } from 'express-validator';
// import { requestErrorHandler } from "../helpers/helper.mjs";
// import { getBookById, getAllBooks, deleteBook, registBook, updateBook } from '../controllers/books.mjs';

// const router = express.Router();

// router.get('/', requestErrorHandler(getAllBooks));

// router.get('/:id', requestErrorHandler(getBookById));

// router.post(
//     '/', 
//     body('title').notEmpty(), 
//     body('description').notEmpty(), 
//     body('comment').notEmpty(), 
//     body('rating').notEmpty().isInt({ min: 1, max: 5 }), 
//     requestErrorHandler(registBook)
// );

// // validator.js
// // https://github.com/validatorjs/validator.js
// router.patch(
//     '/:id', 
//     body('title').optional().notEmpty(), 
//     body('description').optional().notEmpty(), 
//     body('comment').optional().notEmpty(), 
//     body('rating').optional().notEmpty().isInt({ min: 1,max: 5 }), 
//     requestErrorHandler(updateBook)
// );

// router.delete('/:id', requestErrorHandler(deleteBook));

// export default router;




