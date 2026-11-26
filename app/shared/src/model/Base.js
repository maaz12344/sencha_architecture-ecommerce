/**
 * Base Model for all ShopSphere domain entities.
 * Defining a shared schema allows Ext JS associations and consistent IDs across models.
 */
Ext.define('ShopSphere.model.Base', {
    extend: 'Ext.data.Model',

    schema: {
        namespace: 'ShopSphere.model'
    }
});
