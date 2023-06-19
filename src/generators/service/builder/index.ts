import { existsSync } from "fs";
import { writeTemplate } from "../../../lib/ejs/fileWriter";
import { IBuilderProps } from "./iBuilderProps";
import { getBaseDir } from "./helpers";
import { RenderContext } from "./renderContext";

export async function serviceBuilder(props: IBuilderProps) {
  const baseDir = getBaseDir(props.vendor, props.restResource)
  const rootDir = props.rootDir || process.cwd()
  const destinationFile = `${rootDir}${baseDir}/index.ts`

  if (existsSync(destinationFile)) {
    await injectIntoExistentServiceFile(props)
  } else {
    await createNewServiceFile(props)
  }
}

async function createNewServiceFile(props: IBuilderProps) {
  const baseDir = getBaseDir(props.vendor, props.restResource)
  const rootDir = props.rootDir || process.cwd()
  const destinationFile = `${rootDir}${baseDir}/index.ts`
  const context = new RenderContext(props)

  await writeTemplate({
    destinationFile,
    tempateFile: `${__dirname}/../templates/index.ejs`,
    templateContext: context
  })
}

async function injectIntoExistentServiceFile(props: IBuilderProps) {
  const baseDir = getBaseDir(props.vendor, props.restResource)
  const rootDir = props.rootDir || process.cwd()
  const destinationFile = `${rootDir}${baseDir}/index.ts`


}

