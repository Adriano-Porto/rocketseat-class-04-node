import { NotificationsRepository } from "@/domain/notifications/application/repositories/notifications-repository"
import { Notification } from "@/domain/notifications/enterprise/entities/notification"

export class InMemoryNotificationsRepository implements NotificationsRepository {
    public items: Notification[] = []
    
    constructor () {}

    async create(notification: Notification) {
        this.items.push(notification)
    }

    async save(notification: Notification) {
        const itemIndex = this.items.findIndex((item) => item.id === notification.id)
        this.items[itemIndex] = notification
    }

    async findById(id: string): Promise<Notification | null> {
        const notification = this.items.find(item => item.id.toString() === id)
        if (!notification) return null

        return notification
    }

}
