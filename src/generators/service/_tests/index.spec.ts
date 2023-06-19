import { expectFilesToBeEqual } from "../../../lib/jest/expectFilesToBeEqual";
import { getOutputPath, resetOutputDir } from "../../../lib/jest/utils";
import { serviceBuilder } from "../builder";

beforeEach(() => {
  resetOutputDir()
})

describe('Service Generator', () => {
  it('shound generate', async () => {
    await serviceBuilder({
      rootDir: getOutputPath(),
      vendor: 'caju',
      restResource: '/v1/admin/sponsors/',
      restResourceAction: ''
    })

    const mock = `${__dirname}/mocks/simple.ts`
    const generated = getOutputPath(`/services/caju/v1/admin/sponsors/index.ts`)
    expectFilesToBeEqual(mock, generated)
  })

  it('shound generate with rest resource action', async () => {
    await serviceBuilder({
      rootDir: getOutputPath(),
      vendor: 'caju',
      restResource: '/v1/admin/sponsors/',
      restResourceAction: 'action'
    })

    const mock = `${__dirname}/mocks/withResourceAction.ts`
    const generated = getOutputPath(`/services/caju/v1/admin/sponsors/index.ts`)
    expectFilesToBeEqual(mock, generated)
  })

  it('shound generate with parameters', async () => {
    await serviceBuilder({
      rootDir: getOutputPath(),
      vendor: 'caju',
      restResource: '/v1/sponsors/:sponsorId/transactions/:transactionId/',
      restResourceAction: ''
    })

    const mock = `${__dirname}/mocks/withParameters.ts`
    const generated = getOutputPath(`/services/caju/v1/sponsors/transactions/index.ts`)
    expectFilesToBeEqual(mock, generated)
  })

  it.only('should append method to a existent service', async () => {
    await serviceBuilder({
      rootDir: getOutputPath(),
      vendor: 'caju',
      restResource: '/v1/admin/sponsors',
      restResourceAction: ''
    })

    await serviceBuilder({
      rootDir: getOutputPath(),
      vendor: 'caju',
      restResource: '/v1/admin/sponsors',
      restResourceAction: 'newAction'
    })

    const mock = `${__dirname}/mocks/withNewAction.ts`
    const generated = getOutputPath(`/services/caju/v1/admin/sponsors/index.ts`)
    expectFilesToBeEqual(mock, generated)
  })
})
