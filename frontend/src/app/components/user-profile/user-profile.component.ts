import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent implements OnInit {
  profilePicture: string = '';
  addProfilePicture: boolean = true;
  selectedImage: string | undefined;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.getUserBasicInfo()  // remove later - helpful for development gokul

    this.userService.profilePicture$.subscribe(profilePicture => {
      this.profilePicture = profilePicture
    })
  }

  changeProfilePicture() {
    this.addProfilePicture = true;
  }

  closeComponent(closeStatus: boolean) {
    this.addProfilePicture = closeStatus;
  }
}
