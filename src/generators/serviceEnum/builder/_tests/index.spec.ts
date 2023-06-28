import { expectFilesToBeEqual } from "../../../../lib/jest/expectFilesToBeEqual";
import { getOutputPath, resetOutputDir } from "../../../../lib/jest/utils";
import {  baseBuilder } from '../index'

beforeEach(() => {
  resetOutputDir()
})

describe('Base Generator', () => {
  it.skip('first case', async () => {
    await baseBuilder({})

    const mock = `${__dirname}/snapshots/first.ts`
    const generated = getOutputPath(`/src/path/to/output.ts`)
    expectFilesToBeEqual(mock, generated)
  })
})
