import { existsSync } from "fs";
import { writeTemplate } from "../../../lib/ejs/fileWriter";
import { IIndexData } from "../templates/index.data";
import { IBuilderProps } from "./iBuilderProps";
import { getBaseDir, getBaseName } from "./helpers";

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
  const baseName = getBaseName(props.restResource)
  const rootDir = props.rootDir || process.cwd()
  const destinationFile = `${rootDir}${baseDir}/index.ts`
  
  await writeTemplate<IIndexData>({
    destinationFile,
    tempateFile: `${__dirname}/../templates/index.ejs`,
    templateData: {
      baseName: baseName,
      restResource: props.restResource,
      restResourceAction: props.restResourceAction
    }
  })
}

async function injectIntoExistentServiceFile(props: IBuilderProps) {
  const baseDir = getBaseDir(props.vendor, props.restResource)
  const rootDir = props.rootDir || process.cwd()
  const destinationFile = `${rootDir}${baseDir}/index.ts`

  
}

