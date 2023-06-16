import { Data, renderFile } from "ejs";
import { IWriteFileProps } from "./iWriteFileProps";
import { writeFile } from "fs";

export async function writeTemplate<TData extends Data>(props: IWriteFileProps<TData>) {
  return new Promise<void>((resolve, reject) => {
    renderFile(props.destinationFile, props.templateData, (err, str) => {
      if (err) reject(err)
      writeFile(props.destinationFile, str, (err) => {
        if (err) reject(err)
        resolve()
      })
    })
  })
}