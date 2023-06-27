import { IFileInjector } from "../../../ejs/templateWriter/iFileInjector"

export const appendAtEndOfServiceClass: IFileInjector = (template: string[], destination: string[]) => {
  const result = [...destination]
  const bracketsStack = []

  const serviceClassIndex = result.findIndex((line) => /class.*Service/g.test(line))
  
  if (serviceClassIndex === -1)
    throw new Error('Service class not found')

  for (let i = serviceClassIndex + 1; i < result.length; i++) {
    const line = result[i];
    
    if (line.includes('{')) {
      bracketsStack.push(i)
      continue
    }
    
    if (line.includes('}')) {
      if (bracketsStack.length) {
        bracketsStack.pop()
        continue
      } else {
        result.splice(i, 0, ...['', ...template])
        break
      }
    }
  }

  return result
}
