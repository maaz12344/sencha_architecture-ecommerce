Ext.define('ShopSphere.view.promotions.PromotionsViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.promotionsviewcontroller',

    onTogglePromoTool: function (grid, context) {
        var rec = context && context.record,
            nextActive;

        if (!rec) {
            return;
        }

        nextActive = !rec.get('active');
        rec.set('active', nextActive);
        Ext.toast(
            'Promo ' + rec.get('code') + ' ' + (nextActive ? 'activated' : 'paused') + '.',
            2000
        );
    }
});
