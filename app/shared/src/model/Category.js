/**
 * Storefront product category entity.
 */
Ext.define('ShopSphere.model.Category', {
    extend: 'ShopSphere.model.Base',

    fields: [
        { name: 'id', type: 'int' },
        { name: 'name', type: 'string' },
        { name: 'slug', type: 'string' },
        { name: 'parentName', type: 'string', defaultValue: 'Root' },
        { name: 'description', type: 'string' },
        { name: 'productCount', type: 'int', defaultValue: 0 },
        { name: 'displayOrder', type: 'int', defaultValue: 1 },
        { name: 'active', type: 'boolean', defaultValue: true },
        {
            name: 'statusLabel',
            calculate: function (data) {
                return data.active ? 'Active' : 'Inactive';
            }
        }
    ]
});
