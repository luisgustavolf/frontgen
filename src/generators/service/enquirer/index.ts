import { prompt } from 'enquirer'
import { getPossibleControllerAndAction } from './helpers';
import { restPathValidator } from './validators';
import { generateService } from '../builder';

export async function serviceEnquirer() {
  let isController = false

  const vendorResponse = await prompt<{ value: string }>({
    type: 'input',
    name: 'value',
    initial: 'caju',
    message: 'Qual o dono do endpoint? ex.: caju'
  });

  const restPathResponse = await prompt<{ value: string }>({
    type: 'input',
    name: 'value',
    message: 'Qual no caminho do endpoint? ex.: /v1/path/:param',
    required: true,
    validate: restPathValidator
  });

  const possbileResource = getPossibleControllerAndAction(restPathResponse.value)

  if (possbileResource.possibleAction) {
    const isControllerResponse = await prompt<{ value: boolean }>({
      type: 'confirm',
      name: 'value',
      initial: 'y',
      message: `"${possbileResource.possibleAction}" é uma action?`
    });

    isController = isControllerResponse.value
  }

  await generateService({
    vendor: vendorResponse.value,
    restResource: isController ? possbileResource.possibleController : restPathResponse.value,
    restResourceAction: isController ? possbileResource.possibleAction : ''
  })
}

