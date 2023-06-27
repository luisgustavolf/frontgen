import axios from 'axios'
import { DtoAdminSponsorsActionData } from './dtoAdminSponsorsActionData'
import { DtoAdminSponsorsActionResponse } from './dtoAdminSponsorsActionResponse'

export class AdminSponsorsService {
  static async fn(data: DtoAdminSponsorsActionData) {
    const url = `/v1/admin/sponsors/action`
    const response = await axios.get<DtoAdminSponsorsActionResponse>(url, data)
    return response.data
  }
}
