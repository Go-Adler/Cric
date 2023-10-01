import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { HttpClientModule } from '@angular/common/http';
import { TimeagoModule } from 'ngx-timeago';
import { MatDialogModule } from '@angular/material/dialog';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { ImageCropperModule } from 'ngx-image-cropper';
import { AppComponent } from './app.component';
import { NavComponent } from './components/nav/nav.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { LogInComponent } from './components/log-in/log-in.component';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './components/home/home.component';
import { OtpComponent } from './components/otp/otp.component';
import { TokenInterceptor } from './services/auth.interceptor';
import { ErrorComponent } from './components/error/error.component';
import { PostComponent } from './components/home/post/post.component';
import { NewPostComponent } from './components/home/new-post/new-post.component';
import { LogoutInterceptor } from './services/auth.noToken.interceptor';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { AdminHomeComponent } from './components/admin-home/admin-home.component';
import { AdminLoginComponent } from './components/admin-login/admin-login.component';
import { AdminNavComponent } from './components/admin-nav/admin-nav.component';
import { UsersComponent } from './components/users/users.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { CommentComponent } from './components/comment/comment.component';
import { SportsComponent } from './components/sports/sports.component';
import { MatCardModule } from '@angular/material/card';
import { MatCommonModule } from '@angular/material/core';
import { UpdateProfilePictureComponent } from './components/user-profile/update-profile-picture/update-profile-picture.component';
import { CloudinaryInterceptor } from './services/cloudinary.interceptor';
import { TestFormCloudinaryComponent } from './components/user-profile/test-form-cloudinary/test-form-cloudinary.component';
import { VerifySignUpOtpComponent } from './components/sign-up/verify-sign-up-otp/verify-sign-up-otp.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { SideNavComponent } from './components/side-nav/side-nav.component';
import { TopNavComponent } from './components/top-nav/top-nav.component';
import { RightAreaComponent } from './components/right-area/right-area.component';
import { MatchInfoComponent } from './components/right-area/match-info/match-info.component';
import { CommentSectionComponent } from './components/home/post/comment-section/comment-section.component';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    SignUpComponent,
    LogInComponent,
    HomeComponent,
    OtpComponent,
    ErrorComponent,
    PostComponent,
    NewPostComponent,
    UserProfileComponent,
    AdminHomeComponent,
    AdminLoginComponent,
    AdminNavComponent,
    UsersComponent,
    ForgotPasswordComponent,
    CommentComponent,
    SportsComponent,
    UpdateProfilePictureComponent,
    TestFormCloudinaryComponent,
    VerifySignUpOtpComponent,
    PageNotFoundComponent,
    SideNavComponent,
    TopNavComponent,
    RightAreaComponent,
    MatchInfoComponent,
    CommentSectionComponent,
  ],
  imports: [
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
    TimeagoModule.forRoot(),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LogoutInterceptor,
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
