import { Component, ElementRef, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { DomSanitizer } from '@angular/platform-browser';
import { userProfileService } from './user-profile.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent implements OnInit {
  profilePicture: string =
    'https://goadlercric.s3.ap-south-1.amazonaws.com/Logos/Default/DefaultProfilePicture.png';
  addProfilePicture: boolean = true;
  selectedImage: string | undefined;

  constructor(private profilePictureService: UserService) {}

  ngOnInit(): void {
    this.profilePictureService.getProfilePicture().subscribe((response) => {
      if (response.userProfilePicture)
        this.profilePicture = response.userProfilePicture;
    });
  }

  changeProfilePicture() {
    this.addProfilePicture = true;
  }

  closeComponent(closeStatus: boolean) {
    this.addProfilePicture = closeStatus;
  }
}
