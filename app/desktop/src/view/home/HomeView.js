/**
 * Enterprise E-Commerce Dashboard View.
 * Demonstrates Ext JS MVVM binding via ViewModel + XTemplate + delegated DOM events.
 */
Ext.define('ShopSphere.view.home.HomeView', {
    extend: 'Ext.Container',
    xtype: 'homeview',
    cls: 'homeview',

    controller: {
        type: 'homeviewcontroller'
    },
    viewModel: {
        type: 'homeviewmodel'
    },

    scrollable: true,

    bind: {
        data: '{dashboardData}'
    },

    listeners: {
        element: 'element',
        delegate: '.js-date-range',
        tap: 'onCycleDateRange'
    },

    // Additional delegated interactions inside the rendered XTemplate
    initialize: function () {
        var me = this;
        me.callParent(arguments);

        me.element.on({
            tap: 'onViewAllOrders',
            delegate: '.js-view-all-orders',
            scope: me.getController()
        });
        me.element.on({
            tap: 'onViewLowStock',
            delegate: '.js-view-low-stock',
            scope: me.getController()
        });
        me.element.on({
            tap: 'onRecentOrderTap',
            delegate: '.js-order-row',
            scope: me.getController()
        });
    },

    tpl: new Ext.XTemplate(
        '<div class="dashboard">',

            '<div class="dashboard-heading">',
                '<div>',
                    '<h1>Dashboard</h1>',
                    '<p>Live store telemetry powered by ShopSphere Ext JS Stores &amp; MVVM.</p>',
                '</div>',
                '<button type="button" class="dashboard-date js-date-range">{rangeLabel:htmlEncode} &#9662;</button>',
            '</div>',

            '<div class="stats-grid">',

                '<div class="stat-card">',
                    '<div class="stat-top">',
                        '<span>Total Revenue</span>',
                        '<span class="stat-icon revenue-icon">$</span>',
                    '</div>',
                    '<h2>{totalRevenue:htmlEncode}</h2>',
                    '<p class="positive">↑ 12.8% <span>from active orders</span></p>',
                '</div>',

                '<div class="stat-card">',
                    '<div class="stat-top">',
                        '<span>Total Orders</span>',
                        '<span class="stat-icon orders-icon">▤</span>',
                    '</div>',
                    '<h2>{totalOrders}</h2>',
                    '<p class="positive">↑ 8.2% <span>live order store</span></p>',
                '</div>',

                '<div class="stat-card">',
                    '<div class="stat-top">',
                        '<span>Catalog SKUs</span>',
                        '<span class="stat-icon products-icon">◇</span>',
                    '</div>',
                    '<h2>{totalProducts}</h2>',
                    '<p class="positive js-view-low-stock" style="cursor:pointer;">{lowStockCount} alerts <span>need restock →</span></p>',
                '</div>',

                '<div class="stat-card">',
                    '<div class="stat-top">',
                        '<span>Customers</span>',
                        '<span class="stat-icon customers-icon">♙</span>',
                    '</div>',
                    '<h2>{totalCustomers}</h2>',
                    '<p class="positive">↑ 10.3% <span>active CRM profiles</span></p>',
                '</div>',

            '</div>',

            '<div class="dashboard-content">',

                '<div class="dashboard-panel sales-panel">',
                    '<div class="panel-heading">',
                        '<div>',
                            '<h3>Sales Overview</h3>',
                            '<p>Revenue performance over the last 7 months</p>',
                        '</div>',
                        '<span class="panel-label">2026</span>',
                    '</div>',

                    '<div class="sales-chart">',
                        '<div class="chart-y-axis">',
                            '<span>$50k</span>',
                            '<span>$40k</span>',
                            '<span>$30k</span>',
                            '<span>$20k</span>',
                            '<span>$10k</span>',
                            '<span>$0</span>',
                        '</div>',

                        '<div class="chart-area">',
                            '<div class="chart-grid-lines">',
                                '<span></span><span></span><span></span>',
                                '<span></span><span></span><span></span>',
                            '</div>',

                            '<div class="chart-bars">',
                                '<div class="bar-group"><div class="bar" style="height:45%"></div><span>May</span></div>',
                                '<div class="bar-group"><div class="bar" style="height:60%"></div><span>Jun</span></div>',
                                '<div class="bar-group"><div class="bar" style="height:52%"></div><span>Jul</span></div>',
                                '<div class="bar-group"><div class="bar" style="height:72%"></div><span>Aug</span></div>',
                                '<div class="bar-group"><div class="bar" style="height:65%"></div><span>Sep</span></div>',
                                '<div class="bar-group"><div class="bar" style="height:85%"></div><span>Oct</span></div>',
                                '<div class="bar-group"><div class="bar" style="height:96%"></div><span>Nov</span></div>',
                            '</div>',
                        '</div>',
                    '</div>',
                '</div>',

                '<div class="dashboard-panel">',
                    '<div class="panel-heading">',
                        '<div>',
                            '<h3>Order Summary</h3>',
                            '<p>Live fulfillment pipeline</p>',
                        '</div>',
                    '</div>',

                    '<div class="order-summary">',
                        '<div><span class="summary-dot pending"></span>Pending <strong>{pendingCount}</strong></div>',
                        '<div><span class="summary-dot processing"></span>Processing <strong>{processingCount}</strong></div>',
                        '<div><span class="summary-dot shipped"></span>Shipped <strong>{shippedCount}</strong></div>',
                        '<div><span class="summary-dot delivered"></span>Delivered <strong>{deliveredCount}</strong></div>',
                    '</div>',
                '</div>',

            '</div>',

            '<div class="dashboard-panel recent-orders">',
                '<div class="panel-heading">',
                    '<div>',
                        '<h3>Recent Orders</h3>',
                        '<p>Click any order row to open the right-hand Inspector drawer</p>',
                    '</div>',
                    '<button type="button" class="view-all js-view-all-orders">View All →</button>',
                '</div>',

                '<div class="table-scroll">',
                    '<table class="orders-table">',
                        '<thead>',
                            '<tr>',
                                '<th>ORDER ID</th>',
                                '<th>CUSTOMER</th>',
                                '<th>DATE</th>',
                                '<th>AMOUNT</th>',
                                '<th>STATUS</th>',
                            '</tr>',
                        '</thead>',
                        '<tbody>',
                            '<tpl for="recentOrders">',
                                '<tr class="js-order-row ss-clickable-row" data-order-id="{id}">',
                                    '<td><strong>{orderNumber:htmlEncode}</strong></td>',
                                    '<td>{customerName:htmlEncode}</td>',
                                    '<td>{orderDateFormatted:htmlEncode}</td>',
                                    '<td>{totalFormatted:htmlEncode}</td>',
                                    '<td>{statusBadge}</td>',
                                '</tr>',
                            '</tpl>',
                        '</tbody>',
                    '</table>',
                '</div>',
            '</div>',

        '</div>'
    )
});
