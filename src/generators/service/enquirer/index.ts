import { input, confirm } from '@inquirer/prompts'
import { getPossibleControllerAndAction } from './helpers';
import { restPathValidator } from './validators';
import { generateService } from '../builder';

export async function serviceEnquirer() {
  let isController = false

  const vendorResponse = await input({
    message: 'Qual o dono do endpoint? ex.: caju',
    default: 'caju'
  });

  const restPathResponse = await input({
    message: 'Qual no caminho do endpoint? ex.: /v1/path/:param',
    validate: restPathValidator
  });

  const possbileResource = getPossibleControllerAndAction(restPathResponse)

  if (possbileResource.possibleAction) {
    isController = await confirm({
      default: true,
      message: `"${possbileResource.possibleAction}" é uma action?`
    });
  }

  await generateService({
    vendor: vendorResponse,
    restResource: isController ? possbileResource.possibleController : restPathResponse,
    restResourceAction: isController ? possbileResource.possibleAction : ''
  })
}

