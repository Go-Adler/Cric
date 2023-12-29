import { Injectable } from '@angular/core'

@Injectable({
  providedIn: 'root'
})

export class ConfigService {
  private API_BaseURL = 'http://13.233.225.10'

  getAPI_BaseURL(): string {
    return this.API_BaseURL
  }

}