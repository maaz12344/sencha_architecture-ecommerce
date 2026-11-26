/**
 * User entity for authentication.
 *
 * Ext JS MVVM concept: Models define the shape and type-casting of data records.
 * The 'role' field controls which parts of the UI are visible after login.
 * 'customerId' links a customer-role user to their CRM record in the Customers store.
 */
Ext.define('ShopSphere.model.User', {
    extend: 'ShopSphere.model.Base',

    fields: [
        { name: 'id',         type: 'int' },
        { name: 'username',   type: 'string' },
        { name: 'password',   type: 'string' },   // plain-text — static only; swap for hash later
        { name: 'role',       type: 'string' },   // 'admin' | 'customer'
        { name: 'name',       type: 'string' },
        { name: 'customerId', type: 'int', defaultValue: 0 }  // non-zero for customer role
    ]
});
