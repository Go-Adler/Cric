import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs'
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent implements OnInit, OnDestroy {
  profilePicture: string = '';
  addProfilePicture: boolean = true;
  selectedImage: string | undefined;
  name = '';
  userName = '';
  friendsCount = ''

  private subscriptions: Subscription[] = [];

  constructor(private userService: UserService) {}

  ngOnInit(): void {

    // Get profile picture
    this.subscriptions.push(
      this.userService.profilePicture$.subscribe({
        next: (profilePicture) => {
          this.profilePicture = profilePicture;
        },
      })
    )

    // Get friends count
    this.subscriptions.push(
      this.userService.friendsCount$.subscribe({
        next: (friendsCount) => {
          this.friendsCount = friendsCount;
        },
      })
    )

    // Get name
    this.subscriptions.push(
      this.userService.name$.subscribe({
        next: (name) => {
          this.name = name;
        },
      })
    );

    // Get user name
    this.subscriptions.push(
      this.userService.userName$.subscribe((userName) => {
        this.userName = userName;
      })
    );
  }

  changeProfilePicture() {
    this.addProfilePicture = true;
  }

  closeComponent(closeStatus: boolean) {
    this.addProfilePicture = closeStatus;
  }

  ngOnDestroy(): void {
    // Unsubscribe all subscriptions
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }
}
