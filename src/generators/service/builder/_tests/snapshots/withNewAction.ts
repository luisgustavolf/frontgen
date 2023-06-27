import axios from 'axios'
import { DtoAdminSponsorsData } from './dtoAdminSponsorsData'
import { DtoAdminSponsorsResponse } from './dtoAdminSponsorsResponse'
import { DtoAdminSponsorsNewActionData } from './dtoAdminSponsorsNewActionData'
import { DtoAdminSponsorsNewActionResponse } from './dtoAdminSponsorsNewActionResponse'

export class AdminSponsorsService {
  static async fn(data: DtoAdminSponsorsData) {
    const url = `/v1/admin/sponsors/`
    const response = await axios.get<DtoAdminSponsorsResponse>(url, data)
    return response.data
  }

  static async fn(data: DtoAdminSponsorsNewActionData) {
    const url = `/v1/admin/sponsors/newAction`
    const response = await axios.get<DtoAdminSponsorsNewActionResponse>(url, data)
    return response.data
  }
}
