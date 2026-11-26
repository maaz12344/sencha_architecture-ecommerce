/**
 * Customer Order History & Self-Service View.
 *
 * New in this version:
 *  - Search field: filters by order number substring
 *  - Status selectfield: filters to a specific fulfillment status
 *  Both filters stack on top of the existing customer-id filter in MyOrdersViewController.
 */
Ext.define('ShopSphere.view.customer.MyOrdersView', {
    extend: 'Ext.Panel',
    xtype: 'myordersview',
    cls: 'ss-page-panel myordersview',

    requires: [
        'Ext.grid.Grid',
        'Ext.Toolbar',
        'Ext.field.Search',
        'Ext.field.Select',
        'ShopSphere.util.Format'
    ],

    controller: { type: 'myordersviewcontroller' },
    viewModel: { type: 'myordersviewmodel' },

    layout: 'fit',

    items: [
        // ── Top toolbar with title + navigation ─────────────────────────────
        {
            xtype: 'toolbar',
            docked: 'top',
            cls: 'ss-page-toolbar',
            items: [
                {
                    xtype: 'component',
                    html: '<span class="ss-bold">Your Order History</span>'
                },
                '->',
                {
                    xtype: 'button',
                    text: 'Shop Catalog',
                    ui: 'action',
                    iconCls: 'x-fa fa-shopping-bag',
                    handler: 'onBackToCatalog'
                }
            ]
        },

        // ── Filter toolbar — search + status ─────────────────────────────────
        {
            xtype: 'toolbar',
            docked: 'top',
            cls: 'ss-filter-toolbar',
            items: [
                {
                    // Search by order number (partial match)
                    xtype: 'searchfield',
                    reference: 'orderSearch',
                    placeholder: 'Search by order # ...',
                    width: 240,
                    bind: '{orderSearch}',
                    listeners: {
                        change: { fn: 'onOrderSearchChange', buffer: 200 }
                    }
                },
                {
                    // Status filter drop-down
                    xtype: 'selectfield',
                    reference: 'statusFilter',
                    label: 'Status:',
                    labelWidth: 56,
                    width: 220,
                    bind: '{statusFilter}',
                    options: [
                        { text: 'All Statuses',   value: 'All' },
                        { text: 'Pending',         value: 'Pending' },
                        { text: 'Processing',      value: 'Processing' },
                        { text: 'Shipped',         value: 'Shipped' },
                        { text: 'Delivered',       value: 'Delivered' },
                        { text: 'Cancelled',       value: 'Cancelled' }
                    ],
                    listeners: {
                        change: 'onStatusFilterChange'
                    }
                },
                '->',
                {
                    // Live count of matching orders
                    xtype: 'component',
                    cls: 'ss-filter-count',
                    bind: '{orderCountLabel}'
                }
            ]
        },

        // ── Orders grid ──────────────────────────────────────────────────────
        {
            xtype: 'grid',
            cls: 'ss-data-grid',
            bind: '{myOrders}',
            emptyText: 'No orders match your current filters.',
            columns: [
                { text: 'Order #', dataIndex: 'orderNumber', width: 120, cell: { userCls: 'ss-mono ss-bold' } },
                {
                    text: 'Order Date',
                    dataIndex: 'orderDate',
                    width: 125,
                    renderer: function (val) {
                        return ShopSphere.util.Format.shortDate(val);
                    }
                },
                { text: 'Items', dataIndex: 'itemsCount', width: 80, align: 'right' },
                { text: 'Payment Method', dataIndex: 'paymentMethod', flex: 1.4, minWidth: 180 },
                { text: 'Ship To', dataIndex: 'shippingAddress', flex: 1.6, minWidth: 200 },
                {
                    text: 'Total',
                    dataIndex: 'total',
                    width: 115,
                    align: 'right',
                    cell: { userCls: 'ss-bold' },
                    renderer: function (val) {
                        return ShopSphere.util.Format.currency(val);
                    }
                },
                {
                    text: 'Status',
                    dataIndex: 'status',
                    width: 125,
                    cell: { encodeHtml: false },
                    renderer: function (val) {
                        return ShopSphere.util.Format.statusBadge(val);
                    }
                },
                {
                    text: 'Cancel',
                    width: 85,
                    align: 'center',
                    sortable: false,
                    menuDisabled: true,
                    cell: {
                        tools: {
                            cancel: {
                                iconCls: 'x-fa fa-times-circle',
                                tooltip: 'Cancel Pending Order',
                                handler: 'onCancelOrderTool'
                            }
                        }
                    }
                }
            ]
        }
    ]
});
