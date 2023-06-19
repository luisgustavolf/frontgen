import { Data, renderFile } from "ejs";
import { existsSync, mkdirSync, writeFileSync } from "fs";
import { dirname } from "path";
import { IWriteFileProps } from "./iWriteFileProps";
import { format } from "prettier";

export async function writeTemplate<TData extends Data, TContext>(props: IWriteFileProps<TData, TContext>) {
  return new Promise<void>((resolve, reject) => {
    renderFile(props.tempateFile, props.templateData || {}, { context: props.templateContext }, (err, str) => {
      if (err) reject(err)
      const dir = dirname(props.destinationFile)
      
      if (!existsSync(dir))
        mkdirSync(dir, { recursive: true })

      const formattedStr = format(str, { parser: 'typescript', singleQuote: true, semi: false, printWidth: 120 })
      writeFileSync(props.destinationFile, formattedStr)
      resolve()
    })
  })
}