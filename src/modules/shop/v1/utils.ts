import { randomBytes } from 'crypto'
import { ECategories } from './types'

export const createUIDWithPrefix = (prefix: string): string => {
  const token = randomBytes(10).toString('hex')
  return `${prefix}_${token}`
}

export const getEnumKeyByEnumValue = (
  myEnum: any,
  enumValue: number | string
): keyof ECategories => {
  const keys = Object.keys(myEnum).filter((x) => myEnum[x] == enumValue)
  const value: any = keys.length > 0 ? keys[0] : ''
  return value
}
