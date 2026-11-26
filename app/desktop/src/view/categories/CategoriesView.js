Ext.define('ShopSphere.view.categories.CategoriesView', {
    extend: 'Ext.Panel',
    xtype: 'categoriesview',
    cls: 'ss-page-panel categoriesview',

    requires: [
        'Ext.grid.Grid',
        'ShopSphere.util.Format'
    ],

    controller: { type: 'categoriesviewcontroller' },
    viewModel: { type: 'categoriesviewmodel' },

    layout: 'fit',

    items: [
        {
            xtype: 'grid',
            cls: 'ss-data-grid',
            bind: '{categories}',
            columns: [
                { text: 'Order', dataIndex: 'displayOrder', width: 80, align: 'center' },
                { text: 'Category', dataIndex: 'name', width: 180, cell: { userCls: 'ss-bold' } },
                { text: 'Slug', dataIndex: 'slug', width: 160, cell: { userCls: 'ss-mono' } },
                { text: 'Description', dataIndex: 'description', flex: 2, minWidth: 220 },
                { text: 'SKUs', dataIndex: 'productCount', width: 90, align: 'right' },
                {
                    text: 'Status',
                    dataIndex: 'statusLabel',
                    width: 115,
                    cell: { encodeHtml: false },
                    renderer: function (val) {
                        return ShopSphere.util.Format.statusBadge(val);
                    }
                },
                {
                    text: 'Toggle',
                    width: 85,
                    align: 'center',
                    sortable: false,
                    menuDisabled: true,
                    cell: {
                        tools: {
                            toggle: {
                                iconCls: 'x-fa fa-power-off',
                                tooltip: 'Toggle Active / Inactive',
                                handler: 'onToggleCategoryTool'
                            }
                        }
                    }
                }
            ]
        }
    ]
});
