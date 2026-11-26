/**
 * ShopSphere.util.Auth — Authentication singleton.
 *
 * Ext JS concept: Ext.define with a singleton:true config creates a single global
 * instance accessible as ShopSphere.util.Auth anywhere in the application.
 *
 * Session storage strategy:
 *   - On login  → serialize the user object (minus password) to localStorage key 'ss_user'
 *   - On logout → clear that key and redirect to login
 *   - On boot   → Application.launch() reads this key to decide which view to mount
 *
 * To upgrade to real JWT auth later:
 *   1. Replace login() with an Ext.Ajax.request to POST /api/auth/login
 *   2. Store the JWT token instead of the user object
 *   3. Add an Ext.Ajax.on('beforerequest') interceptor to inject Authorization header
 */
Ext.define('ShopSphere.util.Auth', {
    singleton: true,

    /** localStorage key used to persist the session */
    SESSION_KEY: 'ss_user',

    /**
     * Attempt a login by matching username+password against the Users store.
     * @param {String} username
     * @param {String} password
     * @returns {Object|null} User data object on success, null on failure
     */
    login: function (username, password) {
        console.log('[AUTH] login attempt — username:', String(username || '').trim().toLowerCase());
        var usersStore = Ext.getStore('users'),
            user = null;

        if (!usersStore) {
            Ext.log.warn('Auth: users store not loaded yet');
            return null;
        }

        console.log('[AUTH] Users store count:', usersStore.getCount());

        usersStore.each(function (rec) {
            var match = (
                rec.get('username') === String(username || '').trim().toLowerCase() &&
                rec.get('password') === String(password || '')
            );
            console.log('[AUTH] comparing against user:', rec.get('username'), '| match:', match);
            if (match) {
                // Store a plain-object snapshot — never keep an Ext.data.Model in localStorage
                user = {
                    id:         rec.get('id'),
                    username:   rec.get('username'),
                    role:       rec.get('role'),
                    name:       rec.get('name'),
                    customerId: rec.get('customerId')
                };
                return false; // break each()
            }
        });

        console.log('[AUTH] login result:', user ? 'authenticated' : 'rejected');

        if (user) {
            try {
                localStorage.setItem(this.SESSION_KEY, JSON.stringify(user));
            } catch (e) {
                Ext.log.warn('Auth: failed to persist session', e);
            }
        }

        return user;
    },

    /**
     * Log out the current user — clears the session and reloads to the login screen.
     * Call this instead of manipulating localStorage directly so we have one place to hook.
     */
    logout: function () {
        try {
            localStorage.removeItem(this.SESSION_KEY);
        } catch (e) { /* ignore */ }
    },

    /**
     * @returns {Object|null} The currently logged-in user data, or null if not logged in.
     */
    getCurrentUser: function () {
        try {
            var raw = localStorage.getItem(this.SESSION_KEY);
            return raw ? JSON.parse(raw) : null;
        } catch (e) {
            return null;
        }
    },

    /** @returns {Boolean} */
    isLoggedIn: function () {
        return this.getCurrentUser() !== null;
    },

    /** @returns {Boolean} True if the current session belongs to an admin user */
    isAdmin: function () {
        var u = this.getCurrentUser();
        return u !== null && u.role === 'admin';
    },

    /** @returns {Boolean} True if the current session belongs to a customer user */
    isCustomer: function () {
        var u = this.getCurrentUser();
        return u !== null && u.role === 'customer';
    }
});
