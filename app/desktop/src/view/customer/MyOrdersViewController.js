/**
 * Customer My Orders ViewController.
 *
 * Filter strategy (all three conditions are ANDed in a single filterBy call):
 *   1. customerId    — always applied; set by parent CustomerPortalModel.activeCustomerId
 *   2. orderSearch   — partial match on orderNumber (case-insensitive)
 *   3. statusFilter  — exact match on status, or 'All' to skip
 *
 * Ext JS concept: ChainedStore.filterBy() replaces all existing filters with a
 * single predicate function. This keeps filter logic in one place instead of
 * stacking multiple named filters which can interact unexpectedly.
 */
Ext.define('ShopSphere.view.customer.MyOrdersViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.myordersviewcontroller',

    init: function () {
        var vm = this.getViewModel();

        // Re-filter whenever any of the three filter values change
        this.customerBind = vm.bind('{activeCustomerId}', 'applyFilters', this);
        this.searchBind   = vm.bind('{orderSearch}',      'applyFilters', this);
        this.statusBind   = vm.bind('{statusFilter}',     'applyFilters', this);
    },

    destroy: function () {
        Ext.destroy(this.customerBind, this.searchBind, this.statusBind);
        this.callParent();
    },

    /**
     * Master filter: applies all three conditions together.
     * Called whenever customerId, search text, or status dropdown changes.
     */
    applyFilters: function () {
        var vm           = this.getViewModel(),
            store        = vm.getStore('myOrders'),
            customerId   = Number(vm.get('activeCustomerId')) || 0,
            searchText   = String(vm.get('orderSearch')   || '').trim().toLowerCase(),
            statusFilter = String(vm.get('statusFilter')  || 'All');

        if (!store) {
            return;
        }

        store.clearFilter(true); // suppress filterchange events while rebuilding

        store.filterBy(function (rec) {
            // ① Customer match (always required)
            if (Number(rec.get('customerId')) !== customerId) {
                return false;
            }

            // ② Order number search (skip if empty)
            if (searchText) {
                var orderNum = String(rec.get('orderNumber') || '').toLowerCase();
                if (orderNum.indexOf(searchText) === -1) {
                    return false;
                }
            }

            // ③ Status filter (skip if 'All')
            if (statusFilter && statusFilter !== 'All') {
                if (rec.get('status') !== statusFilter) {
                    return false;
                }
            }

            return true;
        });

        // Update the live count label in the ViewModel
        vm.set('orderCountLabel', store.getCount() + ' order' + (store.getCount() === 1 ? '' : 's'));
    },

    onOrderSearchChange: function () {
        this.applyFilters();
    },

    onStatusFilterChange: function () {
        this.applyFilters();
    },

    onBackToCatalog: function () {
        this.redirectTo('shop/catalog');
    },

    onCancelOrderTool: function (grid, context) {
        var rec = context && context.record;
        if (!rec) {
            return;
        }

        if (rec.get('status') !== 'Pending') {
            Ext.toast('Only Pending orders can be cancelled (' + rec.get('orderNumber') + ' is ' + rec.get('status') + ').', 2500);
            return;
        }

        Ext.Msg.confirm(
            'Cancel Order',
            'Cancel order ' + Ext.htmlEncode(rec.get('orderNumber')) + '?',
            function (choice) {
                if (choice === 'yes') {
                    rec.set({
                        status: 'Cancelled',
                        paymentStatus: 'Refunded'
                    });
                    Ext.toast(rec.get('orderNumber') + ' cancelled and marked Refunded.', 2300);
                }
            }
        );
    }
});
