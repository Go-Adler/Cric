import { HttpClient } from "@angular/common/http";
import { Injectable, OnInit } from "@angular/core";
import { ConfigService } from "./config.service"
import { Observable } from "rxjs"
import { I_UserProfilePicture } from "../models/responses/userResponses"


@Injectable({
  providedIn: "root"
})
export class UserService implements OnInit{
  private profilePicture: string = 'https://goadlercric.s3.ap-south-1.amazonaws.com/Logos/Default/DefaultProfilePicture.png'
  API_URL!: string

  constructor(private configService: ConfigService, private http: HttpClient) {
    this.API_URL = this.configService.getAPI_BaseURL()
  }

  getFetchedProfilePicture(): string {
    return this.profilePicture
  }



  ngOnInit(): void {
  }

  getProfilePicture() {
    const fetchedProfilePicture = this.http.get<I_UserProfilePicture>(`${this.API_URL}/user/profile-picture`)
    this.profilePicture = fetchedProfilePicture.userProfilePicture
  }
}