import { IFileInjector } from "../../../ejs/templateWriter/iFileInjector"

export const appendAtEndOfImports: IFileInjector = (template: string[], detination: string[]) => {
  const result = [...detination]
  let inserIndex = 0

  result.forEach((line, idx) => {
    if (/import/g.test(line))
      inserIndex = idx
  })

  if (inserIndex - 1 === result.length)
    result.push(...template)
  else
    result.splice(inserIndex + 1, 0, ...template)

  return result
}