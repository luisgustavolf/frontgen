import { expectFilesToBeEqual } from "../../../../lib/jest/expectFilesToBeEqual";
import { getOutputPath, resetOutputDir } from "../../../../lib/jest/utils";
import { generateService } from "..";

beforeEach(() => {
  resetOutputDir()
})

describe('Service Generator', () => {
  it('shound generate', async () => {
    await generateService({
      rootDir: getOutputPath(),
      vendor: 'caju',
      restResource: '/v1/admin/sponsors/',
      restResourceAction: ''
    })

    const mock = `${__dirname}/snapshots/simple.ts`
    const generated = getOutputPath(`/services/caju/v1/admin/sponsors/index.ts`)
    expectFilesToBeEqual(mock, generated)
  })

  it('shound generate with rest resource action', async () => {
    await generateService({
      rootDir: getOutputPath(),
      vendor: 'caju',
      restResource: '/v1/admin/sponsors/',
      restResourceAction: 'action'
    })

    const mock = `${__dirname}/snapshots/withResourceAction.ts`
    const generated = getOutputPath(`/services/caju/v1/admin/sponsors/index.ts`)
    expectFilesToBeEqual(mock, generated)
  })

  it('shound generate with parameters', async () => {
    await generateService({
      rootDir: getOutputPath(),
      vendor: 'caju',
      restResource: '/v1/sponsors/:sponsorId/transactions/:transactionId/',
      restResourceAction: ''
    })

    const mock = `${__dirname}/snapshots/withParameters.ts`
    const generated = getOutputPath(`/services/caju/v1/sponsors/transactions/index.ts`)
    expectFilesToBeEqual(mock, generated)
  })

  it('should append method to a existent service', async () => {
    await generateService({
      rootDir: getOutputPath(),
      vendor: 'caju',
      restResource: '/v1/admin/sponsors/',
      restResourceAction: ''
    })

    await generateService({
      rootDir: getOutputPath(),
      vendor: 'caju',
      restResource: '/v1/admin/sponsors/',
      restResourceAction: 'newAction'
    })

    const mock = `${__dirname}/snapshots/withNewAction.ts`
    const generated = getOutputPath(`/services/caju/v1/admin/sponsors/index.ts`)
    expectFilesToBeEqual(mock, generated)
  })
})
