/**
 * Orders Management ViewModel.
 */
Ext.define('ShopSphere.view.orders.OrdersViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.ordersviewmodel',

    data: {
        searchText: '',
        statusFilter: 'All'
    },

    stores: {
        orders: {
            type: 'chained',
            source: 'orders'
        }
    }
});
