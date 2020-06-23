import { Request, Response, NextFunction } from 'express'

/** Not found error handler */
export const notFound = (req: Request, res: Response) => {
	res
		.status(404)
		.json({ message: `${req.method} ${req.originalUrl} not found` })
}

/** catch async errors */
export const catchErrorsAsync = (fn: any) => {
	return async (req: Request, res: Response, next: NextFunction) => {
		try {
			await fn(req, res)
		} catch (err) {
			next(err)
		}
	}
}

/** default error handler */
export const logErrors = (
	err: any,
	req: Request,
	res: Response,
	next: NextFunction
) => {
	res.status(err.status || 500).json({ success: false, message: err.message })
}
