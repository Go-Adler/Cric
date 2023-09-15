import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ConfigService } from "./config.service"
import { BehaviorSubject, Observable } from "rxjs"
import { I_UserBasicInfo } from "../models/responses/userResponses"


@Injectable({
  providedIn: "root"
})
export class UserService {
  private defaultProfilePicture = 'https://goadlercric.s3.ap-south-1.amazonaws.com/Logos/Default/DefaultProfilePicture.png'
  private defaultName = ''
  private defaultUserName = 'userName'


  private profilePicture = new BehaviorSubject<string>(this.defaultProfilePicture);
  private name = new BehaviorSubject<string>(this.defaultName)
  private userName = new BehaviorSubject<string>(this.defaultUserName)


  name$: Observable<string> = this.name.asObservable();
  profilePicture$: Observable<string> = this.profilePicture.asObservable();
  userName$: Observable<string> = this.userName.asObservable();


  private API_URL!: string

  constructor(private configService: ConfigService, private http: HttpClient) {
    this.API_URL = this.configService.getAPI_BaseURL()
  }

  getUserBasicInfo() {
    this.http.get<I_UserBasicInfo>(`${this.API_URL}/user/basic-info`)
    .subscribe(
      response => {
        if (response.profilePicture) this.profilePicture.next(response.profilePicture)
        if (response.name) this.name.next(response.name)
        if (response.userName) this.userName.next(response.userName)
      }
    )
  }

  changeToDefaultProfilePicture() {
    this.profilePicture.next(this.defaultProfilePicture)
  }
}