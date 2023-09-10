import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { UserService } from 'src/app/services/user.service'

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  profilePicture: string = 'https://goadlercric.s3.ap-south-1.amazonaws.com/Logos/Default/DefaultProfilePicture.png'
  addProfilePicture: boolean = false
  selectedImage: string | undefined;

  @ViewChild('fileInput') fileInputRef!: ElementRef;



  constructor(private profilePictureService: UserService) {}

    
  ngOnInit(): void {
    this.profilePictureService.getProfilePicture().subscribe(
      response => {
       if (response.userProfilePicture) this.profilePicture = response.userProfilePicture
      }
    )
  }

  changeProfilePicture() {
    this.addProfilePicture = true
  }

  closeChangeProfilePicture() {
    this.addProfilePicture = false
  }

  clickInput() {
    this.fileInputRef.nativeElement.click();
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          this.selectedImage = e.target.result; 
        };
        reader.readAsDataURL(file);
      } else {
        alert('Please select an image file.');
      }
    }
  }
}
