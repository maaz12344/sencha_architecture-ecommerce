Ext.define('ShopSphere.view.promotions.PromotionsViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.promotionsviewmodel',

    stores: {
        promotions: {
            type: 'chained',
            source: 'promotions'
        }
    }
});
