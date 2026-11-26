/**
 * OrderItem — a single line inside an Order (product + quantity + price at time of purchase).
 *
 * Ext JS concept: 'calculate' fields derive their value from other fields on the same record
 * automatically — no setter needed. When quantity or price changes, lineTotal updates reactively.
 *
 * Association note: Order hasMany OrderItems via orderId foreign key.
 * Access items for an order via: order.orderItems() — returns a filtered Store.
 */
Ext.define('ShopSphere.model.OrderItem', {
    extend: 'ShopSphere.model.Base',

    fields: [
        { name: 'id',        type: 'int' },
        { name: 'orderId',   type: 'int' },   // foreign key → Order.id
        { name: 'productId', type: 'int' },   // reference → Product.id
        { name: 'sku',       type: 'string' },
        { name: 'name',      type: 'string' },
        { name: 'price',     type: 'number', defaultValue: 0 },   // unit price at time of purchase
        { name: 'quantity',  type: 'int',    defaultValue: 1 },
        {
            // Computed: price × quantity — recalculates automatically when price/quantity change
            name: 'lineTotal',
            calculate: function (data) {
                return (Number(data.price) || 0) * (Number(data.quantity) || 0);
            }
        }
    ]
});
