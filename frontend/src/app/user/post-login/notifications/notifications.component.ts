import { Component, OnInit } from '@angular/core'

import { NotificationService } from './notifications.service'
import { UserService } from '../../../services/user.service'
import { Notification } from 'src/app/models/responses/notification.model'
import { environment } from 'src/environments/environment'

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent implements OnInit {
  spinner = true
  notificationIcon: string
  noNotificationIcon: string
  defaultProfilePicture: string
  notifications: Notification[] = []


  constructor(
    private userService: UserService,
    private notificationService: NotificationService,
  ) {
    this.notificationIcon = environment.NOTIFICATIONS_SPACE
    this.noNotificationIcon = environment.NO_NOTIFICATION_ICON
    this.defaultProfilePicture = userService.getDefaultProfilePicture()
  }

  ngOnInit() {
    this.notificationService.getNotifications()
    this.notificationService.fetching$.subscribe({
      next: data => {
        this.spinner = data
      }
    })
    this.notificationService.notifications$.subscribe({
      next: data => {
        this.notifications = [...data, ...this.notifications]
      }
    })
  }

  toRead(_id: string) {
    this.userService.countDownNotification()
    this.notificationService.markAsRead(_id).subscribe({
      next: data => {
        console.log(data, 37)
      }
    })
  }
  getProfilePicture(notification: any) {
    return notification?.profilePicture || this.defaultProfilePicture
  }
}
