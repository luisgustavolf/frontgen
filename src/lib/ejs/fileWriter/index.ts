import { Data, renderFile } from "ejs";
import { IWriteFileProps } from "./iWriteFileProps";
import { existsSync, mkdirSync, writeFile, writeFileSync } from "fs";
import { dirname } from "path";
import { pascalCase } from "change-case";

export async function writeTemplate<TData extends Data>(props: IWriteFileProps<TData>, context?: any) {
  return new Promise<void>((resolve, reject) => {
    renderFile(props.tempateFile, props.templateData, { context }, (err, str) => {
      if (err) reject(err)
      const dir = dirname(props.destinationFile)
      
      if (!existsSync(dir))
        mkdirSync(dir, { recursive: true })

      writeFileSync(props.destinationFile, str)
      resolve()
    })
  })
}