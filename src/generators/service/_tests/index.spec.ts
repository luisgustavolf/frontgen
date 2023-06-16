import { expectFilesToBeEqual } from "../../../lib/jest/expectFilesToBeEqual";
import { getOutputPath, resetOutputDir } from "../../../lib/jest/utils";
import { serviceBuilder } from "../builder";

beforeAll(() => {
  resetOutputDir()
})

describe('Service Generator', () => {
  it('shound generate', async () => {
    await serviceBuilder({
      rootDir: getOutputPath(),
      restResourcePath: '/v1/admin/sponsors/',
    })

    const mock = `${__dirname}/mocks/index.ts`
    const generated = getOutputPath(`/services/caju/v1/admin/sponsors/index.ts`)
    expectFilesToBeEqual(mock, generated)
  })
})
