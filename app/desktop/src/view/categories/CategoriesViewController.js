Ext.define('ShopSphere.view.categories.CategoriesViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.categoriesviewcontroller',

    onToggleCategoryTool: function (grid, context) {
        var rec = context && context.record,
            nextActive;

        if (!rec) {
            return;
        }

        nextActive = !rec.get('active');
        rec.set('active', nextActive);
        Ext.toast(
            rec.get('name') + ' is now ' + (nextActive ? 'Active' : 'Inactive') + '.',
            2000
        );
    }
});
