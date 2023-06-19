import { Data, Options, renderFile } from "ejs";

export async function readTemplate(path: string, data: Data, opts: Options) {
  return new Promise<string>((resolve, reject) => {
    renderFile(path, data, opts, (err, str) => {
      if (err)
        reject(err)
      else  
        resolve(str)
    })
  })
}