import { existsSync, rmdirSync } from "fs";

export const outputDir = `${process.cwd()}/.tests`

export function resetOutputDir() {
  if(existsSync(outputDir))
    rmdirSync(outputDir, { recursive: true });
}

export function getOutputPath(path?: string) {
  return `${outputDir}${path || ''}`
}