import { Component, OnInit, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button'
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog'
import { MatMenuTrigger } from '@angular/material/menu';
import { UserService } from 'src/app/services/user.service';
import { LogOutService } from '../../auth/log-in/log-out.service';
import { SocketService } from 'src/app/services/socket.service'

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss'],
})
export class SideNavComponent implements OnInit {
  notificationCount: number = 0
  profilePicture: string = '';
  name: string = '';
  userName: string = '';
  logOutPill: boolean = false;
  friendsActive: boolean = false
  private socket: any = ''


  @ViewChild('menuTrigger') menuTrigger!: MatMenuTrigger;

  // Injecting UserService and MatDialog in the constructor
  constructor(
    private userService: UserService,
    public dialog: MatDialog,
    private socketService: SocketService) {
}

  ngOnInit(): void {

    this.userService.notificationsCount$.subscribe({
      next: (notificationCount) => {
        this.notificationCount = notificationCount
      }
    })

    // Subscribing to profilePicture$ observable to get the profile picture
    this.userService.profilePicture$.subscribe({
      next: (profilePicture) => {
        this.profilePicture = profilePicture;
      }
    });

    // Subscribing to name$ observable to get the name
    this.userService.name$.subscribe({
      next: (name) => {
        this.name = name;
      }
    });

    // Get user name
    this.userService.userName$.subscribe({
      next: (userName) => {
        this.userName = userName;
        if (this.socket?.id === undefined) {
          console.log(userName, 60);
          this.socket = this.socketService.connect(userName)
        }
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
  constructor(public dialogRef: MatDialogRef<DialogAnimationsExampleDialog>, public logOutService: LogOutService) { }

  logOut() {
    this.logOutService.logOut()
  }
}
