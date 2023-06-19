import { existsSync, rmSync } from "fs";

export const outputDir = `${process.cwd()}/.tests`

export function resetOutputDir() {
  if(existsSync(outputDir))
    rmSync(outputDir, { recursive: true });
}

export function getOutputPath(path?: string) {
  return `${outputDir}${path || ''}`
}