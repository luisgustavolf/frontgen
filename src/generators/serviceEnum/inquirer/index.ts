import { input } from '@inquirer/prompts';

export async function baseInquirer() {
  const vendorResponse = await input({
    message: 'Qual o dono do endpoint? ex.: caju',
    default: 'caju'
  });

  const enumTitle = await input({
    message: 'Qual o titulo do enum? ex.: Expenses Types',
  });

  const keyExample = await input({
    message: 'Qual um valor desse enum? ex.: credit',
  });
}

