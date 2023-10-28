import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button'
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog'
import { UserService } from 'src/app/services/user.service'
// import { LogOutService } from '../user/auth/log-in/log-out.service'

@Component({
  selector: 'app-top-nav',
  templateUrl: './top-nav.component.html',
  styleUrls: ['./top-nav.component.scss']
})
export class TopNavComponent implements OnInit{
  profilePicture: string = ''
  userName: string = '';
  logOutPill: boolean = false;

  constructor(
    private userService: UserService,
    public dialog: MatDialog
  ) {}
  
  ngOnInit(): void {
    this.userService.profilePicture$.subscribe({
      next: profilePicture => {
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
  templateUrl: 'dialog-animations-example-dialog.html',
  styleUrls: ['./side-nav.component.scss'],
  standalone: true,
  imports: [MatDialogModule, MatButtonModule],
})
export class DialogAnimationsExampleDialog {
  // constructor(public dialogRef: MatDialogRef<DialogAnimationsExampleDialog>, public logOutService: LogOutService) { }

  logOut() {
    // this.logOutService.logOut()
  }
}

