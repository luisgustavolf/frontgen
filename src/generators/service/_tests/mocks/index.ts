import axios from 'axios'
import { V1AdminSponsorsParams } from './iV1AdminSponsorsParams'
import { V1AdminSponsorsResponse } from './iV1AdminSponsorsResponse'

export class V1AdminSponsorsService {
  static async list(data: V1AdminSponsorsParams) {
    const url = '/v1/admin/sponsors/'
    const response = await axios.get<V1AdminSponsorsResponse>(url, data)
    return response.data
  }
}