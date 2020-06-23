import Book from '../models/book'
import IBook from '../types/IBook'

export const list = async (): Promise<IBook[]> => {
	return Book.find()
}

export const get = async (id: string): Promise<IBook> => {
	const record: IBook = await Book.findById(id)

	if (record) {
		return record
	}

	throw new Error('No record found')
}
