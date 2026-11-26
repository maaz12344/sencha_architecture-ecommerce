/**
 * Customer CRM Store.
 */
Ext.define('ShopSphere.store.Customers', {
    extend: 'Ext.data.Store',
    alias: 'store.customers',
    storeId: 'customers',
    model: 'ShopSphere.model.Customer',

    sorters: [
        { property: 'totalSpent', direction: 'DESC' }
    ],

    proxy: {
        type: 'memory',
        reader: { type: 'json' }
    },

    data: [
        { id: 1, name: 'John Smith', email: 'john.smith@example.com', phone: '+1 (512) 555-0148', segment: 'VIP', ordersCount: 14, totalSpent: 4820.50, lastOrderDate: '2026-11-26', city: 'Austin, TX', country: 'United States', active: true },
        { id: 2, name: 'Sarah Wilson', email: 'sarah.wilson@example.com', phone: '+1 (206) 555-0192', segment: 'VIP', ordersCount: 11, totalSpent: 3690.00, lastOrderDate: '2026-11-26', city: 'Seattle, WA', country: 'United States', active: true },
        { id: 3, name: 'Michael Brown', email: 'michael.brown@example.com', phone: '+1 (312) 555-0117', segment: 'Regular', ordersCount: 6, totalSpent: 1940.25, lastOrderDate: '2026-11-25', city: 'Chicago, IL', country: 'United States', active: true },
        { id: 4, name: 'Emily Davis', email: 'emily.davis@example.com', phone: '+1 (303) 555-0164', segment: 'Regular', ordersCount: 5, totalSpent: 1120.80, lastOrderDate: '2026-11-25', city: 'Denver, CO', country: 'United States', active: true },
        { id: 5, name: 'Daniel Martinez', email: 'd.martinez@example.com', phone: '+1 (619) 555-0183', segment: 'VIP', ordersCount: 18, totalSpent: 6410.00, lastOrderDate: '2026-11-24', city: 'San Diego, CA', country: 'United States', active: true },
        { id: 6, name: 'Priya Nair', email: 'priya.nair@example.com', phone: '+1 (617) 555-0129', segment: 'New', ordersCount: 2, totalSpent: 485.20, lastOrderDate: '2026-11-23', city: 'Boston, MA', country: 'United States', active: true },
        { id: 7, name: 'Lucas Carter', email: 'lucas.carter@example.com', phone: '+1 (305) 555-0175', segment: 'New', ordersCount: 1, totalSpent: 168.60, lastOrderDate: '2026-11-21', city: 'Miami, FL', country: 'United States', active: true },
        { id: 8, name: 'Hannah Brooks', email: 'hannah.brooks@example.com', phone: '+1 (503) 555-0151', segment: 'At Risk', ordersCount: 4, totalSpent: 875.00, lastOrderDate: '2026-08-14', city: 'Portland, OR', country: 'United States', active: false }
    ]
});
