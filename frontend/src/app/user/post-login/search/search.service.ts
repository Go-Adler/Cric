import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ConfigService } from 'src/app/services/config.service';
import { Users } from '../post-log-in.interface';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  API_URL!: string
  defaultProfilePicture: string =
    'https://goadlercric.s3.ap-south-1.amazonaws.com/assets/defualtProfilePictureBlack-removebg-preview.png';

  constructor(private configService: ConfigService, private http: HttpClient) {
    this.API_URL = configService.getAPI_BaseURL()
  }

  fetchUsers(input: string): Observable<Users> {
    const inputData = { input }
    return this.http.post<Users>(`${this.API_URL}/user/find`, inputData)
  }

  getDefualtProfilePicture() {
    return this.defaultProfilePicture
  }
}
