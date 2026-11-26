/**
 * Shopping Cart & Checkout ViewController.
 * Handles cart line-item adjustments, promo code validation, tax/shipping math,
 * and end-to-end order placement across shared Orders, Products, Customers, and Promotions stores.
 */
Ext.define('ShopSphere.view.customer.CartViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.cartviewcontroller',

    requires: [
        'ShopSphere.util.Format'
    ],

    init: function () {
        var cartStore = Ext.getStore('cart'),
            vm = this.getViewModel();

        if (cartStore) {
            this.cartListeners = cartStore.on({
                destroyable: true,
                datachanged: 'recalculateSummary',
                update: 'recalculateSummary',
                scope: this
            });
        }

        this.customerBind = vm.bind('{activeCustomerId}', 'onActiveCustomerChange', this);
        this.recalculateSummary();
    },

    destroy: function () {
        Ext.destroy(this.cartListeners, this.customerBind);
        this.callParent();
    },

    onActiveCustomerChange: function (customerId) {
        var customersStore = Ext.getStore('customers'),
            customer = customersStore ? customersStore.getById(customerId) : null;

        if (customer) {
            this.getViewModel().set('shippingCity', customer.get('city'));
        }
    },

    getComputedTotals: function () {
        var vm = this.getViewModel(),
            cartStore = Ext.getStore('cart'),
            promoStore = Ext.getStore('promotions'),
            summary = cartStore ? cartStore.getCartSummary() : { itemCount: 0, subtotal: 0 },
            subtotal = summary.subtotal,
            promoCode = vm.get('appliedPromoCode'),
            promoRec = promoCode && promoStore ? promoStore.findRecord('code', promoCode, 0, false, false, true) : null,
            discount = 0,
            freeShipping = false,
            taxable, tax, shipping, total;

        if (promoRec && promoRec.get('active') && subtotal >= (Number(promoRec.get('minOrderAmount')) || 0)) {
            if (promoRec.get('discountType') === 'Percentage') {
                discount = subtotal * ((Number(promoRec.get('discountValue')) || 0) / 100);
            } else if (promoRec.get('discountType') === 'Fixed') {
                discount = Math.min(subtotal, Number(promoRec.get('discountValue')) || 0);
            } else if (promoRec.get('discountType') === 'Free Shipping') {
                freeShipping = true;
            }
        }

        taxable = Math.max(0, subtotal - discount);
        tax = taxable * 0.08;
        shipping = subtotal === 0 ? 0 : (freeShipping || taxable >= 150 ? 0 : 12.00);
        total = taxable + tax + shipping;

        return {
            itemCount: summary.itemCount,
            subtotal: subtotal,
            discount: discount,
            tax: tax,
            shipping: shipping,
            total: total,
            promoRec: promoRec
        };
    },

    recalculateSummary: function () {
        var vm = this.getViewModel(),
            totals = this.getComputedTotals();

        vm.set('summaryData', {
            itemCount: totals.itemCount,
            subtotalFormatted: ShopSphere.util.Format.currency(totals.subtotal),
            discountFormatted: '-' + ShopSphere.util.Format.currency(totals.discount),
            hasDiscount: totals.discount > 0,
            taxFormatted: ShopSphere.util.Format.currency(totals.tax),
            shippingFormatted: totals.shipping === 0 ? 'FREE' : ShopSphere.util.Format.currency(totals.shipping),
            totalFormatted: ShopSphere.util.Format.currency(totals.total),
            appliedPromoLabel: vm.get('appliedPromoLabel') || ''
        });
    },

    onDecreaseQty: function (grid, context) {
        var rec = context && context.record,
            cartStore = Ext.getStore('cart'),
            qty;

        if (!rec || !cartStore) {
            return;
        }

        qty = (Number(rec.get('quantity')) || 1) - 1;
        if (qty <= 0) {
            cartStore.remove(rec);
        } else {
            rec.set('quantity', qty);
        }
    },

    onIncreaseQty: function (grid, context) {
        var rec = context && context.record,
            qty, stock;

        if (!rec) {
            return;
        }

        qty = Number(rec.get('quantity')) || 0;
        stock = Number(rec.get('stock')) || 0;
        if (qty >= stock) {
            Ext.toast('Maximum available stock (' + stock + ') reached.', 2000);
            return;
        }
        rec.set('quantity', qty + 1);
    },

    onRemoveItem: function (grid, context) {
        var rec = context && context.record,
            cartStore = Ext.getStore('cart');

        if (rec && cartStore) {
            cartStore.remove(rec);
        }
    },

    onApplyPromo: function () {
        var vm = this.getViewModel(),
            code = String(vm.get('promoCodeInput') || '').trim().toUpperCase(),
            promoStore = Ext.getStore('promotions'),
            cartStore = Ext.getStore('cart'),
            subtotal = cartStore ? cartStore.getCartSummary().subtotal : 0,
            promoRec;

        if (!code) {
            vm.set({ appliedPromoCode: '', appliedPromoLabel: '' });
            this.recalculateSummary();
            return;
        }

        promoRec = promoStore ? promoStore.findRecord('code', code, 0, false, false, true) : null;
        if (!promoRec) {
            Ext.toast('Promo code "' + Ext.htmlEncode(code) + '" not found.', 2300);
            return;
        }
        if (!promoRec.get('active')) {
            Ext.toast('Promo code "' + Ext.htmlEncode(code) + '" is inactive.', 2300);
            return;
        }
        if (subtotal < (Number(promoRec.get('minOrderAmount')) || 0)) {
            Ext.toast(
                'Minimum order of ' + ShopSphere.util.Format.currency(promoRec.get('minOrderAmount')) + ' required.',
                2500
            );
            return;
        }

        vm.set({
            appliedPromoCode: code,
            appliedPromoLabel: promoRec.get('code') + ' (' + promoRec.get('name') + ')'
        });
        this.recalculateSummary();
        Ext.toast('Promo code ' + code + ' applied!', 2000);
    },

    onContinueShopping: function () {
        this.redirectTo('shop/catalog');
    },

    onPlaceOrder: function () {
        var vm = this.getViewModel(),
            form = this.lookup('checkoutForm'),
            cartStore = Ext.getStore('cart'),
            ordersStore = Ext.getStore('orders'),
            orderItemsStore = Ext.getStore('orderItems'),
            productsStore = Ext.getStore('products'),
            customersStore = Ext.getStore('customers'),
            customerId = vm.get('activeCustomerId'),
            customer = customersStore ? customersStore.getById(customerId) : null,
            totals = this.getComputedTotals(),
            nextOrderId, orderNumber, today;

        if (!cartStore || cartStore.getCount() === 0) {
            Ext.toast('Your cart is empty. Add products before checking out.', 2300);
            return;
        }
        if (form && !form.validate()) {
            Ext.toast('Please complete the shipping address and payment fields.', 2300);
            return;
        }

        today = Ext.Date.format(new Date(), 'Y-m-d');
        nextOrderId = ordersStore ? (ordersStore.max('id') || 1028) + 1 : 1029;
        orderNumber = '#ORD-' + nextOrderId;

        if (ordersStore) {
            ordersStore.add({
                id: nextOrderId,
                orderNumber: orderNumber,
                customerId: customer ? customer.get('id') : 1,
                customerName: customer ? customer.get('name') : 'Guest Shopper',
                customerEmail: customer ? customer.get('email') : 'guest@shopsphere.io',
                orderDate: today,
                itemsCount: totals.itemCount,
                subtotal: Math.max(0, totals.subtotal - totals.discount),
                tax: Number(totals.tax.toFixed(2)),
                shipping: Number(totals.shipping.toFixed(2)),
                total: Number(totals.total.toFixed(2)),
                paymentMethod: vm.get('paymentMethod'),
                paymentStatus: 'Paid',
                status: 'Pending',
                shippingCity: vm.get('shippingCity') || (customer ? customer.get('city') : ''),
                shippingAddress: vm.get('shippingAddress'),
                notes: vm.get('orderNotes') || (totals.promoRec ? 'Promo: ' + totals.promoRec.get('code') : '')
            });
        }

        // ── Create OrderItem records for the line-item breakdown ──────────────
        if (orderItemsStore) {
            var nextItemId = (orderItemsStore.max('id') || 0) + 1;
            cartStore.each(function (cartItem) {
                orderItemsStore.add({
                    id:        nextItemId++,
                    orderId:   nextOrderId,
                    productId: cartItem.get('productId'),
                    sku:       cartItem.get('sku'),
                    name:      cartItem.get('name'),
                    price:     cartItem.get('price'),
                    quantity:  cartItem.get('quantity')
                });
            });
        }

        // Deduct purchased stock & increment product sales count
        if (productsStore) {
            cartStore.each(function (cartItem) {
                var prod = productsStore.getById(cartItem.get('productId')),
                    qty = Number(cartItem.get('quantity')) || 0;
                if (prod) {
                    prod.set({
                        stock: Math.max(0, (Number(prod.get('stock')) || 0) - qty),
                        salesCount: (Number(prod.get('salesCount')) || 0) + qty,
                        updatedAt: today
                    });
                }
            });
        }

        // Increment promo usage & customer lifetime value
        if (totals.promoRec) {
            totals.promoRec.set('usageCount', (Number(totals.promoRec.get('usageCount')) || 0) + 1);
        }
        if (customer) {
            customer.set({
                ordersCount: (Number(customer.get('ordersCount')) || 0) + 1,
                totalSpent: Number(((Number(customer.get('totalSpent')) || 0) + totals.total).toFixed(2)),
                lastOrderDate: today
            });
        }

        cartStore.removeAll();
        vm.set({
            promoCodeInput: '',
            appliedPromoCode: '',
            appliedPromoLabel: '',
            orderNotes: ''
        });
        this.recalculateSummary();

        Ext.toast('Order ' + orderNumber + ' placed! Thank you for shopping with ShopSphere.', 3000);
        this.redirectTo('shop/orders');
    }
});
