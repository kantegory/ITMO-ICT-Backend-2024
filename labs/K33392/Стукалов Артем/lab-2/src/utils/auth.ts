import crypto from 'crypto'

const HASH_PARAMS = [1000, 64, 'sha512'] as const
export function hashPassword(password: string): {
  hash: string
  salt: string
} {
  const salt = crypto.randomBytes(16).toString('hex')
  const hash = crypto.pbkdf2Sync(password, salt, ...HASH_PARAMS).toString('hex')

  return { hash, salt }
}

export function verifyPassword({
  password,
  salt,
  hash,
}: {
  password: string
  salt: string
  hash: string
}): boolean {
  const candidateHash = crypto
    .pbkdf2Sync(password, salt, ...HASH_PARAMS)
    .toString('hex')

  return candidateHash === hash
}
