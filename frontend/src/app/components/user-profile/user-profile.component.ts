import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { UserService } from 'src/app/services/user.service'
import { ImageCroppedEvent } from 'ngx-image-cropper'

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  profilePicture: string = 'https://goadlercric.s3.ap-south-1.amazonaws.com/Logos/Default/DefaultProfilePicture.png'
  addProfilePicture: boolean = false
  selectedImage: string | undefined;
  imageChangedEvent = '';
  croppedImage: any = ''


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

  onFileSelected(event: any): void {
    this.imageChangedEvent = event;
  }

  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
    // event.blob can be used to upload the cropped image
  }
}
