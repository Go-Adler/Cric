import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { FriendBasicInfo } from "src/app/models/responses/userResponses"
import { ConfigService } from "src/app/services/config.service"
import { environment } from "src/environments/environment";
import { FriendResponse } from "src/app/models/responses/friend.model";
import { FriendStatus } from "src/app/models/responses/userResponses";

@Injectable({
  providedIn: 'root'
})
export class FriendsService {
  private API_URL: string
  private defaultProfilePicture = environment.DEFAULT_PROFILE_PICTURE

  private name = new BehaviorSubject<string>('')
  private userId = new BehaviorSubject<string>('')
  private userName = new BehaviorSubject<string>('')
  private friendsCount = new BehaviorSubject<number>(0)
  private isOnline = new BehaviorSubject<boolean>(false)
  private fetchComplete = new BehaviorSubject<boolean>(false)
  private profilePicture = new BehaviorSubject<string>(this.defaultProfilePicture);
  friendStatus = new BehaviorSubject<FriendStatus>('stranger')

  name$: Observable<string> = this.name.asObservable()
  userId$: Observable<string> = this.userId.asObservable()
  userName$: Observable<string> = this.userName.asObservable()
  isOnline$: Observable<boolean> = this.isOnline.asObservable()
  friendsCount$: Observable<number> = this.friendsCount.asObservable()
  fetchComplete$: Observable<boolean> = this.fetchComplete.asObservable()
  profilePicture$: Observable<string> = this.profilePicture.asObservable()
  friendStatus$: Observable<FriendStatus> = this.friendStatus.asObservable()

  constructor(private configService: ConfigService, private http: HttpClient) {
    this.API_URL = this.configService.getAPI_BaseURL()
  }

  getFriendBasicInfo(userName: string) {
    this.userName.next(userName)
    this.name.next('')
    this.isOnline.next(false)
    this.fetchComplete.next(false)
    this.profilePicture.next('')
    this.http.get<FriendBasicInfo>(`${this.API_URL}/user/friend/basic-info/${userName}`)
    .subscribe(
      {
        next: response => {
          this.fetchComplete.next(true)
          this.name.next(response.name)
          this.isOnline.next(response.isOnline)
          this.userId.next(response.personId)
          this.friendStatus.next(response.friendStatus)
          this.friendsCount.next(response.friendsCount)
          if(response.profilePicture) this.profilePicture.next(response.profilePicture)
          else this.profilePicture.next(this.defaultProfilePicture)
        }
      }
    )
  }

  changeToDefault() {
    this.name.next('')
    this.friendsCount.next(0)
    this.profilePicture.next(this.defaultProfilePicture)
  }

  sendFriendRequest(personId: string): Observable<FriendResponse> {
    return this.http.post<FriendResponse>(`${this.API_URL}/user/friend/add-friend`, { personId })
  }
  
  acceptRequest(personId: string): Observable<FriendResponse> {
    return this.http.post<FriendResponse>(`${this.API_URL}/user/friend/accept-friend`, { personId })
  }

  rejectRequest(personId: string): Observable<FriendResponse> {
    return this.http.post<FriendResponse>(`${this.API_URL}/user/friend/reject-friend`, { personId })
  }

  removeFriend(personId: string): Observable<FriendResponse> {
    return this.http.post<FriendResponse>(`${this.API_URL}/user/friend/remove-friend`, { personId })
  }
}