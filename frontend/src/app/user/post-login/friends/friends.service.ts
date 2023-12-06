import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { FriendBasicInfo, I_UserBasicInfo } from "src/app/models/responses/userResponses"
import { ConfigService } from "src/app/services/config.service"
import { environment } from "src/environments/environment";
import { AddFriendResponse } from "src/app/models/responses/friend.model";

@Injectable({
  providedIn: 'root'
})
export class FriendsService {
  private API_URL: string
  private defaultProfilePicture = environment.DEFAULT_PROFILE_PICTURE

  private name = new BehaviorSubject<string>('')
  private userId = new BehaviorSubject<string>('')
  private userName = new BehaviorSubject<string>('')
  private isFriend = new BehaviorSubject<boolean>(false)
  private friendsCount = new BehaviorSubject<string>('')
  private fetchComplete = new BehaviorSubject<boolean>(false)
  private profilePicture = new BehaviorSubject<string>(this.defaultProfilePicture);

  name$: Observable<string> = this.name.asObservable()
  userId$: Observable<string> = this.userId.asObservable()
  userName$: Observable<string> = this.userName.asObservable()
  isFriend$: Observable<boolean> = this.isFriend.asObservable()
  friendsCount$: Observable<string> = this.friendsCount.asObservable()
  fetchComplete$: Observable<boolean> = this.fetchComplete.asObservable()
  profilePicture$: Observable<string> = this.profilePicture.asObservable()

  constructor(private configService: ConfigService, private http: HttpClient) {
    this.API_URL = this.configService.getAPI_BaseURL()
  }

  getFriendBasicInfo(userName: string) {
    this.userName.next(userName)
    this.fetchComplete.next(false)
    this.http.get<FriendBasicInfo>(`${this.API_URL}/user/friend/basic-info/${userName}`)
    .subscribe(
      {
        next: response => {
          this.fetchComplete.next(true)
          this.name.next(response.name)
          this.userId.next(response.personId)
          this.isFriend.next(response.isFriend)
          this.friendsCount.next(response.friendsCount)
          if(response.profilePicture) this.profilePicture.next(response.profilePicture)
        }
      }
    )
  }

  changeToDefault() {
    this.name.next('')
    this.friendsCount.next('')
    this.profilePicture.next(this.defaultProfilePicture)
  }

  addFriend(personId: string): Observable<AddFriendResponse> {
    return this.http.post<AddFriendResponse>(`${this.API_URL}/user/friend/add-friend`, { personId })
  }
}