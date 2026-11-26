Ext.define('ShopSphere.view.categories.CategoriesViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.categoriesviewmodel',

    stores: {
        categories: {
            type: 'chained',
            source: 'categories'
        }
    }
});
