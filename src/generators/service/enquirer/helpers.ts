export function getPossibleControllerAndAction(restPath: string) {
  let controller = restPath
  let action = ''
  const parts = restPath.split('/')
 
  if (!parts[parts.length - 1].includes(':')) {
    action = parts[-1]
    parts.pop()
    controller = parts.join('/')
  }

  return {
    controller,
    action
  }
}