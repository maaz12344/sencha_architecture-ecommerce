/**
 * Enterprise Product Catalog Management View.
 * Combines a filterable toolbar, Modern Ext.grid.Grid, row tools, and modal CRUD dialog.
 */
Ext.define('ShopSphere.view.products.ProductsView', {
    extend: 'Ext.Panel',
    xtype: 'productsview',
    cls: 'ss-page-panel productsview',

    requires: [
        'Ext.grid.Grid',
        'Ext.Toolbar',
        'Ext.field.Search',
        'Ext.field.Select',
        'ShopSphere.util.Format'
    ],

    controller: { type: 'productsviewcontroller' },
    viewModel: { type: 'productsviewmodel' },

    layout: 'fit',

    items: [
        {
            xtype: 'toolbar',
            docked: 'top',
            cls: 'ss-page-toolbar',
            items: [
                {
                    xtype: 'searchfield',
                    placeholder: 'Search SKU, product, or brand...',
                    width: 260,
                    bind: '{searchText}',
                    listeners: {
                        change: { fn: 'onFilterChange', buffer: 150 }
                    }
                },
                {
                    xtype: 'selectfield',
                    width: 175,
                    bind: '{categoryFilter}',
                    options: [
                        { text: 'All Categories', value: 'All' },
                        { text: 'Electronics', value: 'Electronics' },
                        { text: 'Apparel', value: 'Apparel' },
                        { text: 'Home & Kitchen', value: 'Home & Kitchen' },
                        { text: 'Accessories', value: 'Accessories' },
                        { text: 'Beauty & Wellness', value: 'Beauty & Wellness' },
                        { text: 'Sports & Outdoors', value: 'Sports & Outdoors' }
                    ],
                    listeners: {
                        change: 'onFilterChange'
                    }
                },
                {
                    xtype: 'selectfield',
                    width: 145,
                    bind: '{statusFilter}',
                    options: [
                        { text: 'All Statuses', value: 'All' },
                        { text: 'Active', value: 'Active' },
                        { text: 'Draft', value: 'Draft' },
                        { text: 'Archived', value: 'Archived' }
                    ],
                    listeners: {
                        change: 'onFilterChange'
                    }
                },
                {
                    xtype: 'button',
                    text: 'Reset',
                    iconCls: 'x-fa fa-undo',
                    handler: 'onClearFilters'
                },
                '->',
                {
                    xtype: 'button',
                    text: 'Add Product',
                    ui: 'action',
                    iconCls: 'x-fa fa-plus',
                    handler: 'onAddProduct'
                }
            ]
        },
        {
            xtype: 'grid',
            reference: 'productsGrid',
            cls: 'ss-data-grid',
            bind: '{products}',
            selectable: {
                mode: 'single'
            },
            listeners: {
                select: 'onProductSelect'
            },
            columns: [
                {
                    text: 'SKU',
                    dataIndex: 'sku',
                    width: 120,
                    cell: { userCls: 'ss-mono' }
                },
                {
                    text: 'Product',
                    dataIndex: 'name',
                    flex: 2,
                    minWidth: 220,
                    cell: { encodeHtml: false },
                    renderer: function (val, record) {
                        return '<div class="ss-cell-title">' + Ext.htmlEncode(val) + '</div>' +
                            '<div class="ss-cell-sub">' + Ext.htmlEncode(record.get('brand') || '') + '</div>';
                    }
                },
                {
                    text: 'Category',
                    dataIndex: 'category',
                    width: 150
                },
                {
                    text: 'Price',
                    dataIndex: 'price',
                    width: 105,
                    align: 'right',
                    renderer: function (val) {
                        return ShopSphere.util.Format.currency(val);
                    }
                },
                {
                    text: 'Margin',
                    dataIndex: 'marginPct',
                    width: 95,
                    align: 'right',
                    renderer: function (val) {
                        return ShopSphere.util.Format.percent(val);
                    }
                },
                {
                    text: 'Stock',
                    dataIndex: 'stock',
                    width: 85,
                    align: 'right'
                },
                {
                    text: 'Inventory',
                    dataIndex: 'stockState',
                    width: 130,
                    cell: { encodeHtml: false },
                    renderer: function (val) {
                        return ShopSphere.util.Format.statusBadge(val);
                    }
                },
                {
                    text: 'Status',
                    dataIndex: 'status',
                    width: 110,
                    cell: { encodeHtml: false },
                    renderer: function (val) {
                        return ShopSphere.util.Format.statusBadge(val);
                    }
                },
                {
                    text: 'Sold',
                    dataIndex: 'salesCount',
                    width: 80,
                    align: 'right'
                },
                {
                    text: 'Actions',
                    width: 100,
                    align: 'center',
                    sortable: false,
                    menuDisabled: true,
                    cell: {
                        tools: {
                            edit: {
                                iconCls: 'x-fa fa-pencil',
                                tooltip: 'Edit Product',
                                handler: 'onEditProductTool'
                            },
                            remove: {
                                iconCls: 'x-fa fa-trash',
                                tooltip: 'Delete Product',
                                handler: 'onDeleteProductTool'
                            }
                        }
                    }
                }
            ]
        }
    ]
});
