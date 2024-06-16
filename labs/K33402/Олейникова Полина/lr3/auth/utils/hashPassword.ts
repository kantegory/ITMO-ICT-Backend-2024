import bcryptjs from 'bcryptjs'

export default (password: string): string => bcryptjs.hashSync(password, bcryptjs.genSaltSync(8))