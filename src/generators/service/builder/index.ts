import { pascalCase } from "change-case";
import { writeTemplate } from "../../../lib/ejs/fileWriter";
import { IIndexData } from "../templates/index.data";
import { IBuilderProps } from "./iBuilderProps";

export async function serviceBuilder(props: IBuilderProps) {
  const baseDir = getBaseDir(props.restResourcePath)
  const baseName = getBaseName(props.restResourcePath)
  const rootDir = props.rootDir || process.cwd()
  
  await writeTemplate<IIndexData>({
    destinationFile: `${rootDir}${baseDir}/index.ts`,
    tempateFile: `${__dirname}/../templates/index.ejs`,
    templateData: {
      baseName: baseName,
      restResourcePath: props.restResourcePath
    }
  })
}

function getBaseDir(restResourcePath: string) {
  const parts = restResourcePath.split('/')
  const validParts = parts.filter((part) => part && !part.includes(':'))
  const finalPath = validParts.join('/') 
  return `/services/caju/${finalPath}`
}

function getBaseName(restResourcePath: string) {
  const parts = restResourcePath.split('/')
  const validParts = parts.filter((part) => part && !part.includes(':'))
  const validSenense = validParts.join(' ')
  return pascalCase(validSenense) 
}