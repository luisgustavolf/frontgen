import { pascalCase } from "change-case";
import { writeTemplate } from "../../../lib/ejs/fileWriter";
import { IIndexData } from "../templates/index.data";
import { IBuilderProps } from "./iBuilderProps";

export async function serviceBuilder(props: IBuilderProps) {
  const baseDir = getBaseDir(props.vendor, props.restResource)
  const baseName = getBaseName(props.restResource)
  const rootDir = props.rootDir || process.cwd()
  
  await writeTemplate<IIndexData>({
    destinationFile: `${rootDir}${baseDir}/index.ts`,
    tempateFile: `${__dirname}/../templates/index.ejs`,
    templateData: {
      baseName: baseName,
      restResource: props.restResource,
      restResourceAction: props.restResourceAction
    }
  })
}

function getBaseDir(vendor: string, restResourcePath: string) {
  const parts = restResourcePath.split('/')
  const validParts = parts.filter((part) => part && !part.includes(':'))
  const finalPath = validParts.join('/') 
  return `/services/${vendor}/${finalPath}`
}

function getBaseName(restResourcePath: string) {
  const parts = restResourcePath.split('/')
  const validParts = parts.filter((part) => part && !part.includes(':'))
  const validSenense = validParts.join(' ')
  return pascalCase(validSenense) 
}