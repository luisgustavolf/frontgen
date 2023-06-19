import { readFileSync } from "fs"
import { addAtEndOfImports } from ".."

describe('addAtEndOfImports', () => {
  it('should injects at class end', () => {
    const toInject = "import NewDTO from './newDTO'"
    const baseFileContent = readFileSync(`${__dirname}/mocks/simpleService-base.ts`).toString()
    const expectFileContent = readFileSync(`${__dirname}/mocks/simpleService-expect.ts`).toString()
    const result = addAtEndOfImports(baseFileContent, toInject)
    expect(result).toBe(expectFileContent)
  })
})