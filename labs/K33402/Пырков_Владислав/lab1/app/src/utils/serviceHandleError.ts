type HandlerType = {
	error?: any
	message: string
}

const serviceHandleError = ({ message, error }: HandlerType) => {
	console.error(`${message}: ${error}`)
	throw new Error(message)
}

export default serviceHandleError
