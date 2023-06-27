export interface IWriteFileProps<TData, TContext> {
  template: {
    file: string
    data?: TData
    context?: TContext
  },
  destination: {
    root?: string
    dir: string
    fileName: string
    breakIfExists?: boolean
  }
}