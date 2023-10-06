import { Component, OnInit, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button'
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog'
import { MatMenuTrigger } from '@angular/material/menu';
import { UserService } from 'src/app/services/user.service';
// import { LogOutService } from '../user/auth/log-in/log-out.service'

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss'],
})
export class SideNavComponent implements OnInit {
  profilePicture: string = '';
  name: string = '';
  userName: string = '';
  logOutPill: boolean = false;

  @ViewChild('menuTrigger') menuTrigger!: MatMenuTrigger;

  // Injecting UserService and MatDialog in the constructor
  constructor(private userService: UserService, public dialog: MatDialog) {}

  ngOnInit(): void {
    // Subscribing to profilePicture$ observable to get the profile picture
    this.userService.profilePicture$.subscribe((profilePicture) => {
      this.profilePicture = profilePicture;
    });

    // Subscribing to name$ observable to get the name
    this.userService.name$.subscribe((name) => {
      this.name = name;
    });

    // Get user name
    this.userService.userName$.subscribe((userName) => {
      this.userName = userName;
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
  // constructor(public dialogRef: MatDialogRef<DialogAnimationsExampleDialog>, public logOutService: LogOutService) { }

  logOut() {
    // this.logOutService.logOut()
  }
}
