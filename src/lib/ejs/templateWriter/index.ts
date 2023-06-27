import { Data, renderFile } from "ejs";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "fs";
import { join, normalize } from "path";
import { format } from "prettier";
import { ITemplateWriter } from "./iWriteFileProps";
import { cwd } from "process";
import { outputDir } from "../../jest/utils";
import { IFileInjector } from "./iFileInjector";

export async function templateWriter<TData extends Data, TContext>(props: ITemplateWriter<TData, TContext>) {
  return new Promise<void>((resolve, reject) => {
    const { template, destination } = props
    const dir = normalize(getRootDir() + '/' + destination.dir)
    const file = join(dir, destination.fileName)

    if (destination.breakIfExists && existsSync(file))
      throw new Error('Render marcado como impetido de sobrescrita')

    renderFile(template.file, template.data || {}, { context: template.context }, (err, str) => {
      if (err) reject(err)

      if (!existsSync(dir))
        mkdirSync(dir, { recursive: true })

      const finalContent = getFileResult(str, file, props.injector)

      const formattedStr = format(finalContent, { parser: 'typescript', singleQuote: true, semi: false, printWidth: 120 })
      writeFileSync(file, formattedStr)
      
      if (process.env.NODE_ENV !== 'test')
        console.log(`✔️ ${file}`)
      
      resolve()
    })
  })
}

export function getFileResult(templateContent: string, destinationFile: string, injectorFn: IFileInjector) {
  const templateContentLines = templateContent.split('\n')
  let destinationLines: string[] = []

  if (existsSync(destinationFile)) {
    destinationLines = readFileSync(destinationFile).toString().split('\n')
  }

  const injectorResult = injectorFn(templateContentLines, destinationLines)
  return injectorResult.join('\n')
}


export function getRootDir() {
  if (process.env.NODE_ENV === 'test')
    return outputDir
  else
    return cwd()
}