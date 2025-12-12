import React, { useState } from 'react';
import '../../styles/Dashboard.css';

const AdminBlogManagement = ({ navigateTo, user }) => {
    const [blogs, setBlogs] = useState([
        {
            id: 1,
            title: "Managing Exam Stress",
            content: "Practical tips to stay healthy and focused during finals week. Learn breathing exercises, time management techniques, and self-care strategies.",
            category: "Mental Health",
            status: "published",
            author: "Dr. Sarah Johnson",
            authorType: "doctor",
            createdAt: "2024-01-15",
            views: 245,
            approved: true,
            featured: false
        },
        {
            id: 2,
            title: "Nutrition for Students",
            content: "Healthy eating habits on a student budget. Discover affordable meal prep ideas and nutrition tips.",
            category: "Nutrition",
            status: "pending",
            author: "Dr. Michael Chen",
            authorType: "doctor",
            createdAt: "2024-01-10",
            views: 0,
            approved: false,
            featured: false
        },
        {
            id: 3,
            title: "Sleep & Academic Performance",
            content: "How quality sleep impacts your grades and mental health. Get tips for better sleep hygiene.",
            category: "Sleep",
            status: "pending",
            author: "Dr. Emily Davis",
            authorType: "doctor",
            createdAt: "2024-01-08",
            views: 0,
            approved: false,
            featured: false
        }
    ]);

    const [filter, setFilter] = useState('pending'); // Default to pending for approval focus
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedBlog, setSelectedBlog] = useState(null);

    // Admin approval functions
    const handleApprove = (blogId) => {
        setBlogs(blogs.map(blog =>
            blog.id === blogId
                ? { ...blog, approved: true, status: 'published' }
                : blog
        ));
        alert('Blog post approved and published!');
    };

    const handleReject = (blogId) => {
        if (window.confirm('Are you sure you want to reject this blog post? It will be deleted permanently.')) {
            setBlogs(blogs.filter(blog => blog.id !== blogId));
        }
    };

    const handleRequestChanges = (blogId) => {
        const changes = prompt('What changes would you like the doctor to make?');
        if (changes) {
            setBlogs(blogs.map(blog =>
                blog.id === blogId
                    ? { ...blog, adminFeedback: changes, status: 'changes-requested' }
                    : blog
            ));
            alert('Feedback sent to doctor!');
        }
    };

    const handleToggleFeatured = (blogId) => {
        setBlogs(blogs.map(blog =>
            blog.id === blogId
                ? { ...blog, featured: !blog.featured }
                : blog
        ));
    };

    const handleViewDetails = (blog) => {
        setSelectedBlog(blog);
    };

    const handleBackToDashboard = () => {
        navigateTo('admin-dashboard');
    };

    // Search functionality
    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    // Filter blogs based on selection and search term
    const filteredBlogs = blogs.filter(blog => {
        const matchesFilter = filter === 'all' ||
            (filter === 'pending' && !blog.approved) ||
            (filter === 'approved' && blog.approved) ||
            (filter === 'featured' && blog.featured);

        const matchesSearch = searchTerm === '' ||
            blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            blog.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
            blog.category.toLowerCase().includes(searchTerm.toLowerCase());

        return matchesFilter && matchesSearch;
    });

    const getStatusBadge = (blog) => {
        if (!blog.approved) {
            if (blog.status === 'changes-requested') {
                return <span className="status-badge status-changes">Changes Requested</span>;
            }
            return <span className="status-badge status-pending">Pending Review</span>;
        }
        const statusStyles = {
            published: 'status-published',
            draft: 'status-draft'
        };
        return <span className={`status-badge ${statusStyles[blog.status]}`}>{blog.status}</span>;
    };

    return (
        <div className="dashboard-container">
            {/* Header */}
            <div className="dashboard-header">
                <button onClick={handleBackToDashboard} className="back-btn">
                    ← Back to Dashboard
                </button>

                <div className="header-content">
                    <h1>Blog Content Management</h1>
                    <p>Review, approve, and manage blog posts from doctors</p>
                </div>
            </div>

            {/* Quick Stats */}
            <div className="stats-grid">
                <div className="stat-card urgent">
                    <h3>{blogs.filter(b => !b.approved).length}</h3>
                    <p>Pending Approval</p>
                </div>
                <div className="stat-card">
                    <h3>{blogs.filter(b => b.approved).length}</h3>
                    <p>Approved Posts</p>
                </div>
                <div className="stat-card">
                    <h3>{blogs.filter(b => b.featured).length}</h3>
                    <p>Featured Posts</p>
                </div>
                <div className="stat-card">
                    <h3>{blogs.reduce((sum, blog) => sum + blog.views, 0)}</h3>
                    <p>Total Views</p>
                </div>
            </div>

            {/* Search and Filter */}
            <div className="admin-controls">
                <div className="search-section">
                    <h4>Search Blog Posts</h4>
                    <div className="search-container">
                        <input
                            type="text"
                            placeholder="Search by title, author, or category..."
                            value={searchTerm}
                            onChange={handleSearchChange}
                            className="search-input"
                        />
                    </div>
                </div>

                <div className="filter-section">
                    <h4>Filter by Status</h4>
                    <div className="filter-buttons">
                        <button
                            onClick={() => setFilter('pending')}
                            className={`filter-btn ${filter === 'pending' ? 'active' : ''}`}
                        >
                            ⏳ Pending ({blogs.filter(b => !b.approved).length})
                        </button>
                        <button
                            onClick={() => setFilter('approved')}
                            className={`filter-btn ${filter === 'approved' ? 'active' : ''}`}
                        >
                            ✅ Approved ({blogs.filter(b => b.approved).length})
                        </button>
                        <button
                            onClick={() => setFilter('all')}
                            className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
                        >
                            📋 All ({blogs.length})
                        </button>
                    </div>
                </div>
            </div>

            {/* Blog Posts for Review */}
            <div className="content-section">
                <div className="section-header">
                    <h3>Blog Posts for Review ({filteredBlogs.length})</h3>
                    <p>{filter === 'pending' ? 'Posts waiting for your approval' : `Showing ${filter} posts`}</p>
                </div>

                {filteredBlogs.length === 0 ? (
                    <div className="empty-state">
                        <p>No blog posts found matching your criteria.</p>
                        {searchTerm && (
                            <button
                                onClick={() => setSearchTerm('')}
                                className="btn btn-outline"
                            >
                                Clear Search
                            </button>
                        )}
                    </div>
                ) : (
                    <div className="blogs-table admin-blogs">
                        <div className="table-header">
                            <div>Blog Post Details</div>
                            <div>Category</div>
                            <div>Status</div>
                            <div>Author</div>
                            <div>Admin Actions</div>
                        </div>

                        {filteredBlogs.map(blog => (
                            <div key={blog.id} className="table-row">
                                <div className="blog-info">
                                    <strong>{blog.title}</strong>
                                    <small>{blog.content.substring(0, 100)}...</small>
                                    <button
                                        onClick={() => handleViewDetails(blog)}
                                        className="view-details-btn"
                                    >
                                        View Full Content
                                    </button>
                                    {blog.featured && <span className="featured-badge">⭐ Featured</span>}
                                    {blog.adminFeedback && (
                                        <div className="admin-feedback">
                                            <strong>Your Feedback:</strong> {blog.adminFeedback}
                                        </div>
                                    )}
                                </div>
                                <div>{blog.category}</div>
                                <div>{getStatusBadge(blog)}</div>
                                <div>
                                    <strong>{blog.author}</strong>
                                    <br />
                                    <small>{blog.createdAt}</small>
                                </div>
                                <div className="admin-actions">
                                    {!blog.approved ? (
                                        <div className="approval-actions">
                                            <button
                                                onClick={() => handleApprove(blog.id)}
                                                className="btn btn-success"
                                            >
                                                ✅ Approve & Publish
                                            </button>
                                            <button
                                                onClick={() => handleRequestChanges(blog.id)}
                                                className="btn btn-warning"
                                            >
                                                ✏️ Request Changes
                                            </button>
                                            <button
                                                onClick={() => handleReject(blog.id)}
                                                className="btn btn-danger"
                                            >
                                                ❌ Reject
                                            </button>
                                        </div>
                                    ) : (
                                        <div className="management-actions">
                                            <button
                                                onClick={() => handleToggleFeatured(blog.id)}
                                                className={`btn ${blog.featured ? 'btn-secondary' : 'btn-outline'}`}
                                            >
                                                {blog.featured ? '⭐ Unfeature' : '⭐ Feature'}
                                            </button>
                                            <button className="btn btn-outline">
                                                📊 View Stats
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Blog Detail Modal */}
            {selectedBlog && (
                <div className="modal-overlay">
                    <div className="modal-content large">
                        <div className="modal-header">
                            <h3>{selectedBlog.title}</h3>
                            <button onClick={() => setSelectedBlog(null)} className="close-btn">×</button>
                        </div>
                        <div className="modal-body">
                            <div className="blog-details">
                                <p><strong>Author:</strong> {selectedBlog.author}</p>
                                <p><strong>Category:</strong> {selectedBlog.category}</p>
                                <p><strong>Status:</strong> {getStatusBadge(selectedBlog)}</p>
                                <p><strong>Created:</strong> {selectedBlog.createdAt}</p>
                                <div className="blog-content">
                                    <h4>Content:</h4>
                                    <p>{selectedBlog.content}</p>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            {!selectedBlog.approved && (
                                <div className="action-buttons">
                                    <button
                                        onClick={() => handleApprove(selectedBlog.id)}
                                        className="btn btn-success large"
                                    >
                                        ✅ Approve & Publish
                                    </button>
                                    <button
                                        onClick={() => handleRequestChanges(selectedBlog.id)}
                                        className="btn btn-warning large"
                                    >
                                        ✏️ Request Changes
                                    </button>
                                    <button
                                        onClick={() => handleReject(selectedBlog.id)}
                                        className="btn btn-danger large"
                                    >
                                        ❌ Reject Post
                                    </button>
                                </div>
                            )}
                            <button
                                onClick={() => setSelectedBlog(null)}
                                className="btn btn-secondary"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminBlogManagement;