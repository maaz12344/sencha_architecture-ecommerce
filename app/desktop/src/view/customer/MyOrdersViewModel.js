/**
 * Customer My Orders ViewModel.
 *
 * New fields:
 *  - orderSearch   : text typed in the search field (bound two-way)
 *  - statusFilter  : selected status value from the dropdown (default 'All')
 *  - orderCountLabel: formatted count of matching orders (set by the controller)
 *
 * The myOrders ChainedStore is a live slice of the global 'orders' store.
 * Filtering it here never affects the Orders store used by the Admin panel.
 */
Ext.define('ShopSphere.view.customer.MyOrdersViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.myordersviewmodel',

    data: {
        orderSearch:     '',
        statusFilter:    'All',
        orderCountLabel: ''
    },

    stores: {
        myOrders: {
            type: 'chained',
            source: 'orders'
        }
    }
});
