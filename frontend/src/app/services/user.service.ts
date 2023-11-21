import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs"

import { ConfigService } from "./config.service"
import { I_UserBasicInfo } from "../models/responses/userResponses"
import { SocketService } from "./socket.service"


@Injectable({
  providedIn: "root"
})
export class UserService {
  private defaultName = ''
  private defaultUserName = 'userName'
  private defualtFriendsCount = ''
  private defaultProfilePicture = 'https://goadlercric.s3.ap-south-1.amazonaws.com/Logos/Default/DefaultProfilePicture.png'

  private profilePicture = new BehaviorSubject<string>(this.defaultProfilePicture);
  private friendsCount = new BehaviorSubject<string>(this.defualtFriendsCount)
  private name = new BehaviorSubject<string>(this.defaultName)
  private userName = new BehaviorSubject<string>(this.defaultUserName)
  private notificationsCount = new BehaviorSubject<number>(0)


  name$: Observable<string> = this.name.asObservable();
  friendsCount$: Observable<string> = this.friendsCount.asObservable()
  profilePicture$: Observable<string> = this.profilePicture.asObservable();
  userName$: Observable<string> = this.userName.asObservable();
  notificationsCount$: Observable<number> = this.notificationsCount.asObservable()


  private API_URL!: string
  private socket: any = ''

  constructor(private configService: ConfigService,
    private http: HttpClient,
    private socketService: SocketService
  ) {
    this.API_URL = this.configService.getAPI_BaseURL()
  }

  getUserBasicInfo() {
    this.http.get<I_UserBasicInfo>(`${this.API_URL}/user/basic-info`)
    .subscribe(
      {
        next: response => {
          this.profilePicture.next(response.profilePicture)
          this.name.next(response.name)
          this.userName.next(response.userName)
          this.friendsCount.next(response.friendsCount)
          
          if (this.socket?.id === undefined) {
            this.socket = this.socketService.connect(response.userName)
          }
        }
      }
    )
  }

  updateProfilePicture() {
    this.http.get<I_UserBasicInfo>(`${this.API_URL}/user/basic-info`)
    .subscribe(
      {
        next: response => {
          this.profilePicture.next(response.profilePicture)
        }
      }
    )
  }
  
  changeToDefaultProfilePicture() {
    this.profilePicture.next(this.defaultProfilePicture)
  }

  getDefaultProfilePicture() {
    return this.defaultProfilePicture
  }
}