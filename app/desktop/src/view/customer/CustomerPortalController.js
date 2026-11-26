/**
 * Customer Storefront Portal ViewController.
 * Coordinates storefront navigation (Catalog / My Orders / Cart), active shopper selection,
 * live cart badge counts, and switching back to the Admin Portal.
 *
 * Auth integration:
 *   - On init, reads ShopSphere.util.Auth.getCurrentUser() to pre-set activeCustomerId
 *   - Logout clears the session and re-mounts the login view
 */
Ext.define('ShopSphere.view.customer.CustomerPortalController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.customerportalcontroller',

    requires: [
        'ShopSphere.util.Auth'
    ],

    init: function () {
        var cartStore = Ext.getStore('cart'),
            user      = ShopSphere.util.Auth.getCurrentUser(),
            vm        = this.getViewModel();

        if (cartStore) {
            this.cartListeners = cartStore.on({
                destroyable: true,
                datachanged: 'syncCartCount',
                update: 'syncCartCount',
                scope: this
            });
        }

        // Pre-select the authenticated customer's account automatically
        if (user && user.role === 'customer' && user.customerId) {
            vm.set('activeCustomerId', user.customerId);
        }

        this.syncCartCount();
    },

    destroy: function () {
        Ext.destroy(this.cartListeners);
        this.callParent();
    },

    syncCartCount: function () {
        var cartStore = Ext.getStore('cart'),
            summary = cartStore ? cartStore.getCartSummary() : { itemCount: 0 };

        this.getViewModel().set('cartCount', summary.itemCount);
    },

    activateSection: function (section) {
        var center = this.lookup('shopCenter'),
            vm = this.getViewModel(),
            map = {
                catalog: 'storefrontview',
                orders: 'myordersview',
                cart: 'cartview'
            },
            targetXtype = map[section] || 'storefrontview',
            normalized = map[section] ? section : 'catalog',
            child;

        vm.set('activeSection', normalized);

        if (!center) {
            return;
        }

        child = center.getComponent(targetXtype);
        if (!child) {
            child = center.add({ xtype: targetXtype, itemId: targetXtype });
        }
        center.setActiveItem(child);
    },

    onSectionButtonChange: function (segBtn, value) {
        if (value) {
            this.redirectTo('shop/' + value);
        }
    },

    onOpenCart: function () {
        this.redirectTo('shop/cart');
    },

    onSwitchToAdmin: function () {
        this.redirectTo('homeview');
    },

    /** Logs out and returns to the login screen */
    onLogout: function () {
        ShopSphere.util.Auth.logout();
        Ext.getStore('cart').removeAll();
        this.getView().destroy();
        Ext.Viewport.add([{ xtype: 'loginview' }]);
    }
});
