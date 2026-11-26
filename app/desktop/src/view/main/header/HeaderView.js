Ext.define('ShopSphere.view.main.header.HeaderView', {
    extend: 'Ext.Toolbar',
    xtype: 'headerview',
    cls: 'headerview',
    viewModel: {},
    items: [
        { 
            xtype: 'container',
            cls: 'headerviewtext',
            bind: { html: '{heading}' }
        },
        '->',
        {
            xtype: 'button',
            ui: 'headerbutton',
            text: 'Customer Store',
            iconCls: 'x-fa fa-shopping-bag',
            handler: 'onSwitchToCustomerPortal',
            margin: '0 8 0 0'
        },
        {
            xtype: 'button',
            ui: 'headerbutton',
            reference: 'detailtoggle',
            handler: 'onHeaderViewDetailToggle',
            iconCls: 'x-fa fa-arrow-left'
        }
    ]
});
