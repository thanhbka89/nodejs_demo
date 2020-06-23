import mongoose from 'mongoose'

import IBook from '../types/IBook'

export const BookSchema = new mongoose.Schema({
	title: { type: String, required: true },
	author: { type: String, required: true },
})

const Book = mongoose.model<IBook>('Book', BookSchema)

export default Book
