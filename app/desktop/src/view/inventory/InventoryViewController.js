/**
 * Inventory & Stock Control ViewController.
 */
Ext.define('ShopSphere.view.inventory.InventoryViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.inventoryviewcontroller',

    requires: [
        'ShopSphere.util.Format'
    ],

    init: function () {
        var master = Ext.getStore('products');
        if (master) {
            this.masterListeners = master.on({
                destroyable: true,
                datachanged: 'updateSummary',
                update: 'updateSummary',
                scope: this
            });
        }
        this.updateSummary();
    },

    destroy: function () {
        Ext.destroy(this.masterListeners);
        this.callParent();
    },

    updateSummary: function () {
        var master = Ext.getStore('products'),
            totalValue = 0,
            alerts = 0;

        if (master) {
            master.each(function (rec) {
                totalValue += Number(rec.get('inventoryValue')) || 0;
                if (rec.get('stockState') !== 'In Stock') {
                    alerts += 1;
                }
            });
        }

        this.getViewModel().set(
            'summaryHtml',
            '<span class="ss-summary-pill">Valuation: <strong>' +
                ShopSphere.util.Format.currency(totalValue) +
            '</strong></span>' +
            '<span class="ss-summary-pill ss-summary-pill--warn">Restock Alerts: <strong>' +
                alerts +
            '</strong></span>'
        );
    },

    onStockFilterChange: function (segBtn, value) {
        var store = this.getViewModel().getStore('inventory'),
            filter = value || 'All';

        if (!store) {
            return;
        }

        store.clearFilter(true);
        if (filter === 'Alerts') {
            store.filterBy(function (rec) {
                return rec.get('stockState') !== 'In Stock';
            });
        } else if (filter === 'Out') {
            store.filterBy(function (rec) {
                return rec.get('stockState') === 'Out of Stock';
            });
        }
    },

    onRestockTool: function (grid, context) {
        var rec = context && context.record,
            newStock;

        if (!rec) {
            return;
        }

        newStock = (Number(rec.get('stock')) || 0) + 10;
        rec.set('stock', newStock);
        Ext.toast('Restocked ' + rec.get('sku') + ' (+10 → ' + newStock + ' units).', 2200);
    }
});
