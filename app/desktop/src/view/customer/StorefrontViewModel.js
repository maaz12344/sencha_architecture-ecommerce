/**
 * Storefront Catalog ViewModel.
 */
Ext.define('ShopSphere.view.customer.StorefrontViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.storefrontviewmodel',

    data: {
        searchText: '',
        categoryFilter: 'All',
        sortBy: 'featured'
    },

    stores: {
        catalog: {
            type: 'chained',
            source: 'products',
            filters: [
                function (rec) {
                    return rec.get('status') === 'Active';
                }
            ]
        }
    }
});
