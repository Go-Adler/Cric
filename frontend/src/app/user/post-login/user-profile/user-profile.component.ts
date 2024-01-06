import { CommonModule } from '@angular/common'
import { Component, OnDestroy, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, ReactiveFormsModule, ValidatorFn, Validators } from '@angular/forms'
import { MatButtonModule } from '@angular/material/button'
import { MatDialog, MatDialogModule } from '@angular/material/dialog'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'
import { Subscription } from 'rxjs'
import { UserService } from 'src/app/services/user.service'
import { ProfileService } from './user-profile.service'
import { MatProgressBarModule } from '@angular/material/progress-bar'

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent implements OnInit, OnDestroy {
  name = '';
  userName = '';
  friendsCount = ''
  fetchComplete = false
  profilePicture: string = '';
  selectedImage: string | undefined
  addProfilePicture: boolean = false;

  private subscriptions: Subscription[] = [];

  constructor(
    private userService: UserService,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {

    // Get profile picture
    this.subscriptions.push(
      this.userService.profilePicture$.subscribe({
        next: (profilePicture) => {
          this.profilePicture = profilePicture
        },
      })
    )

    // Get friends count
    this.subscriptions.push(
      this.userService.friendsCount$.subscribe({
        next: (friendsCount) => {
          this.friendsCount = friendsCount
        },
      })
    )

    // Get name
    this.subscriptions.push(
      this.userService.name$.subscribe({
        next: (name) => {
          this.name = name
        },
      })
    )

    // Get user name
    this.subscriptions.push(
      this.userService.userName$.subscribe((userName) => {
        this.userName = userName
        this.fetchComplete = true
      })
    )
  }

  changeProfilePicture() {
    this.addProfilePicture = true
  }

  closeComponent(closeStatus: boolean) {
    this.addProfilePicture = closeStatus
  }


  editProfile() {
    const dialogRef = this.dialog.open(DialogContentExampleDialog)

    dialogRef.afterClosed().subscribe(result => {
    })
  }
  
  ngOnDestroy(): void {
    // Unsubscribe all subscriptions
    this.subscriptions.forEach((subscription) => subscription.unsubscribe())
  }
}

@Component({
  selector: 'dialog-content-example-dialog',
  templateUrl: 'dialog-content.html',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule, ReactiveFormsModule, MatFormFieldModule, MatProgressBarModule, CommonModule, MatInputModule],
})
export class DialogContentExampleDialog {
  editForm!: FormGroup
  name = '';
  email = ''
  userName = '';
  errorMessage = ''
  phone!: number
  profilePicture = ''
  isSigningUp = false;
  formComplete = false
  updateSuccess = false

  private subscriptions: Subscription[] = [];

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private userProfileService: ProfileService,
  ) { }

  ngOnInit() {
    this.subscriptions.push(
      this.userService.profilePicture$.subscribe({
        next: (profilePicture) => {
          this.profilePicture = profilePicture
        },
      })
    )


    // Get name
    this.subscriptions.push(
      this.userService.name$.subscribe({
        next: (name) => {
          this.name = name
        },
      })
    )

    // Get name
    this.subscriptions.push(
      this.userService.email$.subscribe({
        next: (email) => {
          this.email = email
        },
      })
    )

    // Get name
    this.subscriptions.push(
      this.userService.phone$.subscribe({
        next: (phone) => {
          this.phone = phone
        },
      })
    )

    // Get user name
    this.subscriptions.push(
      this.userService.userName$.subscribe((userName) => {
        this.userName = userName
      })
    )

    if (this.userName) {
      this.editForm = this.fb.group(
        {
          name: [this.name, [Validators.required, Validators.pattern("^[A-Za-z' -]+$")]],
          userName: [
            this.userName,
            [Validators.required, Validators.pattern('^[a-zA-Z0-9_-]+$')],
          ],
          email: [
            this.email,
            [
              Validators.required,
              Validators.pattern(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/),
            ],
          ],
          phone: [this.phone, [Validators.required, Validators.pattern('^[0-9]{10}$')]],
        },
      )
      this.formComplete = true
    }
  }

  formFetched() {
    return this.userName
  }

  onSubmit() {
    if (this.editForm.valid) {
      this.isSigningUp = true
      this.errorMessage = ''

      const formData = { ...this.editForm.value }

      this.userProfileService.updateUserInfo(formData).subscribe({
        next: (response) => {
          this.isSigningUp = false
          if (response.error) {
            this.errorMessage = response.error
          } else {
            this.updateSuccess = true

          }
        },
        error: (error) => {
          this.errorMessage = error.error.message
        },
      })
    } else {
      this.errorMessage = 'Please fill the form correctly'
      setTimeout(() => {
        this.errorMessage = ''
      }, 3000)
    }
  }

  ngOnDestroy(): void {
    // Unsubscribe all subscriptions
    this.subscriptions.forEach((subscription) => subscription.unsubscribe())
  }
}