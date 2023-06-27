import { Data, renderFile } from "ejs";
import { existsSync, mkdirSync, writeFileSync } from "fs";
import { join, normalize } from "path";
import { format } from "prettier";
import { IWriteFileProps } from "./iWriteFileProps";
import { cwd } from "process";
import { outputDir } from "../../jest/utils";

export async function writeTemplate<TData extends Data, TContext>(props: IWriteFileProps<TData, TContext>) {
  return new Promise<void>((resolve, reject) => {
    const { template, destination } = props
    const dir = normalize(getRootDir() + '/' +  destination.dir)
    const file = join(dir, destination.fileName)
  
    if (destination.breakIfExists && existsSync(file))
      throw new Error('Render marcado como impetido de sobrescrita')

    renderFile(template.file, template.data || {}, { context: template.context }, (err, str) => {
      if (err) reject(err)
      
      if (!existsSync(dir))
        mkdirSync(dir, { recursive: true })

      const formattedStr = format(str, { parser: 'typescript', singleQuote: true, semi: false, printWidth: 120 })
      writeFileSync(file, formattedStr)
      resolve()
    })
  })
}

export function getRootDir() {
  if (process.env.NODE_ENV === 'test')
    return outputDir
  else
    return cwd()
}