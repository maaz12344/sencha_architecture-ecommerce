/**
 * Storefront Categories Store.
 */
Ext.define('ShopSphere.store.Categories', {
    extend: 'Ext.data.Store',
    alias: 'store.categories',
    storeId: 'categories',
    model: 'ShopSphere.model.Category',

    sorters: [
        { property: 'displayOrder', direction: 'ASC' }
    ],

    proxy: {
        type: 'memory',
        reader: { type: 'json' }
    },

    data: [
        { id: 1, name: 'Electronics', slug: 'electronics', parentName: 'Root', description: 'Audio, displays, wearables, and smart devices', productCount: 248, displayOrder: 1, active: true },
        { id: 2, name: 'Apparel', slug: 'apparel', parentName: 'Root', description: 'Menswear, womenswear, and performance footwear', productCount: 312, displayOrder: 2, active: true },
        { id: 3, name: 'Home & Kitchen', slug: 'home-kitchen', parentName: 'Root', description: 'Coffee gear, ergonomic furniture, and decor', productCount: 145, displayOrder: 3, active: true },
        { id: 4, name: 'Accessories', slug: 'accessories', parentName: 'Root', description: 'Travel bags, leather goods, and everyday carry', productCount: 64, displayOrder: 4, active: true },
        { id: 5, name: 'Beauty & Wellness', slug: 'beauty-wellness', parentName: 'Root', description: 'Skincare, supplements, and self-care essentials', productCount: 52, displayOrder: 5, active: true },
        { id: 6, name: 'Sports & Outdoors', slug: 'sports-outdoors', parentName: 'Root', description: 'Fitness equipment, cycling, and trail gear', productCount: 35, displayOrder: 6, active: false }
    ]
});
