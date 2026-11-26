Ext.define('ShopSphere.view.promotions.PromotionsView', {
    extend: 'Ext.Panel',
    xtype: 'promotionsview',
    cls: 'ss-page-panel promotionsview',

    requires: [
        'Ext.grid.Grid',
        'ShopSphere.util.Format'
    ],

    controller: { type: 'promotionsviewcontroller' },
    viewModel: { type: 'promotionsviewmodel' },

    layout: 'fit',

    items: [
        {
            xtype: 'grid',
            cls: 'ss-data-grid',
            bind: '{promotions}',
            columns: [
                { text: 'Code', dataIndex: 'code', width: 130, cell: { userCls: 'ss-mono ss-bold' } },
                { text: 'Campaign', dataIndex: 'name', flex: 1.8, minWidth: 210 },
                { text: 'Type', dataIndex: 'discountType', width: 125 },
                {
                    text: 'Value',
                    dataIndex: 'discountValue',
                    width: 100,
                    align: 'right',
                    renderer: function (val, record) {
                        var type = record.get('discountType');
                        if (type === 'Percentage') {
                            return val + '%';
                        }
                        if (type === 'Fixed') {
                            return ShopSphere.util.Format.currency(val);
                        }
                        return 'Free Ship';
                    }
                },
                {
                    text: 'Min Order',
                    dataIndex: 'minOrderAmount',
                    width: 110,
                    align: 'right',
                    renderer: function (val) {
                        return ShopSphere.util.Format.currency(val);
                    }
                },
                {
                    text: 'Usage',
                    dataIndex: 'usageCount',
                    width: 115,
                    align: 'right',
                    renderer: function (val, record) {
                        return val + ' / ' + record.get('usageLimit');
                    }
                },
                {
                    text: 'Ends',
                    dataIndex: 'endDate',
                    width: 120,
                    renderer: function (val) {
                        return ShopSphere.util.Format.shortDate(val);
                    }
                },
                {
                    text: 'Status',
                    dataIndex: 'statusLabel',
                    width: 110,
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
                                tooltip: 'Activate / Pause Promotion',
                                handler: 'onTogglePromoTool'
                            }
                        }
                    }
                }
            ]
        }
    ]
});
