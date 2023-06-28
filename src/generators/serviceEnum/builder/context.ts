import { camelCase, pascalCase, snakeCase,  } from "change-case"

export interface IRenderContextProps {
  vendor: string
  title: string
  key: string
}

export class RenderContext {
  constructor(public props: IRenderContextProps) {}

  getDir() {
    return `/src/services/${this.props.vendor}/enums`
  }

  getFileName() {
    return `${camelCase(this.getEnumName())}.ts`
  }

  getEnumName() {
    return pascalCase(`enum ${this.props.title}`)
  }

  getOptionName() {
    return snakeCase(this.props.key).toUpperCase()
  }
}