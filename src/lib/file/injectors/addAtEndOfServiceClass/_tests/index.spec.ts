import { readFileSync } from "fs"
import { addAtEndOfServiceClass } from ".."

describe('addAtEndOfServiceClass', () => {
  it('shoud brake if no service class was found', () => {
    const toInject = '\n  static async newFoo() {}'
    const baseFileContent = readFileSync(`${__dirname}/mocks/noServiceClass.ts`).toString()
    
    expect(() => {
      addAtEndOfServiceClass(baseFileContent, toInject)
    }).toThrow('Service class not found')      
  }) 
  
  it('should injects at class end', () => {
    const toInject = '\n  static async newFoo() {}'
    const baseFileContent = readFileSync(`${__dirname}/mocks/simpleService-base.ts`).toString()
    const expectFileContent = readFileSync(`${__dirname}/mocks/simpleService-expect.ts`).toString()
    const result = addAtEndOfServiceClass(baseFileContent, toInject)
    expect(result).toBe(expectFileContent)
  })
})