Ext.define('ShopSphere.view.settings.SettingsViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.settingsviewcontroller',

    onSaveSettings: function () {
        var form = this.lookup('settingsForm');
        if (form && !form.validate()) {
            Ext.toast('Please correct invalid settings before saving.', 2500);
            return;
        }
        Ext.toast('Store configuration saved.', 2200);
    },

    onResetDefaults: function () {
        this.getViewModel().set({
            storeName: 'ShopSphere Enterprise Storefront',
            supportEmail: 'ops@shopsphere.io',
            currency: 'USD',
            taxRate: 8.0,
            flatShipping: 12.0,
            freeShippingThreshold: 150.0,
            lowStockThreshold: 15,
            maintenanceMode: false
        });
        Ext.toast('Settings restored to defaults.', 2000);
    }
});
