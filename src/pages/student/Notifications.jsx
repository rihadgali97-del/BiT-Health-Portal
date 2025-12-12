import React, { useState, useEffect } from 'react';
import NotificationCard from '../../components/common/NotificationCard';
import { notificationService } from '../../services/notificationService';
import '../../styles/Notifications.css';

const StudentNotifications = ({ user, navigateTo }) => {
    const [notifications, setNotifications] = useState([]);
    const [filter, setFilter] = useState('all');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        loadNotifications();
    }, []);

    const loadNotifications = async () => {
        try {
            setLoading(true);
            setError('');
            const data = await notificationService.getNotifications(user.id, 'students');
            setNotifications(data.notifications || []);
        } catch (err) {
            setError('Failed to load notifications. Please try again.');
            console.error('Error loading notifications:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleMarkAsRead = async (notificationId) => {
        try {
            await notificationService.markAsRead(notificationId);
            setNotifications(prev =>
                prev.map(notification =>
                    notification.id === notificationId
                        ? { ...notification, read: true }
                        : notification
                )
            );
        } catch (err) {
            setError('Failed to mark notification as read.');
            console.error('Error marking notification as read:', err);
        }
    };

    const handleDelete = async (notificationId) => {
        try {
            await notificationService.deleteNotification(notificationId);
            setNotifications(prev =>
                prev.filter(notification => notification.id !== notificationId)
            );
        } catch (err) {
            setError('Failed to delete notification.');
            console.error('Error deleting notification:', err);
        }
    };

    const handleMarkAllAsRead = async () => {
        try {
            await notificationService.markAllAsRead(user.id, 'students');
            setNotifications(prev =>
                prev.map(notification => ({ ...notification, read: true }))
            );
        } catch (err) {
            setError('Failed to mark all notifications as read.');
            console.error('Error marking all notifications as read:', err);
        }
    };

    const handleClearAll = async () => {
        try {
            await notificationService.clearAllNotifications(user.id, 'students');
            setNotifications([]);
        } catch (err) {
            setError('Failed to clear all notifications.');
            console.error('Error clearing all notifications:', err);
        }
    };

    const filteredNotifications = notifications.filter(notification => {
        if (filter === 'all') return true;
        if (filter === 'unread') return !notification.read;
        return notification.type === filter;
    });

    const unreadCount = notifications.filter(n => !n.read).length;

    if (loading) {
        return (
            <div className="notifications-container">
                <div className="notifications-loading">
                    <div className="loading-spinner"></div>
                    <p>Loading notifications...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="notifications-container">
            <div className="notifications-header">
                <button
                    onClick={() => navigateTo('student-dashboard')}
                    className="back-btn"
                >
                    ← Back to Dashboard
                </button>
                <div className="header-content">
                    <h1>Notifications</h1>
                    <p>Stay updated with your health portal activities</p>
                </div>
                <div className="header-actions">
                    {unreadCount > 0 && (
                        <button
                            onClick={handleMarkAllAsRead}
                            className="action-btn secondary"
                        >
                            Mark All as Read
                        </button>
                    )}
                    {notifications.length > 0 && (
                        <button
                            onClick={handleClearAll}
                            className="action-btn danger"
                        >
                            Clear All
                        </button>
                    )}
                </div>
            </div>

            <div className="notifications-content">
                {/* Error Message */}
                {error && (
                    <div className="error-message">
                        {error}
                        <button onClick={() => setError('')} className="error-close">×</button>
                    </div>
                )}

                {/* Stats */}
                <div className="notifications-stats">
                    <div className="stat-card">
                        <span className="stat-number">{notifications.length}</span>
                        <span className="stat-label">Total</span>
                    </div>
                    <div className="stat-card unread">
                        <span className="stat-number">{unreadCount}</span>
                        <span className="stat-label">Unread</span>
                    </div>
                </div>

                {/* Filters */}
                <div className="notifications-filters">
                    <button
                        className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
                        onClick={() => setFilter('all')}
                    >
                        All
                    </button>
                    <button
                        className={`filter-btn ${filter === 'unread' ? 'active' : ''}`}
                        onClick={() => setFilter('unread')}
                    >
                        Unread
                    </button>
                    <button
                        className={`filter-btn ${filter === 'appointment' ? 'active' : ''}`}
                        onClick={() => setFilter('appointment')}
                    >
                        Appointments
                    </button>
                    <button
                        className={`filter-btn ${filter === 'medical' ? 'active' : ''}`}
                        onClick={() => setFilter('medical')}
                    >
                        Medical
                    </button>
                </div>

                {/* Notifications List */}
                <div className="notifications-list">
                    {filteredNotifications.length === 0 ? (
                        <div className="empty-state">
                            <div className="empty-icon">🔔</div>
                            <h3>No notifications</h3>
                            <p>
                                {filter === 'all'
                                    ? "You're all caught up! New notifications will appear here."
                                    : `No ${filter} notifications found.`
                                }
                            </p>
                        </div>
                    ) : (
                        filteredNotifications.map(notification => (
                            <NotificationCard
                                key={notification.id}
                                notification={notification}
                                onMarkAsRead={handleMarkAsRead}
                                onDelete={handleDelete}
                            />
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default StudentNotifications;