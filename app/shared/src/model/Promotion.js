/**
 * Promotional campaign / coupon code entity.
 */
Ext.define('ShopSphere.model.Promotion', {
    extend: 'ShopSphere.model.Base',

    fields: [
        { name: 'id', type: 'int' },
        { name: 'code', type: 'string' },
        { name: 'name', type: 'string' },
        { name: 'discountType', type: 'string', defaultValue: 'Percentage' },
        { name: 'discountValue', type: 'number', defaultValue: 0 },
        { name: 'minOrderAmount', type: 'number', defaultValue: 0 },
        { name: 'usageCount', type: 'int', defaultValue: 0 },
        { name: 'usageLimit', type: 'int', defaultValue: 500 },
        { name: 'startDate', type: 'date', dateFormat: 'Y-m-d' },
        { name: 'endDate', type: 'date', dateFormat: 'Y-m-d' },
        { name: 'active', type: 'boolean', defaultValue: true },
        {
            name: 'statusLabel',
            calculate: function (data) {
                return data.active ? 'Active' : 'Inactive';
            }
        }
    ]
});
