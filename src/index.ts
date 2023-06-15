import { defaultServiceRunner } from "./generators/defaultService/enquirer"

async function main() {
  try {
    await defaultServiceRunner()
  } catch (error) {
    if(error)
      console.log(error)    
  }
}

main()