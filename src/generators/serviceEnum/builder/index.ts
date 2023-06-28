import { templateWriter } from "../../../lib/ejs/templateWriter";
import { appendAtEndOfFile } from "../../../lib/file/injectors/appendAtEndOfFile";
import { IBaseBuilderProps } from "./iServiceBuilder";
import { RenderContext } from "./renderContext";

export async function baseBuilder(props: IBaseBuilderProps) {
  const context = new RenderContext({})

  await templateWriter({
    template: {
      file: `${__dirname}/templates/index.ejs`,
      context
    },
    destination: {
      dir: '/some/dir',
      fileName: 'index.ts'
    },
    injector: appendAtEndOfFile
  })
}