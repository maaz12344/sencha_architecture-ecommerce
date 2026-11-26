/**
 * Inventory & Warehouse Replenishment View.
 */
Ext.define('ShopSphere.view.inventory.InventoryView', {
    extend: 'Ext.Panel',
    xtype: 'inventoryview',
    cls: 'ss-page-panel inventoryview',

    requires: [
        'Ext.grid.Grid',
        'Ext.Toolbar',
        'Ext.SegmentedButton',
        'ShopSphere.util.Format'
    ],

    controller: { type: 'inventoryviewcontroller' },
    viewModel: { type: 'inventoryviewmodel' },

    layout: 'fit',

    items: [
        {
            xtype: 'toolbar',
            docked: 'top',
            cls: 'ss-page-toolbar',
            items: [
                {
                    xtype: 'segmentedbutton',
                    value: 'All',
                    listeners: {
                        change: 'onStockFilterChange'
                    },
                    items: [
                        { text: 'All SKUs', value: 'All' },
                        { text: 'Needs Attention', value: 'Alerts' },
                        { text: 'Out of Stock', value: 'Out' }
                    ]
                },
                '->',
                {
                    xtype: 'component',
                    bind: { html: '{summaryHtml}' }
                }
            ]
        },
        {
            xtype: 'grid',
            cls: 'ss-data-grid',
            bind: '{inventory}',
            columns: [
                { text: 'SKU', dataIndex: 'sku', width: 120, cell: { userCls: 'ss-mono' } },
                { text: 'Product', dataIndex: 'name', flex: 2, minWidth: 220 },
                { text: 'Category', dataIndex: 'category', width: 145 },
                { text: 'On Hand', dataIndex: 'stock', width: 95, align: 'right' },
                { text: 'Reorder At', dataIndex: 'reorderLevel', width: 105, align: 'right' },
                {
                    text: 'Cost Value',
                    dataIndex: 'inventoryValue',
                    width: 120,
                    align: 'right',
                    renderer: function (val) {
                        return ShopSphere.util.Format.currency(val);
                    }
                },
                {
                    text: 'Health',
                    dataIndex: 'stockState',
                    width: 135,
                    cell: { encodeHtml: false },
                    renderer: function (val) {
                        return ShopSphere.util.Format.statusBadge(val);
                    }
                },
                {
                    text: 'Restock +10',
                    width: 105,
                    align: 'center',
                    sortable: false,
                    menuDisabled: true,
                    cell: {
                        tools: {
                            restock: {
                                iconCls: 'x-fa fa-plus-circle',
                                tooltip: 'Add 10 units to stock',
                                handler: 'onRestockTool'
                            }
                        }
                    }
                }
            ]
        }
    ]
});
