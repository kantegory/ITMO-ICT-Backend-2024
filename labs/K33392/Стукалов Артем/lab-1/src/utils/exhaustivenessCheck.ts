export function exhaustivenessCheck(_unused: never): never {
  throw new Error('Exhaustivness failure! This should never happen.')
}
