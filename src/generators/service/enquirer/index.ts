import { prompt } from 'enquirer'
import { getPossibleControllerAndAction } from './helpers';

export async function serviceEnquirer() {
  const vendor = await prompt<{value: string}>({
    type: 'input',
    name: 'value',
    initial: 'caju',
    message: 'Qual o dono do endpoint? ex.: caju'
  });
  
  const restPath = await prompt<{value: string}>({
    type: 'input',
    name: 'value',
    message: 'Qual no caminho do endpoint? ex.: /v1/path/:param'
  });

  const possbileResource = getPossibleControllerAndAction(restPath.value)

  if (possbileResource.action) {
    const isController = await prompt<boolean>({
      type: 'confirm',
      name: 'question',
      message: 'Want to answer?'
    });
  }

}

