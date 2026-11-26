/**
 * Inventory & Stock Control ViewModel.
 */
Ext.define('ShopSphere.view.inventory.InventoryViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.inventoryviewmodel',

    data: {
        stockFilter: 'All',
        summaryHtml: ''
    },

    stores: {
        inventory: {
            type: 'chained',
            source: 'products'
        }
    }
});
