import { defaultServiceEnquirer } from "./generators/defaultService/enquirer"

async function main() {
  try {
    // await defaultServiceEnquirer()
  } catch (error) {
    if(error)
      console.log(error)    
  }
}

main()