/**
 * Products Catalog ViewModel.
 * Uses a ChainedStore sourced from the global 'products' store so filtering
 * the catalog never mutates Dashboard or Inventory store views.
 */
Ext.define('ShopSphere.view.products.ProductsViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.productsviewmodel',

    data: {
        searchText: '',
        categoryFilter: 'All',
        statusFilter: 'All'
    },

    stores: {
        products: {
            type: 'chained',
            source: 'products'
        }
    }
});
