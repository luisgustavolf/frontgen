import { existsSync, readFileSync, rmdirSync } from "fs";
import { serviceBuilder } from "../builder";

const outputDir = `${process.cwd()}/.tests`

beforeAll(() => {
  if(existsSync(outputDir))
    rmdirSync(outputDir, { recursive: true });
})

describe('Service Generator', () => {
  it('shound generate', async () => {
    await serviceBuilder({
      rootDir: outputDir,
      restResourcePath: '/v1/admin/sponsors/',
    })

    const generated = readFileSync(`${outputDir}/services/caju/v1/admin/sponsors/index.ts`)
    const mock = readFileSync(`${__dirname}/mocks/index.ts`)
    expect(generated.toString()).toEqual(mock.toString())
  })
})

export default {}