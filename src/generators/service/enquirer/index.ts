import { prompt } from 'enquirer'

export async function serviceEnquirer() {
  console.log('Default Service Runner')
  
  const response = await prompt({
    type: 'input',
    name: 'username',
    message: 'What is your username?'
  });

  console.log(response)
}