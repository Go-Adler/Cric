"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationController = void 0;
const user_notification_useCase_1 = require("../../application/useCases/user.notification.useCase");
const user_getAwsUrl_useCase_1 = require("../../application/useCases/user.getAwsUrl.useCase");
class NotificationController {
    constructor() {
        this.getNotifications = async (req, res, next) => {
            const { userId } = req.user;
            try {
                let notifications = await this.notificationUseCase.getNotifications(userId);
                await this.getAwsUrlUseCase.getNotificationsWithProfileUrl(notifications);
                res.json({ notifications });
            }
            catch (e) {
                console.log(`Error in get notification, user data controller: ${e.message}`);
                return next(e);
            }
        };
        this.markAsRead = async (req, res, next) => {
            const { userId } = req.user;
            const { notificationId } = req.body;
            try {
                const updatedNotification = await this.notificationUseCase.markAsRead(userId, notificationId);
                res.json({ success: true, message: "Notification marked as read successfully", updatedNotification });
            }
            catch (e) {
                console.log(`Error in get notification, user data controller: ${e.message}`);
                return next(e);
            }
        };
        this.notificationUseCase = new user_notification_useCase_1.NotificationUseCase();
        this.getAwsUrlUseCase = new user_getAwsUrl_useCase_1.GetAwsUrlUseCase();
    }
}
exports.NotificationController = NotificationController;
