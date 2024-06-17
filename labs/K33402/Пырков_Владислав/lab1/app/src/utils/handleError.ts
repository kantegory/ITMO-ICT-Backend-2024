import { Response } from 'express'

type HandlerType = {
	res: Response
	code?: number
	error?: any
	text?: string
}

function handleError({
	res,
	code = 400,
	error,
	text = 'Неопознанная ошибка',
}: HandlerType) {
	console.error(error, text)
	if (error instanceof Error) {
		return res.status(code).json({ error: error.message })
	} else {
		return res.status(code).json({ error: text })
	}
}

export default handleError
