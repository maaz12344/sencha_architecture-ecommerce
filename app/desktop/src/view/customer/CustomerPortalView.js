/**
 * Customer-Facing Storefront Shell.
 * Provides a clean e-commerce header with catalog/orders/cart navigation,
 * shopper profile switcher, live cart badge, and 1-click return to Admin Portal.
 */
Ext.define('ShopSphere.view.customer.CustomerPortalView', {
    extend: 'Ext.Container',
    xtype: 'customerportalview',
    cls: 'customerportalview',

    requires: [
        'Ext.Toolbar',
        'Ext.SegmentedButton',
        'Ext.field.Select',
        'Ext.layout.Card'
    ],

    controller: { type: 'customerportalcontroller' },
    viewModel: { type: 'customerportalmodel' },

    layout: 'fit',

    items: [
        {
            xtype: 'toolbar',
            docked: 'top',
            cls: 'ss-store-header',
            items: [
                {
                    xtype: 'component',
                    html: '<div class="ss-store-brand"><span class="ss-store-logo">S</span><span>ShopSphere Store</span></div>'
                },
                {
                    xtype: 'segmentedbutton',
                    margin: '0 0 0 20',
                    bind: '{activeSection}',
                    listeners: {
                        change: 'onSectionButtonChange'
                    },
                    items: [
                        { text: 'Shop Catalog', value: 'catalog', iconCls: 'x-fa fa-th-large' },
                        { text: 'My Orders', value: 'orders', iconCls: 'x-fa fa-list-alt' },
                        { text: 'Checkout', value: 'cart', iconCls: 'x-fa fa-shopping-cart' }
                    ]
                },
                '->',
                {
                    xtype: 'selectfield',
                    width: 210,
                    cls: 'ss-shopper-select',
                    label: 'Shopper:',
                    labelWidth: 65,
                    displayField: 'name',
                    valueField: 'id',
                    bind: {
                        store: '{shopperAccounts}',
                        value: '{activeCustomerId}'
                    },
                    margin: '0 10 0 0'
                },
                {
                    xtype: 'button',
                    ui: 'action',
                    iconCls: 'x-fa fa-shopping-cart',
                    bind: {
                        text: '{cartButtonText}'
                    },
                    handler: 'onOpenCart',
                    margin: '0 8 0 0'
                },
                {
                    xtype: 'button',
                    text: 'Admin Portal',
                    ui: 'storeheaderbtn',
                    iconCls: 'x-fa fa-sliders',
                    handler: 'onSwitchToAdmin'
                }
            ]
        },
        {
            xtype: 'container',
            reference: 'shopCenter',
            layout: 'card',
            cls: 'ss-store-center'
        }
    ]
});
