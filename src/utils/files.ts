import {readFileSync} from 'fs'

export function readFileAsJson<T>(FILE: string): T {
  return JSON.parse(readFileSync(FILE, 'utf-8')) as T
}
