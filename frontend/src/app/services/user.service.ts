import { HttpClient } from "@angular/common/http";
import { Injectable, OnInit } from "@angular/core";
import { ConfigService } from "./config.service"
import { Observable } from "rxjs"
import { I_UserProfilePicture } from "../models/responses/userResponses"


@Injectable({
  providedIn: "root"
})
export class UserService implements OnInit{
  API_URL!: string

  constructor(private configService: ConfigService, private http: HttpClient) {
    this.API_URL = this.configService.getAPI_BaseURL()
  }

  ngOnInit(): void {
  }

  getProfilePicture(): Observable<I_UserProfilePicture> {
    return this.http.get<I_UserProfilePicture>(`${this.API_URL}/user/profile-picture`)
  }
}