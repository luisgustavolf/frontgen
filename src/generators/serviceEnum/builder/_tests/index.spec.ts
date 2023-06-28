import { expectFilesToBeEqual } from "../../../../lib/jest/expectFilesToBeEqual";
import { getOutputPath, resetOutputDir } from "../../../../lib/jest/utils";
import {  serviceEnumBuilder } from '../index'

beforeEach(() => {
  resetOutputDir()
})

describe('Base Generator', () => {
  it('first case', async () => {
    await serviceEnumBuilder({
      vendor: 'caju',
      title: 'Tiers',
      key: 'tier0'
    })

    const mock = `${__dirname}/snapshots/first.ts`
    const generated = getOutputPath(`/src/services/caju/enums/enumTiers.ts`)
    expectFilesToBeEqual(mock, generated)
  })
})
