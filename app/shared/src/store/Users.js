/**
 * Static Users store — holds the two hard-coded credentials.
 *
 * To add backend auth later: replace the memory proxy with:
 *   proxy: { type: 'rest', url: '/api/auth', reader: { type: 'json', rootProperty: 'data' } }
 * and call store.load() on app start, then do the credential check server-side.
 */
Ext.define('ShopSphere.store.Users', {
    extend: 'Ext.data.Store',
    alias: 'store.users',
    storeId: 'users',
    model: 'ShopSphere.model.User',

    proxy: {
        type: 'memory',
        reader: { type: 'json' }
    },

    data: [
        {
            id: 1,
            username: 'admin',
            password: 'admin123',
            role: 'admin',
            name: 'Admin User',
            customerId: 0
        },
        {
            id: 2,
            username: 'john',
            password: 'john123',
            role: 'customer',
            name: 'John Smith',
            customerId: 1   // matches Customer record id:1 in Customers store
        }
    ]
});
