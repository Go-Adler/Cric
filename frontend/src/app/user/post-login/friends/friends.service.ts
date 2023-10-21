import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, ObservableLike } from "rxjs";
import { I_UserBasicInfo } from "src/app/models/responses/userResponses"

import { ConfigService } from "src/app/services/config.service"

@Injectable({
  providedIn: 'root'
})
export class FriendsService {
  private defaultProfilePicture = 'https://goadlercric.s3.ap-south-1.amazonaws.com/Logos/Default/DefaultProfilePicture.png'
  private profilePicture = new BehaviorSubject<string>(this.defaultProfilePicture);
  private friendsCount = new BehaviorSubject<string>('')
  private name = new BehaviorSubject<string>('')

  name$: Observable<string> = this.name.asObservable()
  friendsCount$: Observable<string> = this.friendsCount.asObservable()
  profilePicture$: Observable<string> = this.profilePicture.asObservable()

  private API_URL!: string

  constructor(private configService: ConfigService, private http: HttpClient) {
    this.API_URL = this.configService.getAPI_BaseURL()
  }

  getFriendBasicInfo(userName: string) {
    this.http.get<I_UserBasicInfo>(`${this.API_URL}/user/friend/basic-info/${userName}`)
    .subscribe(
      {
        next: response => {
          if(response.profilePicture) this.profilePicture.next(response.profilePicture)
          this.name.next(response.name)
          this.friendsCount.next(response.friendsCount)
        }
      }
    )
  }

  changeToDefault() {
    this.profilePicture.next(this.defaultProfilePicture)
    this.name.next('')
    this.friendsCount.next('')
  }

  
}