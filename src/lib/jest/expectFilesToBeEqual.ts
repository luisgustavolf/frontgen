import { readFileSync } from "fs"

export function expectFilesToBeEqual(source: string, target: string) {
  const generated = readFileSync(source)
  const mock = readFileSync(target)
  expect(generated.toString()).toEqual(mock.toString())
}