/**
 * Store Configuration View demonstrating two-way ViewModel binding with Ext.form.Panel.
 */
Ext.define('ShopSphere.view.settings.SettingsView', {
    extend: 'Ext.Container',
    xtype: 'settingsview',
    cls: 'ss-page-panel settingsview',

    requires: [
        'Ext.form.Panel',
        'Ext.form.FieldSet',
        'Ext.field.Text',
        'Ext.field.Email',
        'Ext.field.Select',
        'Ext.field.Number',
        'Ext.field.Toggle'
    ],

    controller: { type: 'settingsviewcontroller' },
    viewModel: { type: 'settingsviewmodel' },

    scrollable: true,
    padding: 24,

    items: [
        {
            xtype: 'formpanel',
            reference: 'settingsForm',
            maxWidth: 720,
            cls: 'ss-settings-card',
            items: [
                {
                    xtype: 'fieldset',
                    title: 'Storefront Identity',
                    defaults: { labelAlign: 'left', labelWidth: 200 },
                    items: [
                        {
                            xtype: 'textfield',
                            label: 'Store Name',
                            required: true,
                            bind: '{storeName}'
                        },
                        {
                            xtype: 'emailfield',
                            label: 'Operations Email',
                            required: true,
                            bind: '{supportEmail}'
                        },
                        {
                            xtype: 'selectfield',
                            label: 'Default Currency',
                            bind: '{currency}',
                            options: [
                                { text: 'USD ($)', value: 'USD' },
                                { text: 'EUR (€)', value: 'EUR' },
                                { text: 'GBP (£)', value: 'GBP' }
                            ]
                        }
                    ]
                },
                {
                    xtype: 'fieldset',
                    title: 'Commerce & Fulfillment Rules',
                    defaults: { labelAlign: 'left', labelWidth: 200 },
                    items: [
                        {
                            xtype: 'numberfield',
                            label: 'Sales Tax Rate (%)',
                            minValue: 0,
                            maxValue: 50,
                            bind: '{taxRate}'
                        },
                        {
                            xtype: 'numberfield',
                            label: 'Flat Shipping ($)',
                            minValue: 0,
                            bind: '{flatShipping}'
                        },
                        {
                            xtype: 'numberfield',
                            label: 'Free Shipping Over ($)',
                            minValue: 0,
                            bind: '{freeShippingThreshold}'
                        },
                        {
                            xtype: 'numberfield',
                            label: 'Low Stock Alert Qty',
                            minValue: 1,
                            decimals: 0,
                            bind: '{lowStockThreshold}'
                        },
                        {
                            xtype: 'togglefield',
                            label: 'Maintenance Mode',
                            bind: '{maintenanceMode}'
                        }
                    ]
                },
                {
                    xtype: 'toolbar',
                    docked: 'bottom',
                    items: [
                        '->',
                        {
                            text: 'Reset Defaults',
                            handler: 'onResetDefaults'
                        },
                        {
                            text: 'Save Settings',
                            ui: 'action',
                            iconCls: 'x-fa fa-check',
                            handler: 'onSaveSettings'
                        }
                    ]
                }
            ]
        }
    ]
});
