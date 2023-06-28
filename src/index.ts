import { select } from "@inquirer/prompts"
import { serviceInquirer } from "./generators/service/inquirer"
import { serviceEnumInquirer } from "./generators/serviceEnum/inquirer"

const generators = [{
  name: 'Serviço',
  value: 'service',
  inquirer: serviceInquirer,
},
{
  name: 'Enum de Serviço',
  value: 'serviceEnum',
  inquirer: serviceEnumInquirer,
}]

async function main() {
  const generator = await select({
    message: 'Escolha um generator',
    choices: generators.map((item) => ({
      name: item.name,
      value: item.value
    }))
  })

  console.log(generator)
}

main().catch((error) => {
  console.log(error)
})