import axios from 'axios'
import { V1AdminSponsorsData } from './iV1AdminSponsorsData'
import { V1AdminSponsorsResponse } from './iV1AdminSponsorsResponse'
import { V1AdminSponsorsNewActionData } from './iV1AdminSponsorsNewActionData'
import { V1AdminSponsorsNewActionResponse } from './iV1AdminSponsorsNewActionResponse'

export class V1AdminSponsorsService {
  static async fn(data: V1AdminSponsorsData) {
    const url = `/v1/admin/sponsors/`
    const response = await axios.get<V1AdminSponsorsResponse>(url, data)
    return response.data
  }

  static async fn(data: V1AdminSponsorsNewActionData) {
    const url = `/v1/admin/sponsors/newAction`
    const response = await axios.get<V1AdminSponsorsNewActionResponse>(url, data)
    return response.data
  }
}
