/**
 * Dashboard ViewModel.
 * Aggregates live metrics from the shared Application stores (orders, products, customers).
 */
Ext.define('ShopSphere.view.home.HomeViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.homeviewmodel',

    data: {
        name: 'homeview',
        rangeLabel: 'Last 30 Days',
        dashboardData: {
            totalRevenue: '$0.00',
            totalOrders: 0,
            totalProducts: 0,
            totalCustomers: 0,
            lowStockCount: 0,
            pendingCount: 0,
            processingCount: 0,
            shippedCount: 0,
            deliveredCount: 0,
            recentOrders: []
        }
    }
});
