/**
 * Customer CRM entity with segmentation and lifetime value fields.
 */
Ext.define('ShopSphere.model.Customer', {
    extend: 'ShopSphere.model.Base',

    fields: [
        { name: 'id', type: 'int' },
        { name: 'name', type: 'string' },
        { name: 'email', type: 'string' },
        { name: 'phone', type: 'string' },
        { name: 'segment', type: 'string', defaultValue: 'Regular' },
        { name: 'ordersCount', type: 'int', defaultValue: 0 },
        { name: 'totalSpent', type: 'number', defaultValue: 0 },
        { name: 'lastOrderDate', type: 'date', dateFormat: 'Y-m-d' },
        { name: 'city', type: 'string' },
        { name: 'country', type: 'string', defaultValue: 'United States' },
        { name: 'active', type: 'boolean', defaultValue: true }
    ]
});
