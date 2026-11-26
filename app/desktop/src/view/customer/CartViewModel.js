/**
 * Shopping Cart & Checkout ViewModel.
 */
Ext.define('ShopSphere.view.customer.CartViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.cartviewmodel',

    data: {
        promoCodeInput: '',
        appliedPromoCode: '',
        appliedPromoLabel: '',
        shippingAddress: '742 Congress Ave, Suite 400, Austin, TX 78701',
        shippingCity: 'Austin, TX',
        paymentMethod: 'Credit Card (Visa •••• 4242)',
        orderNotes: '',
        summaryData: {
            itemCount: 0,
            subtotalFormatted: '$0.00',
            discountFormatted: '$0.00',
            hasDiscount: false,
            taxFormatted: '$0.00',
            shippingFormatted: '$0.00',
            totalFormatted: '$0.00',
            appliedPromoLabel: ''
        }
    },

    stores: {
        cartItems: {
            type: 'chained',
            source: 'cart'
        }
    }
});
