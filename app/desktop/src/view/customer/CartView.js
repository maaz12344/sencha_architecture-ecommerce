/**
 * Customer Shopping Cart & Checkout View.
 */
Ext.define('ShopSphere.view.customer.CartView', {
    extend: 'Ext.Container',
    xtype: 'cartview',
    cls: 'ss-page-panel cartview',

    requires: [
        'Ext.grid.Grid',
        'Ext.form.Panel',
        'Ext.field.Text',
        'Ext.field.TextArea',
        'Ext.field.Select',
        'ShopSphere.util.Format'
    ],

    controller: { type: 'cartviewcontroller' },
    viewModel: { type: 'cartviewmodel' },

    layout: 'hbox',

    items: [
        {
            xtype: 'panel',
            flex: 2,
            layout: 'fit',
            title: 'Your Shopping Cart',
            margin: '16 12 16 16',
            cls: 'ss-cart-panel',
            tools: [
                {
                    type: 'left',
                    tooltip: 'Continue Shopping',
                    handler: 'onContinueShopping'
                }
            ],
            items: [
                {
                    xtype: 'grid',
                    bind: '{cartItems}',
                    emptyText: 'Your cart is empty. Browse the Shop Catalog to add items.',
                    columns: [
                        {
                            text: 'Product',
                            dataIndex: 'name',
                            flex: 2,
                            minWidth: 200,
                            cell: { encodeHtml: false },
                            renderer: function (val, record) {
                                return '<div class="ss-cell-title">' + Ext.htmlEncode(val) + '</div>' +
                                    '<div class="ss-cell-sub">' + Ext.htmlEncode(record.get('sku')) + ' • ' + Ext.htmlEncode(record.get('brand')) + '</div>';
                            }
                        },
                        {
                            text: 'Unit Price',
                            dataIndex: 'price',
                            width: 110,
                            align: 'right',
                            renderer: function (val) {
                                return ShopSphere.util.Format.currency(val);
                            }
                        },
                        {
                            text: 'Qty',
                            dataIndex: 'quantity',
                            width: 75,
                            align: 'center',
                            cell: { userCls: 'ss-bold' }
                        },
                        {
                            text: 'Subtotal',
                            dataIndex: 'lineTotal',
                            width: 115,
                            align: 'right',
                            cell: { userCls: 'ss-bold' },
                            renderer: function (val) {
                                return ShopSphere.util.Format.currency(val);
                            }
                        },
                        {
                            text: 'Adjust',
                            width: 115,
                            align: 'center',
                            sortable: false,
                            menuDisabled: true,
                            cell: {
                                tools: {
                                    dec: {
                                        iconCls: 'x-fa fa-minus-circle',
                                        tooltip: 'Decrease quantity',
                                        handler: 'onDecreaseQty'
                                    },
                                    inc: {
                                        iconCls: 'x-fa fa-plus-circle',
                                        tooltip: 'Increase quantity',
                                        handler: 'onIncreaseQty'
                                    },
                                    remove: {
                                        iconCls: 'x-fa fa-trash',
                                        tooltip: 'Remove item',
                                        handler: 'onRemoveItem'
                                    }
                                }
                            }
                        }
                    ]
                }
            ]
        },
        {
            xtype: 'panel',
            width: 390,
            title: 'Checkout & Summary',
            margin: '16 16 16 0',
            cls: 'ss-checkout-panel',
            scrollable: true,
            items: [
                {
                    xtype: 'formpanel',
                    reference: 'checkoutForm',
                    padding: 16,
                    items: [
                        {
                            xtype: 'container',
                            layout: 'hbox',
                            margin: '0 0 12 0',
                            items: [
                                {
                                    xtype: 'textfield',
                                    flex: 1,
                                    label: 'Promo Code',
                                    labelAlign: 'top',
                                    placeholder: 'Try BFCM25, WELCOME15, FREESHIP',
                                    bind: '{promoCodeInput}',
                                    margin: '0 8 0 0'
                                },
                                {
                                    xtype: 'button',
                                    text: 'Apply',
                                    alignSelf: 'end',
                                    handler: 'onApplyPromo'
                                }
                            ]
                        },
                        {
                            xtype: 'component',
                            cls: 'ss-checkout-summary',
                            bind: { data: '{summaryData}' },
                            tpl: new Ext.XTemplate(
                                '<div class="ss-summary-box">',
                                    '<div class="ss-summary-line"><span>Subtotal ({itemCount} items)</span><strong>{subtotalFormatted}</strong></div>',
                                    '<tpl if="hasDiscount">',
                                        '<div class="ss-summary-line ss-summary-line--discount"><span>Discount ({appliedPromoLabel:htmlEncode})</span><strong>{discountFormatted}</strong></div>',
                                    '<tpl elseif="appliedPromoLabel">',
                                        '<div class="ss-summary-line ss-summary-line--discount"><span>Promo Applied</span><strong>{appliedPromoLabel:htmlEncode}</strong></div>',
                                    '</tpl>',
                                    '<div class="ss-summary-line"><span>Estimated Tax (8%)</span><strong>{taxFormatted}</strong></div>',
                                    '<div class="ss-summary-line"><span>Shipping</span><strong>{shippingFormatted}</strong></div>',
                                    '<div class="ss-summary-line ss-summary-line--total"><span>Total</span><strong>{totalFormatted}</strong></div>',
                                '</div>'
                            )
                        },
                        {
                            xtype: 'textareafield',
                            label: 'Shipping Address',
                            labelAlign: 'top',
                            required: true,
                            maxRows: 2,
                            bind: '{shippingAddress}',
                            margin: '14 0 10 0'
                        },
                        {
                            xtype: 'selectfield',
                            label: 'Payment Method',
                            labelAlign: 'top',
                            required: true,
                            bind: '{paymentMethod}',
                            options: [
                                { text: 'Credit Card (Visa •••• 4242)', value: 'Credit Card (Visa •••• 4242)' },
                                { text: 'Apple Pay', value: 'Apple Pay' },
                                { text: 'PayPal', value: 'PayPal' },
                                { text: 'Corporate PO', value: 'Corporate PO' }
                            ],
                            margin: '0 0 10 0'
                        },
                        {
                            xtype: 'textfield',
                            label: 'Delivery Notes',
                            labelAlign: 'top',
                            placeholder: 'Optional gate code or gift instructions',
                            bind: '{orderNotes}',
                            margin: '0 0 16 0'
                        },
                        {
                            xtype: 'button',
                            text: 'Place Order',
                            ui: 'action',
                            iconCls: 'x-fa fa-lock',
                            width: '100%',
                            handler: 'onPlaceOrder'
                        }
                    ]
                }
            ]
        }
    ]
});
