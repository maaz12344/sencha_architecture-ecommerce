/**
 * Product catalog entity with calculated profit margin and stock health state.
 */
Ext.define('ShopSphere.model.Product', {
    extend: 'ShopSphere.model.Base',

    fields: [
        { name: 'id', type: 'int' },
        { name: 'sku', type: 'string' },
        { name: 'name', type: 'string' },
        { name: 'category', type: 'string' },
        { name: 'brand', type: 'string' },
        { name: 'price', type: 'number', defaultValue: 0 },
        { name: 'cost', type: 'number', defaultValue: 0 },
        { name: 'stock', type: 'int', defaultValue: 0 },
        { name: 'reorderLevel', type: 'int', defaultValue: 15 },
        { name: 'status', type: 'string', defaultValue: 'Active' },
        { name: 'rating', type: 'number', defaultValue: 4.5 },
        { name: 'salesCount', type: 'int', defaultValue: 0 },
        { name: 'description', type: 'string' },
        { name: 'updatedAt',  type: 'date', dateFormat: 'Y-m-d' },
        // imageUrl: free Picsum photo deterministic by seed — works in-browser even without backend
        { name: 'imageUrl',   type: 'string', defaultValue: '' },

        {
            name: 'marginPct',
            calculate: function (data) {
                if (!data.price || data.price <= 0) {
                    return 0;
                }
                return ((data.price - (data.cost || 0)) / data.price) * 100;
            }
        },
        {
            name: 'stockState',
            calculate: function (data) {
                var stock = Number(data.stock) || 0,
                    reorder = Number(data.reorderLevel) || 15;

                if (stock <= 0) {
                    return 'Out of Stock';
                }
                if (stock <= reorder) {
                    return 'Low Stock';
                }
                return 'In Stock';
            }
        },
        {
            name: 'inventoryValue',
            calculate: function (data) {
                return (Number(data.stock) || 0) * (Number(data.cost) || 0);
            }
        }
    ]
});
