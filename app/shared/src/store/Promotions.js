/**
 * Promotions & Discount Campaigns Store.
 */
Ext.define('ShopSphere.store.Promotions', {
    extend: 'Ext.data.Store',
    alias: 'store.promotions',
    storeId: 'promotions',
    model: 'ShopSphere.model.Promotion',

    proxy: {
        type: 'memory',
        reader: { type: 'json' }
    },

    data: [
        { id: 1, code: 'BFCM25', name: 'Black Friday / Cyber Week 25% Off', discountType: 'Percentage', discountValue: 25, minOrderAmount: 150, usageCount: 412, usageLimit: 1000, startDate: '2026-11-20', endDate: '2026-12-02', active: true },
        { id: 2, code: 'WELCOME15', name: 'New Customer Welcome Offer', discountType: 'Percentage', discountValue: 15, minOrderAmount: 50, usageCount: 289, usageLimit: 500, startDate: '2026-01-01', endDate: '2026-12-31', active: true },
        { id: 3, code: 'VIP50', name: 'VIP Flat $50 Reward', discountType: 'Fixed', discountValue: 50, minOrderAmount: 300, usageCount: 94, usageLimit: 250, startDate: '2026-10-01', endDate: '2026-12-31', active: true },
        { id: 4, code: 'FREESHIP', name: 'Complimentary Express Shipping', discountType: 'Free Shipping', discountValue: 0, minOrderAmount: 75, usageCount: 620, usageLimit: 1000, startDate: '2026-09-01', endDate: '2026-12-15', active: true },
        { id: 5, code: 'SUMMER20', name: 'Summer Clearance Archive', discountType: 'Percentage', discountValue: 20, minOrderAmount: 100, usageCount: 500, usageLimit: 500, startDate: '2026-06-01', endDate: '2026-08-31', active: false }
    ]
});
