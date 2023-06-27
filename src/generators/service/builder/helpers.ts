import { pascalCase } from "change-case"

export function getBaseDir(vendor: string, restResourcePath: string) {
  const parts = restResourcePath.split('/')
  const validParts = parts.filter((part) => part && !part.includes(':'))
  const finalPath = validParts.join('/')
  return `/src/services/${vendor}/${finalPath}`
}

export function getBaseName(restResourcePath: string) {
  const parts = restResourcePath.split('/')
  const validParts = parts.filter((part) => 
    part && 
    !part.includes(':') && 
    !/v[0-9]/.test(part)
  )
  const validSenense = validParts.join(' ')
  return pascalCase(validSenense)
}