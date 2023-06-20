import { serviceEnquirer } from "./generators/service/enquirer"

async function main() {
  try {
    await serviceEnquirer()
  } catch (error) {
    if(error)
      console.log(error)    
  }
}

main()