import {
  Component,
  ElementRef,
  EventEmitter,
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
  isSubmitDisabled: boolean = true;

  @Output() closeComponentStatusEvent = new EventEmitter<boolean>();
  @ViewChild('fileInput') fileInputRef!: ElementRef;

  constructor(
    private sanitizer: DomSanitizer,
    private httpClient: HttpClient,
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

    // Replace 'your_cloud_name' with your actual Cloudinary cloud name
    this.httpClient.post(`https://api.cloudinary.com/v1_1/dprjb18ng/upload`, formData).subscribe(
      (response) => {
        // Handle the server's response here
        console.log('Image upload successful', response);
        // Provide user feedback here if needed
      },
      (error) => {
        // Handle any errors that occur during the upload
        console.error('Image upload failed', error);
        // Provide user feedback here if needed
      }
    );
  }
}
