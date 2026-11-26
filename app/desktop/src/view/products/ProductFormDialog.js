/**
 * Modal Ext.Dialog for creating or editing a Product record.
 * Demonstrates Modern Ext.Dialog + Ext.form.Panel validation and clean record binding.
 */
Ext.define('ShopSphere.view.products.ProductFormDialog', {
    extend: 'Ext.Dialog',
    xtype: 'productformdialog',

    requires: [
        'Ext.form.Panel',
        'Ext.field.Text',
        'Ext.field.Number',
        'Ext.field.Select',
        'Ext.field.TextArea'
    ],

    closable: true,
    modal: true,
    width: 520,
    maxWidth: '94vw',
    layout: 'fit',

    config: {
        record: null,
        isEdit: false
    },

    items: [
        {
            xtype: 'formpanel',
            reference: 'productForm',
            padding: 16,
            defaults: {
                labelAlign: 'top',
                margin: '0 0 12 0'
            },
            items: [
                {
                    xtype: 'container',
                    layout: 'hbox',
                    defaults: { flex: 1, labelAlign: 'top' },
                    items: [
                        {
                            xtype: 'textfield',
                            name: 'sku',
                            label: 'SKU',
                            required: true,
                            placeholder: 'e.g. SS-EL-1099',
                            margin: '0 10 12 0'
                        },
                        {
                            xtype: 'textfield',
                            name: 'brand',
                            label: 'Brand',
                            required: true,
                            placeholder: 'e.g. SonicWave'
                        }
                    ]
                },
                {
                    xtype: 'textfield',
                    name: 'name',
                    label: 'Product Name',
                    required: true,
                    placeholder: 'Enter product title'
                },
                {
                    xtype: 'container',
                    layout: 'hbox',
                    defaults: { flex: 1, labelAlign: 'top' },
                    items: [
                        {
                            xtype: 'selectfield',
                            name: 'category',
                            label: 'Category',
                            required: true,
                            margin: '0 10 12 0',
                            options: [
                                { text: 'Electronics', value: 'Electronics' },
                                { text: 'Apparel', value: 'Apparel' },
                                { text: 'Home & Kitchen', value: 'Home & Kitchen' },
                                { text: 'Accessories', value: 'Accessories' },
                                { text: 'Beauty & Wellness', value: 'Beauty & Wellness' },
                                { text: 'Sports & Outdoors', value: 'Sports & Outdoors' }
                            ]
                        },
                        {
                            xtype: 'selectfield',
                            name: 'status',
                            label: 'Status',
                            value: 'Active',
                            options: [
                                { text: 'Active', value: 'Active' },
                                { text: 'Draft', value: 'Draft' },
                                { text: 'Archived', value: 'Archived' }
                            ]
                        }
                    ]
                },
                {
                    xtype: 'container',
                    layout: 'hbox',
                    defaults: { flex: 1, labelAlign: 'top' },
                    items: [
                        {
                            xtype: 'numberfield',
                            name: 'price',
                            label: 'Price ($)',
                            required: true,
                            minValue: 0,
                            margin: '0 10 12 0'
                        },
                        {
                            xtype: 'numberfield',
                            name: 'cost',
                            label: 'Unit Cost ($)',
                            minValue: 0,
                            margin: '0 10 12 0'
                        },
                        {
                            xtype: 'numberfield',
                            name: 'stock',
                            label: 'Stock Qty',
                            required: true,
                            minValue: 0,
                            decimals: 0
                        }
                    ]
                },
                {
                    xtype: 'textareafield',
                    name: 'description',
                    label: 'Description',
                    maxRows: 3,
                    placeholder: 'Short product summary for storefront and staff'
                }
            ]
        }
    ],

    buttons: [
        {
            text: 'Cancel',
            handler: function (btn) {
                btn.up('dialog').close();
            }
        },
        {
            text: 'Save Product',
            ui: 'action',
            handler: function (btn) {
                var dialog = btn.up('dialog'),
                    form = dialog.down('formpanel');

                if (!form.validate()) {
                    Ext.toast('Please fill in all required product fields.', 2500);
                    return;
                }

                dialog.fireEvent('saveproduct', dialog, form.getValues());
            }
        }
    ],

    initialize: function () {
        var me = this,
            rec = me.getRecord(),
            form = me.down('formpanel');

        me.callParent(arguments);
        me.setTitle(me.getIsEdit() ? 'Edit Product' : 'Add New Product');

        if (rec && form) {
            form.setValues(rec.getData());
        }
    }
});
