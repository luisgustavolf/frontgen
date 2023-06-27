export function restPathValidator(str: string) {
  if (!str || !/^(\/.+){0,}\/?$/gm.test(str))
    return 'Caminho inválido... Digite um path començando com /'
  return true
}