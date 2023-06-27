import axios from 'axios'
import { DtoSponsorsTransactionsData } from './dtoSponsorsTransactionsData'
import { DtoSponsorsTransactionsResponse } from './dtoSponsorsTransactionsResponse'

export class SponsorsTransactionsService {
  static async fn(sponsorId: string, transactionId: string, data: DtoSponsorsTransactionsData) {
    const url = `/v1/sponsors/${sponsorId}/transactions/${transactionId}/`
    const response = await axios.get<DtoSponsorsTransactionsResponse>(url, data)
    return response.data
  }
}
