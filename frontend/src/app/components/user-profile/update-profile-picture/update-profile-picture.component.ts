import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser'
import { HttpClient } from '@angular/common/http'

@Component({
  selector: 'app-update-profile-picture',
  templateUrl: './update-profile-picture.component.html',
  styleUrls: ['./update-profile-picture.component.scss'],
})
export class UpdateProfilePictureComponent {
  imageChangedEvent: any = '';
  croppedImage: any = '';
  uploadingImage: any = '';
  isSubmitDisabled: boolean = true

  @Output() closeComponentStatusEvent = new EventEmitter<boolean>();
  @ViewChild('fileInput') fileInputRef!: ElementRef;

  constructor(
    private sanitizer: DomSanitizer,
    private httpClient: HttpClient
  ) {} 

  closeChangeProfilePicture() {
    this.isSubmitDisabled = true
    this.closeComponentStatusEvent.emit(false);
  }

  onFileSelected(event: any): void {
    this.imageChangedEvent = event;
    this.isSubmitDisabled = false
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
  }

  cropperReady() {
  }

  loadImageFailed() {
  }

  submitPicture() {
    const formData = new FormData();
    formData.append('croppedImage', this.uploadingImage.blob, this.uploadingImage.name);

    this.httpClient.post('http://localhost:3000/user/upload', formData).subscribe(
      (response) => {
        // Handle the server's response here
        console.log('Image upload successful', response);
      },
      (error) => {
        // Handle any errors that occur during the upload
        console.error('Image upload failed', error);
      }
    );
  }
}
