import { Data, renderFile } from "ejs";
import { IWriteFileProps } from "./iWriteFileProps";
import { existsSync, mkdirSync, writeFile, writeFileSync } from "fs";
import { dirname } from "path";

export async function writeTemplate<TData extends Data>(props: IWriteFileProps<TData>) {
  return new Promise<void>((resolve, reject) => {
    renderFile(props.tempateFile, props.templateData, (err, str) => {
      if (err) reject(err)
      const dir = dirname(props.destinationFile)
      
      if (!existsSync(dir))
        mkdirSync(dir, { recursive: true })

      writeFileSync(props.destinationFile, str)
      resolve()
    })
  })
}