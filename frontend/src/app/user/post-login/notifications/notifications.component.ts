import { Component, OnInit } from '@angular/core';
import { NotificationService } from './notifications.service'

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent implements OnInit{
  constructor(private notificationService: NotificationService) {}
  notifications: any = []
  
  ngOnInit() {
    this.notificationService.getNotifications().subscribe({
      next: (response) => {
        const notifications = response.notifications
        this.notifications.push(...notifications)
     }
   })
  }
}
