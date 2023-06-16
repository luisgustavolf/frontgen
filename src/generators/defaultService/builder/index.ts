import { pascalCase } from "change-case";
import { writeTemplate } from "../../../lib/ejs/fileWriter";
import { IIndexData } from "../templates/index.data";
import { IBuilderProps } from "./iBuilderProps";

export async function defaultServiceBuilder(props: IBuilderProps) {
  const baseDir = getBaseDir(props.restResourcePath)
  const baseName = getBaseName(props.restResourcePath)
  
  await writeTemplate<IIndexData>({
    destinationFile: `${baseDir}/index.ts`,
    tempateFile: './templates/index.ejs',
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
  return `${process.cwd()}/services/caju/${finalPath}`
}

function getBaseName(restResourcePath: string) {
  const parts = restResourcePath.split('/')
  const validParts = parts.filter((part) => part && !part.includes(':'))
  const validSenense = validParts.join(' ')
  return pascalCase(validSenense) 
}