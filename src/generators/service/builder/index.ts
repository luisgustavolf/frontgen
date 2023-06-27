import { existsSync, readFileSync, readSync, writeFileSync } from "fs";
import { writeTemplate } from "../../../lib/ejs/fileWriter";
import { IBuilderProps } from "./iBuilderProps";
import { getBaseDir } from "./helpers";
import { RenderContext } from "./renderContext";
import { readTemplate } from "../../../lib/ejs/fileReader";
import { addAtEndOfImports } from "../../../lib/file/injectors/addAtEndOfImports";
import { addAtEndOfServiceClass } from "../../../lib/file/injectors/addAtEndOfServiceClass";
import { format } from "prettier";

export async function generateService(props: IBuilderProps) {
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
  const context = new RenderContext({ 
    restResource: props.restResource,
    restResourceAction: props.restResourceAction
  })

  await writeTemplate({
    template: {
      file: `${__dirname}/templates/index.ejs`,
      context
    },
    destination: {
      dir: baseDir,
      fileName: 'index.ts'
    }
  })
}

async function injectIntoExistentServiceFile(props: IBuilderProps) {
  const baseDir = getBaseDir(props.vendor, props.restResource)
  const rootDir = props.rootDir || process.cwd()
  const context = new RenderContext({ 
    restResource: props.restResource,
    restResourceAction: props.restResourceAction
  })
  
  const destinationFile = `${rootDir}${baseDir}/index.ts`
  let destinatioContent = readFileSync(destinationFile).toString() 
  
  const importsTemplate = `${__dirname}/templates/imports.ejs`
  const importsContent = await readTemplate(importsTemplate, {}, { context })

  const functionTemplate = `${__dirname}/templates/function.ejs`
  const functionContent = await readTemplate(functionTemplate, {}, { context })

  destinatioContent = addAtEndOfImports(destinatioContent, importsContent)
  destinatioContent = addAtEndOfServiceClass(destinatioContent, functionContent)

  const formattedStr = format(destinatioContent, { parser: 'typescript', singleQuote: true, semi: false, printWidth: 120 })
  writeFileSync(destinationFile, formattedStr)
}

