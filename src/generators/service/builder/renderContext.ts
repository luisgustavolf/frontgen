import { pascalCase } from "change-case";
import { getBaseDir, getBaseName } from "./helpers";
import { IBuilderProps } from "./iBuilderProps";

export class RenderContext {
  baseDir = ''
  baseName = ''
  rootDir = ''
  destinationFile = ''

  constructor(public props: IBuilderProps) {
    this.baseDir = getBaseDir(props.vendor, props.restResource)
    this.baseName = getBaseName(props.restResource)
    this.rootDir = props.rootDir || process.cwd()
    this.destinationFile = `${this.rootDir}${this.baseDir}/index.ts`
  }

  getRestResourceActionName() {
    return pascalCase(this.props.restResourceAction)
  }

  getServiceName() {
    return `${this.baseName}Service`
  }

  getParamName() {
    return `${this.baseName}${this.getRestResourceActionName()}Data`
  }

  getResponseName() {
    return `${this.baseName}${this.getRestResourceActionName()}Response`
  }

  getFnParams() {
    const params = [`data: ${this.getParamName()}`]

    const routeParams = this.props.restResource
      .split('/')
      .filter((part) => part.includes(":"))
      .map((part) => 
        `${part.replace(':', '')}: string`
      )

    return [...routeParams, ...params].join(', ')
  }

  getUrl() {
    const fixedPaths = this.props.restResource
      .split('/')
      .map((part) => {
        if (part.includes(':'))
          return '${' + part.replace(':', '') + '}'
        else
          return part
      })
      .join('/')

    return fixedPaths + this.props.restResourceAction
  }
}