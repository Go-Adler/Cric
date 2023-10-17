import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";

import { ConfigService } from "src/app/services/config.service"

@Injectable({
    providedIn: 'root'
})
export class UserProfileService{
    API_URL!: string

    constructor(private configService: ConfigService, private http: HttpClient) {
        this.API_URL = configService.getAPI_BaseURL()
    }

    updateProfilePicture(): Observable<any> {
        const postData = { name: 'b' }
        const httpOptions = {
            headers: new HttpHeaders({
              'content-type': 'application/json',
            }),
          }; 
        console.log(19, this.API_URL)  
        return this.http.post<any>(`${this.API_URL}/user/posts/unlike-post`, JSON.stringify(postData), httpOptions);
    }
}