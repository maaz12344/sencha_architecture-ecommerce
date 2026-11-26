/**
 * Shared Shopping Cart Store.
 * Centralizes cart mutations (add/increment/summary) so Catalog, Quick View,
 * Header Badge, and Checkout stay in sync.
 */
Ext.define('ShopSphere.store.Cart', {
    extend: 'Ext.data.Store',
    alias: 'store.cart',
    storeId: 'cart',
    model: 'ShopSphere.model.CartItem',

    proxy: {
        type: 'memory',
        reader: { type: 'json' }
    },

    data: [
        {
            id: 101,
            productId: 101,
            sku: 'SS-EL-1001',
            name: 'AeroPods Pro Wireless Earbuds',
            brand: 'SonicWave',
            category: 'Electronics',
            price: 249.00,
            quantity: 1,
            stock: 142
        }
    ],

    /**
     * Add a product to the cart or increment its quantity up to available stock.
     * @param {ShopSphere.model.Product} productRec
     * @param {Number} [qty=1]
     * @return {Boolean} true if added/updated, false if out of stock
     */
    addProduct: function (productRec, qty) {
        var amount = qty || 1,
            productId, availableStock, existing, nextQty;

        if (!productRec) {
            return false;
        }

        productId = productRec.get('id');
        availableStock = Number(productRec.get('stock')) || 0;
        if (availableStock <= 0) {
            return false;
        }

        existing = this.findRecord('productId', productId, 0, false, true, true);
        if (existing) {
            nextQty = Math.min(availableStock, (Number(existing.get('quantity')) || 0) + amount);
            existing.set({
                quantity: nextQty,
                stock: availableStock,
                price: productRec.get('price')
            });
            return true;
        }

        this.add({
            id: productId,
            productId: productId,
            sku: productRec.get('sku'),
            name: productRec.get('name'),
            brand: productRec.get('brand'),
            category: productRec.get('category'),
            price: productRec.get('price'),
            quantity: Math.min(availableStock, amount),
            stock: availableStock
        });
        return true;
    },

    /**
     * Compute total item count and merchandise subtotal.
     */
    getCartSummary: function () {
        var itemCount = 0,
            subtotal = 0;

        this.each(function (rec) {
            var q = Number(rec.get('quantity')) || 0;
            itemCount += q;
            subtotal += (Number(rec.get('price')) || 0) * q;
        });

        return {
            itemCount: itemCount,
            subtotal: subtotal
        };
    }
});
