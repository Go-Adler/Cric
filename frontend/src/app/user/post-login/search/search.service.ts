import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ConfigService } from 'src/app/services/config.service';
import { Users } from '../post-log-in.interface';
import { environment } from '../../../../environments/environment'

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  API_URL!: string
  defaultProfilePicture: string

  constructor(
    private configService: ConfigService,
    private http: HttpClient,
  ) {
    this.API_URL = configService.getAPI_BaseURL()
    this.defaultProfilePicture = environment.DEFAULT_PROFILE_PICTURE
  }

  fetchUsers(input: string): Observable<Users> {
    const inputData = { input }
    return this.http.post<Users>(`${this.API_URL}/user/find`, inputData)
  }

  getDefualtProfilePicture() {
    return this.defaultProfilePicture
  }
}
