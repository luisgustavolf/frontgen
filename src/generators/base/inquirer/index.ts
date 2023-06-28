import { input } from '@inquirer/prompts';

export async function baseInquirer() {
  const fisrQuestion = await input({
    message: 'Pergunta',
  });
}

