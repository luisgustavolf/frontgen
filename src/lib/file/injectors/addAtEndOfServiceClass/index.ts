export function addAtEndOfServiceClass(fileStr: string, strToInsert: string) {
  const lines = fileStr.split('\n')
  const bracketsStack = []

  const serviceClassIndex = lines.findIndex((line) => /class.*Service/g.test(line))
  
  if (serviceClassIndex === -1)
    throw new Error('Service class not found')

  for (let i = serviceClassIndex + 1; i < lines.length; i++) {
    const line = lines[i];
    
    if (line.includes('{')) {
      bracketsStack.push(i)
      continue
    }
    
    if (line.includes('}')) {
      if (bracketsStack.length) {
        bracketsStack.pop()
        continue
      } else {
        lines.splice(i, 0, '\n' + strToInsert)
        break
      }
    }
  }

  return lines.join('\n')
}
