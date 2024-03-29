import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button'
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog'
import { UserService } from 'src/app/services/user.service'
import { LogOutService } from '../../auth/log-in/log-out.service'
import { environment } from '../../../../environments/environment'

@Component({
  selector: 'app-top-nav',
  templateUrl: './top-nav.component.html',
  styleUrls: ['./top-nav.component.scss']
})
export class TopNavComponent implements OnInit{
  profilePicture: string = ''
  userName: string = '';
  logOutPill: boolean = false;
  logo: string

  constructor(
    private userService: UserService,
    public dialog: MatDialog
  ) {
    this.logo = environment.CRIC_LOGO
  }
  
  ngOnInit(): void {
    this.userService.profilePicture$.subscribe({
      next:  profilePicture => {
        this.profilePicture = profilePicture
      }
    })

     // Get user name
    this.userService.userName$.subscribe({
       next: (userName) => {
        this.userName = userName;
      }
     });
  }

  showLogOut() {
    this.logOutPill = !this.logOutPill
  }

  openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(DialogAnimationsExampleDialog, {
      width: '250px',
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }
}

@Component({
  selector: 'dialog-animations-example-dialog',
  templateUrl: 'dialog-animations-example-dialog.html',
  styleUrls: ['./side-nav.component.scss'],
  standalone: true,
  imports: [MatDialogModule, MatButtonModule],
})
export class DialogAnimationsExampleDialog {
  logOutImage
  constructor(public dialogRef: MatDialogRef<DialogAnimationsExampleDialog>, public logOutService: LogOutService) {
    this.logOutImage = environment.LOG_OUT_IMAGE
  }

  logOut() {
    this.logOutService.logOut()
  }
}

