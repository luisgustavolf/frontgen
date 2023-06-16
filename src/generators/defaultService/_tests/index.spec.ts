import { existsSync, readFileSync, rmdirSync } from "fs";
import { defaultServiceBuilder } from "../builder";

const outputDir = `${process.cwd()}/.tests`

beforeAll(() => {
  if(existsSync(outputDir))
    rmdirSync(outputDir, { recursive: true });
})

describe('Service Generator', () => {
  it('shound generate', async () => {
    await defaultServiceBuilder({
      rootDir: outputDir,
      restResourcePath: '/v1/admin/sponsors/',
    })

    const generated = readFileSync(`${outputDir}/services/caju/v1/admin/sponsors/index.ts`)
    const reference = readFileSync(`${__dirname}/outputs/index.ts`)
    expect(generated.toString()).toEqual(reference.toString())
  })
})

export default {}