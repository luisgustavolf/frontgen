import axios from 'axios'
import { V1AdminSponsorsActionData } from './iV1AdminSponsorsActionData'
import { V1AdminSponsorsActionResponse } from './iV1AdminSponsorsActionResponse'

export class V1AdminSponsorsService {
  static async fn(data: V1AdminSponsorsActionData) {
    const url = `/v1/admin/sponsors/action`
    const response = await axios.get<V1AdminSponsorsActionResponse>(url, data)
    return response.data
  }
}
