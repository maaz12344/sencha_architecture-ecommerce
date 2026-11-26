/**
 * LoginViewController — handles credential validation and navigation after login.
 *
 * Ext JS MVVM concept: ViewControllers own the event-handling logic for their view.
 * They can fire events that bubble up to parent controllers (here: Application.js listens).
 *
 * Pattern used here:
 *   1. Read username/password from the ViewModel
 *   2. Call Auth.login() — returns a user object on success, null on failure
 *   3. On success: fire 'loginsuccess' (the Application catches this and mounts the right view)
 *   4. On failure: show inline error via ViewModel
 */
Ext.define('ShopSphere.view.login.LoginViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.loginviewcontroller',

    requires: [
        'ShopSphere.util.Auth'
    ],

    /**
     * Called by the Sign In button and the quick-login pills.
     * @param {String} [quickUsername] If provided, skips the form and logs in directly.
     * @param {String} [quickPassword]
     */
    doLogin: function (quickUsername, quickPassword) {
        var vm       = this.getViewModel(),
            username,
            password,
            user,
            form;

        if (quickUsername) {
            username = quickUsername;
            password = quickPassword;
        } else {
            form = this.lookup('loginForm');
            if (form) {
                username = String(form.down('textfield').getValue() || '').trim();
                password = String(form.down('passwordfield').getValue() || '');
                console.log('[LOGIN] Read directly from form fields — username:', username, '| password set:', !!password);
            } else {
                username = String(vm.get('username') || '').trim();
                password = String(vm.get('password') || '');
                console.log('[LOGIN] Form lookup failed, falling back to ViewModel — username:', username, '| password set:', !!password);
            }
        }

        console.log('[LOGIN] Users store loaded:', !!Ext.getStore('users'));
        var usersStore = Ext.getStore('users');
        if (usersStore) {
            console.log('[LOGIN] Users store count:', usersStore.getCount());
            usersStore.each(function (rec) {
                console.log('[LOGIN] Stored user — username:', rec.get('username'), '| role:', rec.get('role'));
            });
        }

        if (!username || !password) {
            vm.set({ showError: true, errorMessage: 'Please enter both username and password.' });
            return;
        }

        user = ShopSphere.util.Auth.login(username, password);

        console.log('[LOGIN] Auth.login result:', user ? 'SUCCESS (' + user.username + ' / ' + user.role + ')' : 'FAILED');

        if (!user) {
            vm.set({ showError: true, errorMessage: 'Invalid username or password. Try again.' });
            return;
        }

        // Clear any previous error
        vm.set({ showError: false, errorMessage: '' });

        // Bubble the event up — Application.js catches it and mounts the correct view
        this.fireEvent('loginsuccess', user);
    },

    onLogin: function () {
        this.doLogin();
    },

    /** Quick-access pill: logs in as the admin user immediately */
    onQuickAdmin: function () {
        this.doLogin('admin', 'admin123');
    },

    /** Quick-access pill: logs in as the customer John Smith immediately */
    onQuickCustomer: function () {
        this.doLogin('john', 'john123');
    }
});
