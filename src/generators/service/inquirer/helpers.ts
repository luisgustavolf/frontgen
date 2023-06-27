export function getPossibleControllerAndAction(restPath: string) {
  let possibleController = restPath
  let possibleAction = ''
  const parts = restPath.split('/').filter((path) => !!path)
  const lastPart = parts[parts.length - 1]
  const isLastPartAParam = lastPart.includes(':')

  if (!isLastPartAParam) {
    possibleAction = lastPart
    parts.pop()
    possibleController = parts.join('/') + '/'
  }

  return {
    originalPath: parts.join('/') + '/',
    possibleController,
    possibleAction
  }
}