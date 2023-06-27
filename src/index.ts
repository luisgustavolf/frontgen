import { serviceInquirer } from "./generators/service/inquirer"

async function main() {
  try {
    await serviceInquirer()
  } catch (error) {
    if(error)
      console.log(error)    
  }
}

main()