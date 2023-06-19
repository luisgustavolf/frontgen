export function addAtEndOfImports(fileStr: string, strToInsert: string) {
  const lines = fileStr.split('\n')
  let inserIndex = 0

  lines.forEach((line, idx) => {
    if (/import/g.test(line))
      inserIndex = idx
  })

  if (inserIndex - 1 === lines.length)
    lines.push(strToInsert)
  else
    lines.splice(inserIndex + 1, 0, strToInsert)

  return lines.join('\n')
}