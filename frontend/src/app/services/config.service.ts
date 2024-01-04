import { Injectable } from '@angular/core'

@Injectable({
  providedIn: 'root'
})

export class ConfigService {
  private API_BaseURL = 'https://cric.uno'

  getAPI_BaseURL(): string {
    return this.API_BaseURL
  }

}