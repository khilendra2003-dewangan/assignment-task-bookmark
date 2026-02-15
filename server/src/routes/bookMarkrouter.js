import express from 'express'


import { BookMarkController, DeleteBookMark, GetBookMark, UpdateBookMark } from '../controllers/BookMarkController.js';
import { protect } from '../middlewares/auth.js';

const bookmarkRouter = express.Router();


bookmarkRouter.post("/create", protect, BookMarkController);
bookmarkRouter.get("/getBookmark", protect, GetBookMark);
bookmarkRouter.delete("/deletebookmark/:id", protect, DeleteBookMark);
bookmarkRouter.put("/updatebookmark/:id", protect, UpdateBookMark);
export default bookmarkRouter;