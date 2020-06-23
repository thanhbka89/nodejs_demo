import { Request, Response } from 'express'

import Book from '../models/book'
import IBook from '../types/IBook'
import * as BookService from '../services/book.service'

export const allBooks = async (req: Request, res: Response) => {
	try {
		const items: IBook[] = await BookService.list()

		res.json(items)
	} catch (e) {
		res.status(404).send(e.message)
	}

	// res.send('Returns all Books')
}

export let getBook = async (req: Request, res: Response) => {
	// res.send('Returns one book')
	const item: IBook = await BookService.get(req.params.id)

	res.json(item)
}

export let deleteBook = (req: Request, res: Response) => {
	// res.send('Returns one book')

	Book.findByIdAndRemove(<String>req.params.id, (err: Error) =>
		res.send(err ? err : {})
	)
}

export let updateBook = (req: Request, res: Response) => {
	// res.send('Returns one book')

	Book.findByIdAndUpdate(
		<String>req.params.id,
		{ $set: req.body },
		(err: Error) => res.json(err ? err : {})
	)
}

export let addBook = (req: Request, res: Response) => {
	// res.send('Returns one book')

	const newBox = new Book(req.body)

	return newBox.save((err: Error, doc: IBook) => res.json(doc))
}
