/**
 * OrderItems store — itemised line-item breakdown for all seeded orders.
 *
 * Seed data covers 8 existing orders (id 1021-1028) with realistic product references
 * matching the Products store (id 101-110).
 *
 * To connect to a backend later, replace the memory proxy with:
 *   proxy: { type: 'rest', url: '/api/order-items', reader: { type: 'json', rootProperty: 'data' } }
 */
Ext.define('ShopSphere.store.OrderItems', {
    extend: 'Ext.data.Store',
    alias: 'store.orderitems',
    storeId: 'orderItems',
    model: 'ShopSphere.model.OrderItem',

    proxy: {
        type: 'memory',
        reader: { type: 'json' }
    },

    data: [
        // Order 1021 — 2 items
        { id: 1, orderId: 1021, productId: 101, sku: 'SS-EL-1001', name: 'AeroPods Pro Wireless Earbuds',       price: 249.00, quantity: 1 },
        { id: 2, orderId: 1021, productId: 109, sku: 'SS-BT-5001', name: 'Botanical Vitamin C Serum 30ml',      price: 68.00,  quantity: 2 },

        // Order 1022 — 2 items
        { id: 3, orderId: 1022, productId: 102, sku: 'SS-EL-1002', name: '4K UltraSharp USB-C Monitor 27"',    price: 549.00, quantity: 1 },
        { id: 4, orderId: 1022, productId: 106, sku: 'SS-HM-3002', name: 'Ergonomic Mesh Task Chair',           price: 399.00, quantity: 1 },

        // Order 1023 — 3 items
        { id: 5, orderId: 1023, productId: 103, sku: 'SS-AP-2001', name: 'Merino Wool Tailored Blazer',         price: 289.00, quantity: 1 },
        { id: 6, orderId: 1023, productId: 104, sku: 'SS-AP-2002', name: 'CloudStride Running Sneakers',        price: 145.00, quantity: 1 },
        { id: 7, orderId: 1023, productId: 107, sku: 'SS-AC-4001', name: 'Full-Grain Leather Weekender Bag',    price: 265.00, quantity: 1 },

        // Order 1024 — 2 items
        { id: 8,  orderId: 1024, productId: 105, sku: 'SS-HM-3001', name: 'Barista Precision Espresso Machine', price: 699.00, quantity: 1 },
        { id: 9,  orderId: 1024, productId: 109, sku: 'SS-BT-5001', name: 'Botanical Vitamin C Serum 30ml',     price: 68.00,  quantity: 1 },

        // Order 1025 — 2 items
        { id: 10, orderId: 1025, productId: 108, sku: 'SS-AC-4002', name: 'Titanium Smart Fitness Watch',       price: 379.00, quantity: 1 },
        { id: 11, orderId: 1025, productId: 110, sku: 'SS-SP-6001', name: 'Adjustable Cast Iron Kettlebell Set',price: 189.00, quantity: 2 },

        // Order 1026 — 1 item
        { id: 12, orderId: 1026, productId: 101, sku: 'SS-EL-1001', name: 'AeroPods Pro Wireless Earbuds',      price: 249.00, quantity: 2 },

        // Order 1027 — 2 items
        { id: 13, orderId: 1027, productId: 103, sku: 'SS-AP-2001', name: 'Merino Wool Tailored Blazer',         price: 289.00, quantity: 1 },
        { id: 14, orderId: 1027, productId: 109, sku: 'SS-BT-5001', name: 'Botanical Vitamin C Serum 30ml',      price: 68.00,  quantity: 3 },

        // Order 1028 — 2 items
        { id: 15, orderId: 1028, productId: 106, sku: 'SS-HM-3002', name: 'Ergonomic Mesh Task Chair',           price: 399.00, quantity: 1 },
        { id: 16, orderId: 1028, productId: 108, sku: 'SS-AC-4002', name: 'Titanium Smart Fitness Watch',        price: 379.00, quantity: 1 }
    ]
});
