/**
 * ShopSphere Application entry point.
 *
 * Ext JS concept: Ext.app.Application is the root singleton that:
 *   1. Registers global stores (accessible everywhere via Ext.getStore('storeId'))
 *   2. Sets the default hash route (defaultToken)
 *   3. Runs launch() after all classes are loaded
 *
 * Authentication flow:
 *   - On first visit (no session): mount LoginView
 *   - On login success (admin):    destroy LoginView, mount MainView  → route to homeview
 *   - On login success (customer): destroy LoginView, mount CustomerPortalView → route to shop/catalog
 *   - On logout (any role):        destroy current shell, re-mount LoginView
 */
Ext.define('ShopSphere.Application', {
    extend: 'Ext.app.Application',
    name:   'ShopSphere',

    requires: [
        'ShopSphere.*',
        'Ext.Toast',
        'ShopSphere.util.Auth'
    ],

    // ── Application-level stores ────────────────────────────────────────────
    // Short names are resolved as ShopSphere.store.<Name> by Sencha Cmd automatically.
    stores: [
        'Products',
        'Categories',
        'Orders',
        'Customers',
        'Promotions',
        'Cart',
        'Users',      // ← authentication users
        'OrderItems'  // ← line-item breakdown per order
    ],

    defaultToken: 'homeview',

    // ── Lifecycle ───────────────────────────────────────────────────────────

    removeSplash: function () {
        Ext.getBody().removeCls('launching');
        var elem = document.getElementById('splash');
        if (elem) { elem.parentNode.removeChild(elem); }
    },

    launch: function () {
        this.removeSplash();

        var user = ShopSphere.util.Auth.getCurrentUser();

        if (!user) {
            // ── Not logged in → show login screen ──────────────────────────
            this.mountLogin();
        } else if (user.role === 'admin') {
            // ── Returning admin session ────────────────────────────────────
            this.mountAdmin();
        } else {
            // ── Returning customer session ─────────────────────────────────
            this.mountCustomer(user);
        }
    },

    // ── Mount helpers ───────────────────────────────────────────────────────

    mountLogin: function () {
        var me = this,
            loginView = Ext.Viewport.add({ xtype: 'loginview' });

        // Listen for the event fired by LoginViewController.doLogin() on success
        loginView.getController().on('loginsuccess', function (user) {
            loginView.destroy();

            if (user.role === 'admin') {
                me.mountAdmin();
            } else {
                me.mountCustomer(user);
            }
        }, me, { single: true });
    },

    mountAdmin: function () {
        // Add MainView to Viewport and make it active; the router will pick up the hash
        var mainView = Ext.Viewport.down('mainview');
        if (!mainView) {
            mainView = Ext.Viewport.add({ xtype: 'mainview' });
        }
        Ext.Viewport.setActiveItem(mainView);
        this.redirectTo('homeview');
    },

    mountCustomer: function (user) {
        // Pre-activate the right shopper in the portal ViewModel after it renders
        var portal = Ext.Viewport.down('customerportalview');
        if (!portal) {
            portal = Ext.Viewport.add({ xtype: 'customerportalview' });
        }
        Ext.Viewport.setActiveItem(portal);

        // Set the authenticated customer's id into the portal ViewModel
        if (user && user.customerId) {
            var vm = portal.getViewModel();
            if (vm) {
                vm.set('activeCustomerId', user.customerId);
            }
        }

        this.redirectTo('shop/catalog');
    },

    // ── App update prompt ───────────────────────────────────────────────────

    onAppUpdate: function () {
        Ext.Msg.confirm('Application Update', 'This application has an update, reload?',
            function (choice) {
                if (choice === 'yes') {
                    window.location.reload();
                }
            }
        );
    }
});
