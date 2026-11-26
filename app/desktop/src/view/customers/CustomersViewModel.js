/**
 * Customers CRM ViewModel.
 */
Ext.define('ShopSphere.view.customers.CustomersViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.customersviewmodel',

    data: {
        searchText: '',
        segmentFilter: 'All'
    },

    stores: {
        customers: {
            type: 'chained',
            source: 'customers'
        }
    }
});
