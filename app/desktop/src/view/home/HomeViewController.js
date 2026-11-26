/**
 * Dashboard ViewController.
 * Listens to shared store mutations so KPIs and Recent Orders stay synchronized
 * whenever records are created, edited, restocked, or fulfilled in other modules.
 */
Ext.define('ShopSphere.view.home.HomeViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.homeviewcontroller',

    requires: [
        'ShopSphere.util.Format'
    ],

    init: function () {
        var me = this,
            storeIds = ['orders', 'products', 'customers'];

        me.storeListeners = [];
        Ext.Array.each(storeIds, function (id) {
            var store = Ext.getStore(id);
            if (store) {
                me.storeListeners.push(store.on({
                    destroyable: true,
                    datachanged: 'refreshMetrics',
                    update: 'refreshMetrics',
                    scope: me
                }));
            }
        });

        me.refreshMetrics();
    },

    destroy: function () {
        Ext.destroy(this.storeListeners);
        this.callParent();
    },

    refreshMetrics: function () {
        var vm = this.getViewModel(),
            ordersStore = Ext.getStore('orders'),
            productsStore = Ext.getStore('products'),
            customersStore = Ext.getStore('customers'),
            totalRevenue = 0,
            lowStockCount = 0,
            counts = {
                Pending: 0,
                Processing: 0,
                Shipped: 0,
                Delivered: 0
            },
            recentOrders = [],
            // Monthly revenue buckets for the SVG bar chart
            // Keys are abbreviated month names; values accumulate order totals
            monthBuckets = { May: 0, Jun: 0, Jul: 0, Aug: 0, Sep: 0, Oct: 0, Nov: 0 },
            monthOrder   = ['May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov'],
            chartBars, maxBucketVal;

        if (ordersStore) {
            ordersStore.each(function (rec) {
                var status = rec.get('status'),
                    total  = Number(rec.get('total')) || 0,
                    date   = rec.get('orderDate'),
                    mon;

                if (status !== 'Cancelled') {
                    totalRevenue += total;
                }
                if (counts.hasOwnProperty(status)) {
                    counts[status] += 1;
                }

                // Accumulate into month buckets for the SVG chart
                if (date) {
                    mon = Ext.Date.format(Ext.isDate(date) ? date : new Date(date), 'M');
                    if (monthBuckets.hasOwnProperty(mon)) {
                        monthBuckets[mon] += total;
                    }
                }
            });

            Ext.Array.each(ordersStore.getRange(0, 4), function (rec) {
                recentOrders.push({
                    id: rec.get('id'),
                    orderNumber: rec.get('orderNumber'),
                    customerName: rec.get('customerName'),
                    orderDateFormatted: ShopSphere.util.Format.shortDate(rec.get('orderDate')),
                    totalFormatted: ShopSphere.util.Format.currency(rec.get('total')),
                    statusBadge: ShopSphere.util.Format.statusBadge(rec.get('status'))
                });
            });
        }

        if (productsStore) {
            productsStore.each(function (rec) {
                if (rec.get('stockState') !== 'In Stock') {
                    lowStockCount += 1;
                }
            });
        }

        // ── Build SVG bar chart data ──────────────────────────────────────────
        // Normalize bucket values to a 0-100 percentage scale for SVG rendering
        maxBucketVal = 1; // avoid divide-by-zero
        Ext.Array.each(monthOrder, function (m) {
            if (monthBuckets[m] > maxBucketVal) { maxBucketVal = monthBuckets[m]; }
        });

        chartBars = Ext.Array.map(monthOrder, function (m) {
            var raw   = monthBuckets[m],
                pct   = Math.round((raw / maxBucketVal) * 100);
            return {
                month:     m,
                heightPct: pct || 4,  // minimum 4% so zero-value bars still render
                value:     ShopSphere.util.Format.currency(raw)
            };
        });

        vm.set('dashboardData', {
            rangeLabel: vm.get('rangeLabel'),
            totalRevenue: ShopSphere.util.Format.currency(totalRevenue),
            totalOrders: ordersStore ? ordersStore.getCount() : 0,
            totalProducts: productsStore ? productsStore.getCount() : 0,
            totalCustomers: customersStore ? customersStore.getCount() : 0,
            lowStockCount: lowStockCount,
            pendingCount: counts.Pending,
            processingCount: counts.Processing,
            shippedCount: counts.Shipped,
            deliveredCount: counts.Delivered,
            recentOrders: recentOrders,
            chartBars: chartBars,
            // Order status donut segments as percentages for the Order Summary SVG
            totalOrdersForDonut: ordersStore ? Math.max(1, ordersStore.getCount()) : 1
        });
    },

    onCycleDateRange: function () {
        var vm = this.getViewModel(),
            ranges = ['Last 7 Days', 'Last 30 Days', 'Quarter to Date', 'Year 2026'],
            current = vm.get('rangeLabel'),
            nextIndex = (ranges.indexOf(current) + 1) % ranges.length;

        vm.set('rangeLabel', ranges[nextIndex]);
        this.refreshMetrics();
    },

    onViewAllOrders: function () {
        this.fireEvent('navigate', 'ordersview');
    },

    onViewLowStock: function () {
        this.fireEvent('navigate', 'inventoryview');
    },

    onRecentOrderTap: function (e, target) {
        var orderId = Number(target.getAttribute('data-order-id')),
            ordersStore = Ext.getStore('orders'),
            rec = ordersStore ? ordersStore.getById(orderId) : null;

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
                { label: 'Items', value: String(rec.get('itemsCount')) },
                { label: 'Payment', value: rec.get('paymentMethod') + ' (' + rec.get('paymentStatus') + ')' },
                { label: 'Total', value: ShopSphere.util.Format.currency(rec.get('total')) },
                { label: 'Ship To', value: rec.get('shippingAddress') }
            ],
            notes: rec.get('notes')
        });
    }
});
