import { input } from '@inquirer/prompts';
import { serviceEnumBuilder } from '../builder';

export async function serviceEnumInquirer() {
  const vendor = await input({
    message: 'Qual o dono do endpoint? ex.: caju',
    default: 'caju'
  });

  const title = await input({
    message: 'Qual o titulo do enum? ex.: Expenses Types',
  });

  const key = await input({
    message: 'Qual um valor desse enum? ex.: credit',
  });

  await serviceEnumBuilder({
    vendor,
    title,
    key
  })
}

