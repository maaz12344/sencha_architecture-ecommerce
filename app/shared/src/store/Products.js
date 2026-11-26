/**
 * Master Product Catalog Store (single source of truth across Dashboard, Products, and Inventory).
 * Views bind to ChainedStores referencing storeId 'products' so local filters never collide.
 * To connect a backend API later, replace the memory proxy with:
 *   proxy: { type: 'rest', url: '/api/products', reader: { type: 'json', rootProperty: 'data' } }
 */
Ext.define('ShopSphere.store.Products', {
    extend: 'Ext.data.Store',
    alias: 'store.products',
    storeId: 'products',
    model: 'ShopSphere.model.Product',

    sorters: [
        { property: 'id', direction: 'ASC' }
    ],

    proxy: {
        type: 'memory',
        reader: { type: 'json' }
    },

    data: [
        {
            id: 101,
            sku: 'SS-EL-1001',
            name: 'AeroPods Pro Wireless Earbuds',
            category: 'Electronics',
            brand: 'SonicWave',
            price: 249.00,
            cost: 118.00,
            stock: 142,
            reorderLevel: 25,
            status: 'Active',
            rating: 4.8,
            salesCount: 612,
            description: 'Active noise-canceling wireless earbuds with 32-hour USB-C charging case.',
            updatedAt: '2026-11-24',
            imageUrl: 'https://picsum.photos/seed/SS101/400/280'
        },
        {
            id: 102,
            sku: 'SS-EL-1002',
            name: '4K UltraSharp USB-C Monitor 27"',
            category: 'Electronics',
            brand: 'ViewCore',
            price: 549.00,
            cost: 340.00,
            stock: 11,
            reorderLevel: 15,
            status: 'Active',
            rating: 4.7,
            salesCount: 198,
            description: 'IPS 4K UHD panel with 90W power delivery and factory color calibration.',
            updatedAt: '2026-11-25',
            imageUrl: 'https://picsum.photos/seed/SS102/400/280'
        },
        {
            id: 103,
            sku: 'SS-AP-2001',
            name: 'Merino Wool Tailored Blazer',
            category: 'Apparel',
            brand: 'NorthLoft',
            price: 289.00,
            cost: 110.00,
            stock: 58,
            reorderLevel: 12,
            status: 'Active',
            rating: 4.6,
            salesCount: 245,
            description: 'Breathable Italian merino wool blazer designed for all-season business travel.',
            updatedAt: '2026-11-22',
            imageUrl: 'https://picsum.photos/seed/SS103/400/280'
        },
        {
            id: 104,
            sku: 'SS-AP-2002',
            name: 'CloudStride Running Sneakers',
            category: 'Apparel',
            brand: 'Velocity',
            price: 145.00,
            cost: 54.00,
            stock: 0,
            reorderLevel: 20,
            status: 'Active',
            rating: 4.9,
            salesCount: 487,
            description: 'Lightweight carbon-plated midsole engineered for marathon distance comfort.',
            updatedAt: '2026-11-26',
            imageUrl: 'https://picsum.photos/seed/SS104/400/280'
        },
        {
            id: 105,
            sku: 'SS-HM-3001',
            name: 'Barista Precision Espresso Machine',
            category: 'Home & Kitchen',
            brand: 'CremaCraft',
            price: 699.00,
            cost: 410.00,
            stock: 8,
            reorderLevel: 10,
            status: 'Active',
            rating: 4.8,
            salesCount: 134,
            description: 'Dual-boiler stainless espresso brewer with PID temperature control.',
            updatedAt: '2026-11-25',
            imageUrl: 'https://picsum.photos/seed/SS105/400/280'
        },
        {
            id: 106,
            sku: 'SS-HM-3002',
            name: 'Ergonomic Mesh Task Chair',
            category: 'Home & Kitchen',
            brand: 'PostureLab',
            price: 399.00,
            cost: 195.00,
            stock: 34,
            reorderLevel: 10,
            status: 'Active',
            rating: 4.5,
            salesCount: 210,
            description: 'Dynamic lumbar support, 4D armrests, and breathable woven mesh backrest.',
            updatedAt: '2026-11-21',
            imageUrl: 'https://picsum.photos/seed/SS106/400/280'
        },
        {
            id: 107,
            sku: 'SS-AC-4001',
            name: 'Full-Grain Leather Weekender Bag',
            category: 'Accessories',
            brand: 'Atelier Carry',
            price: 265.00,
            cost: 102.00,
            stock: 27,
            reorderLevel: 10,
            status: 'Active',
            rating: 4.7,
            salesCount: 176,
            description: 'Carry-on compliant leather duffel with padded 16-inch laptop sleeve.',
            updatedAt: '2026-11-20',
            imageUrl: 'https://picsum.photos/seed/SS107/400/280'
        },
        {
            id: 108,
            sku: 'SS-AC-4002',
            name: 'Titanium Smart Fitness Watch',
            category: 'Electronics',
            brand: 'PulseTech',
            price: 379.00,
            cost: 190.00,
            stock: 5,
            reorderLevel: 15,
            status: 'Active',
            rating: 4.6,
            salesCount: 329,
            description: 'Dual-band GPS, 14-day battery life, and sapphire crystal display.',
            updatedAt: '2026-11-26',
            imageUrl: 'https://picsum.photos/seed/SS108/400/280'
        },
        {
            id: 109,
            sku: 'SS-BT-5001',
            name: 'Botanical Vitamin C Serum 30ml',
            category: 'Beauty & Wellness',
            brand: 'PureGlow',
            price: 68.00,
            cost: 16.00,
            stock: 215,
            reorderLevel: 30,
            status: 'Active',
            rating: 4.8,
            salesCount: 840,
            description: 'Stabilized 15% L-ascorbic acid serum with ferulic acid and hyaluronic complex.',
            updatedAt: '2026-11-23',
            imageUrl: 'https://picsum.photos/seed/SS109/400/280'
        },
        {
            id: 110,
            sku: 'SS-SP-6001',
            name: 'Adjustable Cast Iron Kettlebell Set',
            category: 'Sports & Outdoors',
            brand: 'IronPeak',
            price: 189.00,
            cost: 92.00,
            stock: 0,
            reorderLevel: 12,
            status: 'Draft',
            rating: 4.4,
            salesCount: 92,
            description: 'Quick-lock weight plates from 10 lb to 40 lb for compact home gyms.',
            updatedAt: '2026-11-18',
            imageUrl: 'https://picsum.photos/seed/SS110/400/280'
        }
    ]
});
