export interface IWriteFileProps<TData> {
  tempateFile: string
  templateData: TData
  destinationFile: string
}