export interface IWriteFileProps<TData, TContext> {
  tempateFile: string
  templateData?: TData
  templateContext?: TContext
  destinationFile: string
}