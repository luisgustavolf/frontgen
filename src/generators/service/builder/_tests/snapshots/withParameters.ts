import axios from 'axios'
import { V1SponsorsTransactionsData } from './iV1SponsorsTransactionsData'
import { V1SponsorsTransactionsResponse } from './iV1SponsorsTransactionsResponse'

export class V1SponsorsTransactionsService {
  static async fn(sponsorId: string, transactionId: string, data: V1SponsorsTransactionsData) {
    const url = `/v1/sponsors/${sponsorId}/transactions/${transactionId}/`
    const response = await axios.get<V1SponsorsTransactionsResponse>(url, data)
    return response.data
  }
}
