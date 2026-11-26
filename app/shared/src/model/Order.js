/**
 * Customer order entity used by Dashboard KPIs, Orders grid, and Detail drawer.
 *
 * hasMany association: an Order can have many OrderItem records.
 * Access via: order.orderItems() — returns an inline filtered Store.
 *
 * Ext JS concept: associations let you traverse relational data between models
 * without leaving the in-memory store layer.
 */
Ext.define('ShopSphere.model.Order', {
    extend: 'ShopSphere.model.Base',

    requires: ['ShopSphere.model.OrderItem'],

    hasMany: {
        model: 'ShopSphere.model.OrderItem',
        name: 'orderItems',
        foreignKey: 'orderId'
    },

    fields: [
        { name: 'id', type: 'int' },
        { name: 'orderNumber', type: 'string' },
        { name: 'customerId', type: 'int' },
        { name: 'customerName', type: 'string' },
        { name: 'customerEmail', type: 'string' },
        { name: 'orderDate', type: 'date', dateFormat: 'Y-m-d' },
        { name: 'itemsCount', type: 'int', defaultValue: 1 },
        { name: 'subtotal', type: 'number', defaultValue: 0 },
        { name: 'tax', type: 'number', defaultValue: 0 },
        { name: 'shipping', type: 'number', defaultValue: 0 },
        { name: 'total', type: 'number', defaultValue: 0 },
        { name: 'paymentMethod', type: 'string', defaultValue: 'Credit Card' },
        { name: 'paymentStatus', type: 'string', defaultValue: 'Paid' },
        { name: 'status', type: 'string', defaultValue: 'Pending' },
        { name: 'shippingCity', type: 'string' },
        { name: 'shippingAddress', type: 'string' },
        { name: 'notes', type: 'string' }
    ]
});
