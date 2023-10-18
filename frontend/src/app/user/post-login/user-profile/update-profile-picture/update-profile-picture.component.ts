import {
  Component,
  ElementRef,
  EventEmitter,
  Output,
  ViewChild,
} from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser'
import { ProfileService } from '../user-profile.service'


@Component({
  selector: 'app-update-profile-picture',
  templateUrl: './update-profile-picture.component.html',
  styleUrls: ['./update-profile-picture.component.scss'],
})
export class UpdateProfilePictureComponent {
  imageChangedEvent: any = '';
  croppedImage: any = '';
  uploadingImage: any = '';
  isSubmitDisabled: boolean = true;

  @Output() closeComponentStatusEvent = new EventEmitter<boolean>();
  @ViewChild('fileInput') fileInputRef!: ElementRef;

  constructor(
    private sanitizer: DomSanitizer,
    private userProfileService: ProfileService,
  ) {} 

  closeChangeProfilePicture() {
    this.isSubmitDisabled = true;
    this.closeComponentStatusEvent.emit(false);
  }

  onFileSelected(event: any): void {
    this.imageChangedEvent = event;
    this.isSubmitDisabled = false;
  }

  clickInput() {
    this.fileInputRef.nativeElement.click();
  }

  imageCropped(event: any) {
    this.croppedImage = this.sanitizer.bypassSecurityTrustUrl(event.objectUrl);
    this.uploadingImage = {
      blob: event.blob, 
      name: 'cropped-image.png',
      type: 'image/png',
    };
  }

  imageLoaded(image?: any) {
    // You can add logic here if needed
  }

  cropperReady() {
    // You can add logic here if needed
  }

  loadImageFailed() {
    // You can add logic here if needed
  }

  submitPicture() {
    const formData = new FormData();
    formData.append('file', this.uploadingImage.blob, this.uploadingImage.name);
    this.userProfileService.updateProfilePicture(formData).subscribe(
      {
        next: (data) => {
          console.log(data, 72);
        }
      }
    )
  }
}
