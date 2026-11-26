/**
 * Shopping Cart line-item model for the Customer Storefront.
 */
Ext.define('ShopSphere.model.CartItem', {
    extend: 'ShopSphere.model.Base',

    fields: [
        { name: 'id', type: 'int' },
        { name: 'productId', type: 'int' },
        { name: 'sku', type: 'string' },
        { name: 'name', type: 'string' },
        { name: 'brand', type: 'string' },
        { name: 'category', type: 'string' },
        { name: 'price', type: 'number', defaultValue: 0 },
        { name: 'quantity', type: 'int', defaultValue: 1 },
        { name: 'stock', type: 'int', defaultValue: 0 },
        {
            name: 'lineTotal',
            calculate: function (data) {
                return (Number(data.price) || 0) * (Number(data.quantity) || 0);
            }
        }
    ]
});
