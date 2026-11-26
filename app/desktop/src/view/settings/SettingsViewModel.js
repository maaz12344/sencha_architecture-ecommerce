Ext.define('ShopSphere.view.settings.SettingsViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.settingsviewmodel',

    data: {
        storeName: 'ShopSphere Enterprise Storefront',
        supportEmail: 'ops@shopsphere.io',
        currency: 'USD',
        taxRate: 8.0,
        flatShipping: 12.0,
        freeShippingThreshold: 150.0,
        lowStockThreshold: 15,
        maintenanceMode: false
    }
});
