const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';

export const notificationService = {
    // Get all notifications for user
    async getNotifications(userId, userType) {
        try {
            const response = await fetch(`${API_BASE_URL}/notifications/${userType}/${userId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });

            if (!response.ok) {
                throw new Error('Failed to fetch notifications');
            }

            return await response.json();
        } catch (error) {
            console.error('Error fetching notifications:', error);
            throw error;
        }
    },

    // Mark notification as read
    async markAsRead(notificationId) {
        try {
            const response = await fetch(`${API_BASE_URL}/notifications/${notificationId}/read`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });

            if (!response.ok) {
                throw new Error('Failed to mark notification as read');
            }

            return await response.json();
        } catch (error) {
            console.error('Error marking notification as read:', error);
            throw error;
        }
    },

    // Mark all notifications as read
    async markAllAsRead(userId, userType) {
        try {
            const response = await fetch(`${API_BASE_URL}/notifications/${userType}/${userId}/read-all`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });

            if (!response.ok) {
                throw new Error('Failed to mark all notifications as read');
            }

            return await response.json();
        } catch (error) {
            console.error('Error marking all notifications as read:', error);
            throw error;
        }
    },

    // Delete notification
    async deleteNotification(notificationId) {
        try {
            const response = await fetch(`${API_BASE_URL}/notifications/${notificationId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });

            if (!response.ok) {
                throw new Error('Failed to delete notification');
            }

            return await response.json();
        } catch (error) {
            console.error('Error deleting notification:', error);
            throw error;
        }
    },

    // Clear all notifications
    async clearAllNotifications(userId, userType) {
        try {
            const response = await fetch(`${API_BASE_URL}/notifications/${userType}/${userId}/clear`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });

            if (!response.ok) {
                throw new Error('Failed to clear all notifications');
            }

            return await response.json();
        } catch (error) {
            console.error('Error clearing all notifications:', error);
            throw error;
        }
    }
};