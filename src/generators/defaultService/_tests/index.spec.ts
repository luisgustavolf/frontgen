import { existsSync, rmdirSync } from "fs";
import { defaultServiceBuilder } from "../builder";

const outputDir = `${process.cwd()}/.tests`

beforeAll(() => {
  if(existsSync(outputDir))
    rmdirSync(outputDir, { recursive: true });
})

describe('Service Generator', () => {
  it('shound generate', async () => {
    defaultServiceBuilder({
      rootDir: outputDir,
      restResourcePath: '/v1/admin/sponsors/',
    })
  })
})

export default {}