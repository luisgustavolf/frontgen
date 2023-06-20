import { pascalCase } from "change-case";
import { getBaseName } from "./helpers";
import { IRenderContextProps } from "./iRenderContextProps";

export class RenderContext {
  baseName = ''

  constructor(public props: IRenderContextProps) {
    this.baseName = getBaseName(props.restResource)
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