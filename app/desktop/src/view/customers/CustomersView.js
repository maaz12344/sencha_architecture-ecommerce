/**
 * Customers CRM View.
 */
Ext.define('ShopSphere.view.customers.CustomersView', {
    extend: 'Ext.Panel',
    xtype: 'customersview',
    cls: 'ss-page-panel customersview',

    requires: [
        'Ext.grid.Grid',
        'Ext.Toolbar',
        'Ext.field.Search',
        'Ext.field.Select',
        'ShopSphere.util.Format'
    ],

    controller: { type: 'customersviewcontroller' },
    viewModel: { type: 'customersviewmodel' },

    layout: 'fit',

    items: [
        {
            xtype: 'toolbar',
            docked: 'top',
            cls: 'ss-page-toolbar',
            items: [
                {
                    xtype: 'searchfield',
                    placeholder: 'Search name, email, or city...',
                    width: 260,
                    bind: '{searchText}',
                    listeners: {
                        change: { fn: 'onFilterChange', buffer: 150 }
                    }
                },
                {
                    xtype: 'selectfield',
                    width: 160,
                    bind: '{segmentFilter}',
                    options: [
                        { text: 'All Segments', value: 'All' },
                        { text: 'VIP', value: 'VIP' },
                        { text: 'Regular', value: 'Regular' },
                        { text: 'New', value: 'New' },
                        { text: 'At Risk', value: 'At Risk' }
                    ],
                    listeners: {
                        change: 'onFilterChange'
                    }
                }
            ]
        },
        {
            xtype: 'grid',
            cls: 'ss-data-grid',
            bind: '{customers}',
            selectable: {
                mode: 'single'
            },
            listeners: {
                select: 'onCustomerSelect'
            },
            columns: [
                {
                    text: 'Customer',
                    dataIndex: 'name',
                    flex: 1.6,
                    minWidth: 200,
                    cell: { encodeHtml: false },
                    renderer: function (val, record) {
                        return '<div class="ss-cell-title">' + Ext.htmlEncode(val) + '</div>' +
                            '<div class="ss-cell-sub">' + Ext.htmlEncode(record.get('email') || '') + '</div>';
                    }
                },
                {
                    text: 'Segment',
                    dataIndex: 'segment',
                    width: 115,
                    cell: { encodeHtml: false },
                    renderer: function (val) {
                        return ShopSphere.util.Format.statusBadge(val);
                    }
                },
                { text: 'City', dataIndex: 'city', width: 145 },
                { text: 'Orders', dataIndex: 'ordersCount', width: 85, align: 'right' },
                {
                    text: 'Lifetime Value',
                    dataIndex: 'totalSpent',
                    width: 135,
                    align: 'right',
                    renderer: function (val) {
                        return ShopSphere.util.Format.currency(val);
                    }
                },
                {
                    text: 'Last Order',
                    dataIndex: 'lastOrderDate',
                    width: 125,
                    renderer: function (val) {
                        return ShopSphere.util.Format.shortDate(val);
                    }
                }
            ]
        }
    ]
});
