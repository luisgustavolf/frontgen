import { existsSync } from "fs";
import { templateWriter } from "../../../lib/ejs/templateWriter";
import { appendInjector } from "../../../lib/file/injectors/append";
import { appendAtEndOfImports } from "../../../lib/file/injectors/appendAtEndOfImports";
import { appendAtEndOfServiceClass } from "../../../lib/file/injectors/appendAtEndOfServiceClass";
import { getBaseDir } from "./helpers";
import { IBuilderProps } from "./iBuilderProps";
import { RenderContext } from "./renderContext";

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

  await templateWriter({
    template: {
      file: `${__dirname}/templates/index.ejs`,
      context
    },
    destination: {
      dir: baseDir,
      fileName: 'index.ts'
    },
    injector: appendInjector
  })
}

async function injectIntoExistentServiceFile(props: IBuilderProps) {
  const baseDir = getBaseDir(props.vendor, props.restResource)
  const context = new RenderContext({ 
    restResource: props.restResource,
    restResourceAction: props.restResourceAction
  })
  
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
}