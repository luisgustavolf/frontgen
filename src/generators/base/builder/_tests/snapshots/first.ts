import axios from 'axios'
import { DtoAdminSponsorsData } from './dtoAdminSponsorsData'
import { DtoAdminSponsorsResponse } from './dtoAdminSponsorsResponse'

export class AdminSponsorsService {
  static async fn(data: DtoAdminSponsorsData) {
    const url = `/v1/admin/sponsors/`
    const response = await axios.get<DtoAdminSponsorsResponse>(url, data)
    return response.data
  }
}
