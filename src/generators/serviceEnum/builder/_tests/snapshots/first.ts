export enum EnumTiers {
  TIER0 = 'TIER0',
}

export type EnumTiersDictionaryType = {
  [key in EnumTiers]: string
}

export const EnumTiersDictionary: EnumTiersDictionaryType = {
  [EnumTiers.TIER0]: 'descricao',
}
