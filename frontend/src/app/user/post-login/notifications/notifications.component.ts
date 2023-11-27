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
  notifications: Notification[] = []

  constructor(
    private notificationService: NotificationService,
    private userService: UserService,
    ) {
    this.defaultProfilePicture = userService.getDefaultProfilePicture()
  }
  
  ngOnInit() {
    this.notificationService.getNotifications()
    this.notificationService.notifications$.subscribe({
      next: data => {
        this.notifications = [...data, ...this.notifications]
      }
    })
  }

  toRead(_id: string) {
    this.notificationService.markAsRead(_id).subscribe({
      next: data => {
        console.log(data, 37);
      }
    })
  }
  getProfilePicture(notification: any) {
    return notification?.profilePicture || this.defaultProfilePicture;
  }
}
