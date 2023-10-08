import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { HttpClientModule } from '@angular/common/http';
import { MatDialogModule } from '@angular/material/dialog';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { ImageCropperModule } from 'ngx-image-cropper';
import { AppComponent } from './app.component';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { ReactiveFormsModule } from '@angular/forms';
import { OtpComponent } from './components/otp/otp.component';
import { TokenInterceptor } from './services/auth.interceptor';
import { ErrorComponent } from './components/error/error.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { AdminHomeComponent } from './components/admin-home/admin-home.component';
import { UsersComponent } from './components/users/users.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { SportsComponent } from './components/sports/sports.component';
import { MatCardModule } from '@angular/material/card';
import { MatCommonModule } from '@angular/material/core';
import { UpdateProfilePictureComponent } from './components/user-profile/update-profile-picture/update-profile-picture.component';
import { CloudinaryInterceptor } from './services/cloudinary.interceptor';
import { TestFormCloudinaryComponent } from './components/user-profile/test-form-cloudinary/test-form-cloudinary.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { CommonModule } from '@angular/common'
import { SignUpComponent } from './components/user/auth/sign-up/sign-up.component';
import { UserModule } from './user/user.module'
import { AdminModule } from './admin/admin.module'

@NgModule({
  declarations: [
    SignUpComponent,
    AppComponent,
    OtpComponent,
    ErrorComponent,
    UserProfileComponent,
    AdminHomeComponent,
    UsersComponent,
    ForgotPasswordComponent,
    SportsComponent,
    UpdateProfilePictureComponent,
    TestFormCloudinaryComponent,
    PageNotFoundComponent,
  ],
  imports: [
    UserModule,
    AdminModule,
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    MatSelectModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatProgressSpinnerModule,
    ImageCropperModule,
    MatCommonModule,
    MatCardModule,
    MatDialogModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: CloudinaryInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
