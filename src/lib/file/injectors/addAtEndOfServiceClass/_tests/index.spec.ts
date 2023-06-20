import { readFileSync } from "fs"
import { addAtEndOfServiceClass } from ".."

describe('addAtEndOfServiceClass', () => {
  it('shoud brake if no service class was found', () => {
    const toInject = '  static async newFoo() {}'
    const baseFileContent = readFileSync(`${__dirname}/snapshots/noServiceClass.ts`).toString()
    
    expect(() => {
      addAtEndOfServiceClass(baseFileContent, toInject)
    }).toThrow('Service class not found')      
  }) 
  
  it('should injects at class end', () => {
    const toInject = '  static async newFoo() {}'
    const baseFileContent = readFileSync(`${__dirname}/snapshots/simpleService-base.ts`).toString()
    const expectFileContent = readFileSync(`${__dirname}/snapshots/simpleService-expect.ts`).toString()
    const result = addAtEndOfServiceClass(baseFileContent, toInject)
    expect(result).toBe(expectFileContent)
  })
})