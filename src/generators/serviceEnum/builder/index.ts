import { templateWriter } from "../../../lib/ejs/templateWriter";
import { appendAtEndOfFile } from "../../../lib/file/injectors/appendAtEndOfFile";
import { IBaseBuilderProps } from "./iServiceBuilder";
import { RenderContext } from "./context";

export async function serviceEnumBuilder(props: IBaseBuilderProps) {
  const context = new RenderContext({
    vendor: props.vendor,
    title: props.title,
    key: props.key
  })

  await templateWriter({
    template: {
      file: `${__dirname}/templates/index.ejs`,
      context
    },
    destination: {
      dir: context.getDir(),
      fileName: context.getFileName(),
      breakIfExists: true
    },
    injector: appendAtEndOfFile
  })
}