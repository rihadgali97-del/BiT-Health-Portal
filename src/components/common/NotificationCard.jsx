import React from 'react';
import '../../styles/NotificationCard.css';
//import Navbar from'../../components/common/Navbar'
//import Footer from'../../components/common/Footer'

const NotificationCard = ({ notification, onMarkAsRead, onDelete }) => {
    const getNotificationIcon = (type) => {
        switch (type) {
            case 'appointment':
                return '📅';
            case 'prescription':
                return '💊';
            case 'medical':
                return '🏥';
            case 'system':
                return '🔔';
            case 'reminder':
                return '⏰';
            case 'emergency':
                return '🚨';
            default:
                return '📢';
        }
    };

    const getPriorityColor = (priority) => {
        switch (priority) {
            case 'high':
                return 'priority-high';
            case 'medium':
                return 'priority-medium';
            case 'low':
                return 'priority-low';
            default:
                return 'priority-low';
        }
    };

    const formatTime = (timestamp) => {
        const now = new Date();
        const notificationTime = new Date(timestamp);
        const diffInHours = (now - notificationTime) / (1000 * 60 * 60);

        if (diffInHours < 1) {
            const minutes = Math.floor(diffInHours * 60);
            return `${minutes}m ago`;
        } else if (diffInHours < 24) {
            return `${Math.floor(diffInHours)}h ago`;
        } else {
            return notificationTime.toLocaleDateString();
        }
    };

    return (
        <div className={`notification-card ${!notification.read ? 'unread' : ''} ${getPriorityColor(notification.priority)}`}>
            <div className="notification-icon">
                {getNotificationIcon(notification.type)}
            </div>

            <div className="notification-content">
                <div className="notification-header">
                    <h4 className="notification-title">{notification.title}</h4>
                    <span className="notification-time">{formatTime(notification.timestamp)}</span>
                </div>

                <p className="notification-message">{notification.message}</p>

                {notification.actionUrl && (
                    <div className="notification-actions">
                        <button
                            onClick={() => window.location.href = notification.actionUrl}
                            className="action-btn"
                        >
                            View Details
                        </button>
                    </div>
                )}
            </div>

            <div className="notification-controls">
                {!notification.read && (
                    <button
                        onClick={() => onMarkAsRead(notification.id)}
                        className="control-btn mark-read"
                        title="Mark as read"
                    >
                        ✓
                    </button>
                )}
                <button
                    onClick={() => onDelete(notification.id)}
                    className="control-btn delete"
                    title="Delete notification"
                >
                    ×
                </button>
            </div>
        </div>
    );
};

export default NotificationCard;