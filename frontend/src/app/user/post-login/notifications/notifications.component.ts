import { Component, OnInit } from '@angular/core';

import { NotificationService } from './notifications.service'
import { UserService } from '../../../services/user.service'

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent implements OnInit{
  defaultProfilePicture: string

  constructor(
    private notificationService: NotificationService,
    private userService: UserService,
    ) {
    this.defaultProfilePicture = userService.getDefaultProfilePicture()
  }
  notifications: any = []
  
  ngOnInit() {
    this.notificationService.getNotifications().subscribe({
      next: (response) => {
        console.log(response);
        const notification = response.notifications
        this.notifications.push(...notifications)
     }
   })
  }

  getProfilePicture(notification: any) {
    return notification?.profilePicture || this.defaultProfilePicture;
  }
}
