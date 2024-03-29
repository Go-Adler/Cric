import { HttpClient } from "@angular/common/http"
import { Injectable } from "@angular/core"
import { BehaviorSubject, Observable } from "rxjs"

import { ConfigService } from "./config.service"
import { I_UserBasicInfo } from "../models/responses/userResponses"
import { environment } from "src/environments/environment"

@Injectable({
  providedIn: "root"
})
export class UserService {
  private defaultName = ''
  private defaultEmail = ''
  private defaultUserName = ''
  private defualtFriendsCount = ''
  private defaultProfilePicture = environment.DEFAULT_PROFILE_PICTURE

  private profilePicture = new BehaviorSubject<string>(this.defaultProfilePicture);
  private email = new BehaviorSubject<string>(this. defaultEmail)
  private friendsCount = new BehaviorSubject<string>(this.defualtFriendsCount)
  private name = new BehaviorSubject<string>(this.defaultName)
  private userName = new BehaviorSubject<string>(this.defaultUserName)
  private phone = new BehaviorSubject<number>(0)
  private notificationsCount = new BehaviorSubject<number>(0)
  private messagesCount = new BehaviorSubject<number>(0)


  name$: Observable<string> = this.name.asObservable();
  phone$: Observable<number> = this.phone.asObservable()
  email$: Observable<string> = this.email.asObservable()
  friendsCount$: Observable<string> = this.friendsCount.asObservable()
  profilePicture$: Observable<string> = this.profilePicture.asObservable();
  userName$: Observable<string> = this.userName.asObservable();
  notificationsCount$: Observable<number> = this.notificationsCount.asObservable()
  messagesCount$: Observable<number> = this.messagesCount.asObservable()

  private API_URL!: string

  constructor(private configService: ConfigService,
    private http: HttpClient,
  ) {
    this.API_URL = this.configService.getAPI_BaseURL()
  }

  getUserBasicInfo() {
    this.http.get<I_UserBasicInfo>(`${this.API_URL}/user/basic-info`)
      .subscribe(
        {
          next: response => {
            if (response.profilePicture) this.profilePicture.next(response.profilePicture)
            if (!response.profilePicture) this.profilePicture.next(environment.DEFAULT_PROFILE_PICTURE)
            this.name.next(response.name)
            this.email.next(response.email)
            this.phone.next(response.phone)
            this.userName.next(response.userName)
            this.friendsCount.next(response.friendsCount)
            this.messagesCount.next(response.messageCount)
            if (response.notificationsCount) {
              this.notificationsCount.next(response.notificationsCount)
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

  updateNotificationsCount() {
    let currentCount = this.notificationsCount.value
    currentCount++
    this.notificationsCount.next(currentCount)
  }

  countDownNotification() {
    let currentCount = this.notificationsCount.value
    currentCount--
    this.notificationsCount.next(currentCount)
  }

  countDownMessages() {
    let currentCount = this.messagesCount.value
    currentCount--
    this.messagesCount.next(currentCount)
  }
}