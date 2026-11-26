/**
 * Orders Management ViewController.
 */
Ext.define('ShopSphere.view.orders.OrdersViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.ordersviewcontroller',

    requires: [
        'ShopSphere.util.Format'
    ],

    statusPipeline: ['Pending', 'Processing', 'Shipped', 'Delivered'],

    onFilterChange: function () {
        var vm = this.getViewModel(),
            store = vm.getStore('orders'),
            search = String(vm.get('searchText') || '').toLowerCase().trim(),
            status = vm.get('statusFilter') || 'All';

        if (!store) {
            return;
        }

        store.clearFilter(true);
        store.filterBy(function (rec) {
            var matchesSearch = !search ||
                String(rec.get('orderNumber')).toLowerCase().indexOf(search) !== -1 ||
                String(rec.get('customerName')).toLowerCase().indexOf(search) !== -1 ||
                String(rec.get('shippingCity')).toLowerCase().indexOf(search) !== -1;

            var matchesStatus = status === 'All' || rec.get('status') === status;
            return matchesSearch && matchesStatus;
        });
    },

    onStatusFilterChange: function (segBtn, value) {
        this.getViewModel().set('statusFilter', value || 'All');
        this.onFilterChange();
    },

    onOrderSelect: function (grid, selected) {
        var rec = Ext.isArray(selected) ? selected[0] : selected;
        if (!rec) {
            return;
        }

        this.fireEvent('showdetail', {
            entityType: 'Order',
            title: rec.get('orderNumber'),
            subtitle: rec.get('customerName') + ' • ' + rec.get('customerEmail'),
            badgeHtml: ShopSphere.util.Format.statusBadge(rec.get('status')),
            rows: [
                { label: 'Order Date', value: ShopSphere.util.Format.shortDate(rec.get('orderDate')) },
                { label: 'Line Items', value: String(rec.get('itemsCount')) },
                { label: 'Subtotal', value: ShopSphere.util.Format.currency(rec.get('subtotal')) },
                { label: 'Tax', value: ShopSphere.util.Format.currency(rec.get('tax')) },
                { label: 'Shipping', value: ShopSphere.util.Format.currency(rec.get('shipping')) },
                { label: 'Order Total', value: ShopSphere.util.Format.currency(rec.get('total')) },
                { label: 'Payment', value: rec.get('paymentMethod') + ' (' + rec.get('paymentStatus') + ')' },
                { label: 'Destination', value: rec.get('shippingAddress') }
            ],
            notes: rec.get('notes')
        });
    },

    onAdvanceOrderStatus: function (grid, context) {
        var rec = context && context.record,
            idx, nextStatus;

        if (!rec) {
            return;
        }

        idx = this.statusPipeline.indexOf(rec.get('status'));
        if (idx === -1 || idx >= this.statusPipeline.length - 1) {
            Ext.toast('Order ' + rec.get('orderNumber') + ' is already ' + rec.get('status') + '.', 2200);
            return;
        }

        nextStatus = this.statusPipeline[idx + 1];
        rec.set('status', nextStatus);
        this.onOrderSelect(grid, rec);
        Ext.toast(rec.get('orderNumber') + ' moved to ' + nextStatus + '.', 2200);
    }
});
