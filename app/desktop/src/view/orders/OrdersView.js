/**
 * Orders Management & Fulfillment View.
 */
Ext.define('ShopSphere.view.orders.OrdersView', {
    extend: 'Ext.Panel',
    xtype: 'ordersview',
    cls: 'ss-page-panel ordersview',

    requires: [
        'Ext.grid.Grid',
        'Ext.Toolbar',
        'Ext.SegmentedButton',
        'Ext.field.Search',
        'ShopSphere.util.Format'
    ],

    controller: { type: 'ordersviewcontroller' },
    viewModel: { type: 'ordersviewmodel' },

    layout: 'fit',

    items: [
        {
            xtype: 'toolbar',
            docked: 'top',
            cls: 'ss-page-toolbar',
            items: [
                {
                    xtype: 'searchfield',
                    placeholder: 'Search order #, customer, or city...',
                    width: 260,
                    bind: '{searchText}',
                    listeners: {
                        change: { fn: 'onFilterChange', buffer: 150 }
                    }
                },
                '->',
                {
                    xtype: 'segmentedbutton',
                    value: 'All',
                    listeners: {
                        change: 'onStatusFilterChange'
                    },
                    items: [
                        { text: 'All', value: 'All' },
                        { text: 'Pending', value: 'Pending' },
                        { text: 'Processing', value: 'Processing' },
                        { text: 'Shipped', value: 'Shipped' },
                        { text: 'Delivered', value: 'Delivered' }
                    ]
                }
            ]
        },
        {
            xtype: 'grid',
            cls: 'ss-data-grid',
            bind: '{orders}',
            selectable: {
                mode: 'single'
            },
            listeners: {
                select: 'onOrderSelect'
            },
            columns: [
                {
                    text: 'Order #',
                    dataIndex: 'orderNumber',
                    width: 120,
                    cell: { userCls: 'ss-mono ss-bold' }
                },
                {
                    text: 'Customer',
                    dataIndex: 'customerName',
                    flex: 1.5,
                    minWidth: 180,
                    cell: { encodeHtml: false },
                    renderer: function (val, record) {
                        return '<div class="ss-cell-title">' + Ext.htmlEncode(val) + '</div>' +
                            '<div class="ss-cell-sub">' + Ext.htmlEncode(record.get('shippingCity') || '') + '</div>';
                    }
                },
                {
                    text: 'Date',
                    dataIndex: 'orderDate',
                    width: 120,
                    renderer: function (val) {
                        return ShopSphere.util.Format.shortDate(val);
                    }
                },
                {
                    text: 'Items',
                    dataIndex: 'itemsCount',
                    width: 75,
                    align: 'right'
                },
                {
                    text: 'Payment',
                    dataIndex: 'paymentStatus',
                    width: 115,
                    cell: { encodeHtml: false },
                    renderer: function (val) {
                        return ShopSphere.util.Format.statusBadge(val);
                    }
                },
                {
                    text: 'Total',
                    dataIndex: 'total',
                    width: 115,
                    align: 'right',
                    renderer: function (val) {
                        return ShopSphere.util.Format.currency(val);
                    }
                },
                {
                    text: 'Fulfillment',
                    dataIndex: 'status',
                    width: 130,
                    cell: { encodeHtml: false },
                    renderer: function (val) {
                        return ShopSphere.util.Format.statusBadge(val);
                    }
                },
                {
                    text: 'Advance',
                    width: 90,
                    align: 'center',
                    sortable: false,
                    menuDisabled: true,
                    cell: {
                        tools: {
                            advance: {
                                iconCls: 'x-fa fa-arrow-circle-right',
                                tooltip: 'Advance Fulfillment Status',
                                handler: 'onAdvanceOrderStatus'
                            }
                        }
                    }
                }
            ]
        }
    ]
});
