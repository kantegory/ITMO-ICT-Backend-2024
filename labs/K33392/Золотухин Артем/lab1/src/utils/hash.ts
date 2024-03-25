import crypto from 'crypto'

export const hashPassword = async (password: string) => {
  const salt = crypto.randomBytes(16).toString('hex')

  const hash = crypto
    .pbkdf2Sync(password, salt, 1000, 64, 'sha512')
    .toString('hex')

  return { hash, salt }
}

export const verifyPassword = async ({
  candidatePassword,
  salt,
  hash,
}: VerifyPasswordProps) => {
  const candidateHash = crypto
    .pbkdf2Sync(candidatePassword, salt, 1000, 64, 'sha512')
    .toString('hex')

  return candidateHash === hash
}

type VerifyPasswordProps = {
  candidatePassword: string
  salt: string
  hash: string
}
