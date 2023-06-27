import { IFileInjector } from "../../../ejs/templateWriter/iFileInjector";

export const appendAtEndOfFile: IFileInjector = (template: string[], destination: string[]) =>  {
  const result: string[] = [...destination]
  const toInject = [...template]

  if (result.length)
    result.push('')

  result.splice(result.length - 1, 0, ...toInject)
  return result
}