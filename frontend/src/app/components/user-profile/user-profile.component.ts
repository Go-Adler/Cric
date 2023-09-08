import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service'

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  profilePicture: string = ''

  constructor(private profilePictureService: UserService) {}

    
  ngOnInit(): void {
    this.profilePictureService.getProfilePicture().subscribe(
      response => {
        console.log(response, 16);
      }
    )
  }
}
