import { Component, OnInit, ViewChild } from '@angular/core'
import { MatButtonModule } from '@angular/material/button'
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog'
import { MatMenuTrigger } from '@angular/material/menu'
import { UserService } from 'src/app/services/user.service'
import { LogOutService } from '../../auth/log-in/log-out.service'
import { SocketService } from 'src/app/services/socket.service'
import { environment } from 'src/environments/environment'

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss'],
})
export class SideNavComponent implements OnInit {
  name = ''
  userName = ''
  logOutPill = false
  profilePicture = ''
  messagesCount = 0
  notificationCount = 0
  friendsActive: boolean = false
  logOutImage = environment.LOG_OUT_IMAGE


  @ViewChild('menuTrigger') menuTrigger!: MatMenuTrigger

  // Injecting UserService and MatDialog in the constructor
  constructor (
      private userService: UserService,
      public dialog: MatDialog
    ) {

  }

  ngOnInit(): void {
    this.userService.notificationsCount$.subscribe({
      next: (notificationCount) => {
        this.notificationCount = notificationCount
      }
    })

    this.userService.messagesCount$.subscribe({
      next: (messagesCount) => {
        this.messagesCount = messagesCount
      }
    })

    // Subscribing to profilePicture$ observable to get the profile picture
    this.userService.profilePicture$.subscribe({
      next: (profilePicture) => {
        this.profilePicture = profilePicture
      }
    })

    // Subscribing to name$ observable to get the name
    this.userService.name$.subscribe({
      next: (name) => {
        this.name = name
      }
    })

    // Get user name
    this.userService.userName$.subscribe({
      next: (userName) => {
        this.userName = userName
      }
    })
  }

  showLogOut() {
    this.logOutPill = !this.logOutPill
  }

  openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(DialogAnimationsExampleDialog, {
      width: '250px',
      enterAnimationDuration,
      exitAnimationDuration,
    })
  }

}


@Component({
  templateUrl: 'dialog-animations-example-dialog.html',
  styleUrls: ['./side-nav.component.scss'],
  standalone: true,
  imports: [MatDialogModule, MatButtonModule],
})
export class DialogAnimationsExampleDialog {
  logOutImage = environment.LOG_OUT_IMAGE
  constructor(public dialogRef: MatDialogRef<DialogAnimationsExampleDialog>, public logOutService: LogOutService) { }

  logOut() {
    this.logOutService.logOut()
  }
}
