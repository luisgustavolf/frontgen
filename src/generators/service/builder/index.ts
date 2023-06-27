import { existsSync } from "fs";
import { templateWriter } from "../../../lib/ejs/templateWriter";
import { appendAtEndOfFile } from "../../../lib/file/injectors/appendAtEndOfFile";
import { appendAtEndOfImports } from "../../../lib/file/injectors/appendAtEndOfImports";
import { appendAtEndOfServiceClass } from "../../../lib/file/injectors/appendAtEndOfServiceClass";
import { getBaseDir } from "./helpers";
import { IBuilderProps } from "./iBuilderProps";
import { RenderContext } from "./renderContext";

export async function generateService(props: IBuilderProps) {
  const baseDir = getBaseDir(props.vendor, props.restResource)
  const rootDir = props.rootDir || process.cwd()
  const destinationFile = `${rootDir}${baseDir}/index.ts`
  const context = new RenderContext({ 
    restResource: props.restResource,
    restResourceAction: props.restResourceAction
  })

  if (existsSync(destinationFile)) {
    await injectIntoExistentServiceFile(baseDir, context)
  } else {
    await createNewServiceFile(baseDir, context)
  }
}

async function createNewServiceFile(baseDir: string, context: RenderContext) {
  await templateWriter({
    template: {
      file: `${__dirname}/templates/index.ejs`,
      context
    },
    destination: {
      dir: baseDir,
      fileName: 'index.ts'
    },
    injector: appendAtEndOfFile
  })

  await generateInterfaces(baseDir, context)
}

async function injectIntoExistentServiceFile(baseDir: string, context: RenderContext) {
  await templateWriter({
    template: {
      file: `${__dirname}/templates/imports.ejs`,
      context
    },
    destination: {
      dir: baseDir,
      fileName: 'index.ts'
    },
    injector: appendAtEndOfImports
  })
  
  await templateWriter({
    template: {
      file: `${__dirname}/templates/function.ejs`,
      context
    },
    destination: {
      dir: baseDir,
      fileName: 'index.ts'
    },
    injector: appendAtEndOfServiceClass
  })

  await generateInterfaces(baseDir, context)
}

async function generateInterfaces(baseDir: string, context: RenderContext) {
  await templateWriter({
    template: {
      file: `${__dirname}/templates/iData.ejs`,
      context
    },
    destination: {
      dir: `${baseDir}`,
      fileName: `${context.getParamNameFileName()}.ts`
    },
    injector: appendAtEndOfFile
  })

  await templateWriter({
    template: {
      file: `${__dirname}/templates/iResponse.ejs`,
      context
    },
    destination: {      
      dir: `${baseDir}`,
      fileName: `${context.getResponseNameFileName()}.ts`
    },
    injector: appendAtEndOfFile
  })
}