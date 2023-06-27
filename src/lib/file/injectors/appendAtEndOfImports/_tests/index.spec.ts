import { readFileSync } from "fs"
import { appendAtEndOfImports } from ".."

describe('appendAtEndOfImports', () => {
  it('should injects at end of imports', () => {
    const toInject = "import NewDTO from './newDTO'"
    const baseFileContent = readFileSync(`${__dirname}/snapshots/simpleService-base.ts`).toString()
    const result = appendAtEndOfImports(toInject.split('\n'), baseFileContent.split('\n'))
    const finalContent = result.join('\n')
    
    const expectFileContent = readFileSync(`${__dirname}/snapshots/simpleService-expect.ts`).toString()
    expect(finalContent).toBe(expectFileContent)
  })
})