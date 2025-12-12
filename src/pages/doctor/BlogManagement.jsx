import React, { useState } from 'react';
import '../../styles/Dashboard.css';

const BlogManagement = ({ navigateTo, user }) => {
    const [blogs, setBlogs] = useState([
        {
            id: 1,
            title: "Managing Exam Stress",
            content: "Practical tips to stay healthy and focused during finals week...",
            category: "Mental Health",
            status: "published",
            createdAt: "2024-01-15",
            views: 245
        },
        {
            id: 2,
            title: "Nutrition for Students",
            content: "Healthy eating habits on a student budget...",
            category: "Nutrition",
            status: "draft",
            createdAt: "2024-01-10",
            views: 0
        }
    ]);

    const [showForm, setShowForm] = useState(false);
    const [editingBlog, setEditingBlog] = useState(null);
    const [formData, setFormData] = useState({
        title: '',
        content: '',
        category: '',
        status: 'draft'
    });

    // ADD THIS FUNCTION
    const handleBackToDashboard = () => {
        navigateTo('doctor-dashboard');
    };

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleCreateNew = () => {
        setEditingBlog(null);
        setFormData({
            title: '',
            content: '',
            category: '',
            status: 'draft'
        });
        setShowForm(true);
    };

    const handleEdit = (blog) => {
        setEditingBlog(blog);
        setFormData({
            title: blog.title,
            content: blog.content,
            category: blog.category,
            status: blog.status
        });
        setShowForm(true);
    };

    const handleDelete = (blogId) => {
        if (window.confirm('Are you sure you want to delete this blog post?')) {
            setBlogs(blogs.filter(blog => blog.id !== blogId));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (editingBlog) {
            // Update existing blog
            setBlogs(blogs.map(blog =>
                blog.id === editingBlog.id
                    ? { ...blog, ...formData, updatedAt: new Date().toISOString().split('T')[0] }
                    : blog
            ));
        } else {
            // Create new blog
            const newBlog = {
                id: Date.now(),
                ...formData,
                createdAt: new Date().toISOString().split('T')[0],
                views: 0,
                author: user?.name || 'Dr. ' + user?.email?.split('@')[0]
            };
            setBlogs([newBlog, ...blogs]);
        }

        setShowForm(false);
        setEditingBlog(null);
    };

    const getStatusBadge = (status) => {
        const statusStyles = {
            published: 'status-published',
            draft: 'status-draft',
            archived: 'status-archived'
        };
        return <span className={`status-badge ${statusStyles[status]}`}>{status}</span>;
    };

    return (
        <div className="dashboard-container">
            {/* Header with Back Button */}
            <div className="dashboard-header">
                {/* ADD THIS BACK BUTTON */}
                <button onClick={handleBackToDashboard} className="back-btn">
                    ← Back to Dashboard
                </button>

                <div className="header-content">
                    <h1>Blog Management</h1>
                    <p>Create and manage your health blog posts</p>
                </div>
                <button onClick={handleCreateNew} className="btn btn-primary">
                    + Create New Post
                </button>
            </div>

            {/* Rest of your code remains the same... */}
            {/* Blog Form */}
            {showForm && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h3>{editingBlog ? 'Edit Blog Post' : 'Create New Blog Post'}</h3>
                            <button onClick={() => setShowForm(false)} className="close-btn">×</button>
                        </div>
                        <form onSubmit={handleSubmit} className="blog-form">
                            <div className="form-group">
                                <label>Title *</label>
                                <input
                                    type="text"
                                    name="title"
                                    value={formData.title}
                                    onChange={handleInputChange}
                                    placeholder="Enter blog title"
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label>Category *</label>
                                <select
                                    name="category"
                                    value={formData.category}
                                    onChange={handleInputChange}
                                    required
                                >
                                    <option value="">Select Category</option>
                                    <option value="Mental Health">Mental Health</option>
                                    <option value="Nutrition">Nutrition</option>
                                    <option value="Fitness">Fitness</option>
                                    <option value="Sleep">Sleep & Wellness</option>
                                    <option value="Preventive Care">Preventive Care</option>
                                    <option value="Seasonal Health">Seasonal Health</option>
                                </select>
                            </div>

                            <div className="form-group">
                                <label>Content *</label>
                                <textarea
                                    name="content"
                                    value={formData.content}
                                    onChange={handleInputChange}
                                    placeholder="Write your blog content here..."
                                    rows="6"
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label>Status</label>
                                <select
                                    name="status"
                                    value={formData.status}
                                    onChange={handleInputChange}
                                >
                                    <option value="draft">Draft</option>
                                    <option value="published">Published</option>
                                </select>
                            </div>

                            <div className="form-actions">
                                <button type="button" onClick={() => setShowForm(false)} className="btn btn-secondary">
                                    Cancel
                                </button>
                                <button type="submit" className="btn btn-primary">
                                    {editingBlog ? 'Update Post' : 'Create Post'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Blogs List */}
            <div className="content-section">
                <div className="section-header">
                    <h3>My Blog Posts ({blogs.length})</h3>
                </div>

                {blogs.length === 0 ? (
                    <div className="empty-state">
                        <p>No blog posts yet. Create your first post!</p>
                    </div>
                ) : (
                    <div className="blogs-table">
                        <div className="table-header">
                            <div>Title</div>
                            <div>Category</div>
                            <div>Status</div>
                            <div>Created</div>
                            <div>Views</div>
                            <div>Actions</div>
                        </div>

                        {blogs.map(blog => (
                            <div key={blog.id} className="table-row">
                                <div className="blog-title">
                                    <strong>{blog.title}</strong>
                                </div>
                                <div>{blog.category}</div>
                                <div>{getStatusBadge(blog.status)}</div>
                                <div>{blog.createdAt}</div>
                                <div>{blog.views}</div>
                                <div className="actions">
                                    <button
                                        onClick={() => handleEdit(blog)}
                                        className="btn btn-outline small"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDelete(blog.id)}
                                        className="btn btn-danger small"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Quick Stats */}
            <div className="stats-grid">
                <div className="stat-card">
                    <h3>{blogs.length}</h3>
                    <p>Total Posts</p>
                </div>
                <div className="stat-card">
                    <h3>{blogs.filter(b => b.status === 'published').length}</h3>
                    <p>Published</p>
                </div>
                <div className="stat-card">
                    <h3>{blogs.filter(b => b.status === 'draft').length}</h3>
                    <p>Drafts</p>
                </div>
                <div className="stat-card">
                    <h3>{blogs.reduce((sum, blog) => sum + blog.views, 0)}</h3>
                    <p>Total Views</p>
                </div>
            </div>
        </div>
    );
};

export default BlogManagement;