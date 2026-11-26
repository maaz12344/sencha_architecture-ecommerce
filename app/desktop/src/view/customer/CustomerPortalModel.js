/**
 * Customer Storefront Portal ViewModel.
 * Holds the active shopper profile, navigation section, and live cart badge count.
 */
Ext.define('ShopSphere.view.customer.CustomerPortalModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.customerportalmodel',

    data: {
        activeSection: 'catalog',
        activeCustomerId: 1,
        cartCount: 0
    },

    formulas: {
        cartButtonText: function (get) {
            return 'Cart (' + (get('cartCount') || 0) + ')';
        }
    },

    stores: {
        shopperAccounts: {
            type: 'chained',
            source: 'customers'
        }
    }
});
