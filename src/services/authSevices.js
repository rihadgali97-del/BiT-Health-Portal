import API from './api';

const authService = {
    // Login with backend
    async login(email, password) {
        try {
            console.log('🔐 Attempting login:', email);

            const response = await API.post('/auth/login', {
                email: email,
                password: password
            });

            const data = response.data;

            if (data.success) {
                // Create user object for localStorage
                const user = {
                    id: data.userId,
                    name: data.name || email.split('@')[0],
                    email: email,
                    role: data.role || 'STUDENT',
                    // We'll add JWT token later
                    token: 'temp-token-' + Date.now()
                };

                // Save to localStorage
                localStorage.setItem('user', JSON.stringify(user));

                console.log('✅ Login successful:', user);
                return {
                    success: true,
                    user: user,
                    message: data.message || 'Login successful'
                };
            } else {
                console.log('❌ Login failed:', data.message);
                return {
                    success: false,
                    message: data.message || 'Login failed'
                };
            }
        } catch (error) {
            console.error('❌ Login error:', error);
            return {
                success: false,
                message: error.response?.data?.message || 'Server connection failed'
            };
        }
    },

    // Register with backend
    async register(userData) {
        try {
            console.log('📝 Attempting registration:', userData.email);

            const response = await API.post('/auth/register', userData);
            const data = response.data;

            if (data.success) {
                console.log('✅ Registration successful');

                // Auto-login after successful registration
                return await this.login(userData.email, userData.password);
            } else {
                console.log('❌ Registration failed:', data.message);
                return {
                    success: false,
                    message: data.message || 'Registration failed'
                };
            }
        } catch (error) {
            console.error('❌ Registration error:', error);
            return {
                success: false,
                message: error.response?.data?.message || 'Server connection failed'
            };
        }
    },

    // Logout
    logout() {
        localStorage.removeItem('user');
        console.log('👋 User logged out');
    },

    // Get current user from localStorage
    getCurrentUser() {
        try {
            const userStr = localStorage.getItem('user');
            return userStr ? JSON.parse(userStr) : null;
        } catch (error) {
            console.error('❌ Error parsing user:', error);
            return null;
        }
    },

    // Check if user is authenticated
    isAuthenticated() {
        return this.getCurrentUser() !== null;
    },

    // Check user role
    hasRole(role) {
        const user = this.getCurrentUser();
        return user && user.role === role;
    },

    // Check backend health
    async checkBackendHealth() {
        try {
            const response = await API.get('/health');
            return {
                connected: true,
                status: response.data.status,
                service: response.data.service
            };
        } catch (error) {
            return {
                connected: false,
                error: error.message
            };
        }
    }
};

export default authService;