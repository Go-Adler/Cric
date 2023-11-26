import { Component, OnInit } from '@angular/core';

import { NotificationService } from './notifications.service'
import { UserService } from '../../../services/user.service'
import { Notification } from 'src/app/models/responses/notification.model';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent implements OnInit{
  defaultProfilePicture: string
  spinner = true

  constructor(
    private notificationService: NotificationService,
    private userService: UserService,
    ) {
    this.defaultProfilePicture = userService.getDefaultProfilePicture()
  }
  notifications: Notification[] = []
  
  ngOnInit() {
    this.notificationService.getNotifications().subscribe({
      next: (response) => {
        this.spinner = false
        const { notifications } = response
        this.notifications.push(...notifications)
     }
   })
  }

  toRead(_id: string) {
    
  }
  getProfilePicture(notification: any) {
    return notification?.profilePicture || this.defaultProfilePicture;
  }
}
