/**
 * Storefront Catalog ViewController.
 * Handles product search, category filtering, sorting, Quick View modal, and Add to Cart.
 */
Ext.define('ShopSphere.view.customer.StorefrontViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.storefrontviewcontroller',

    requires: [
        'Ext.Dialog',
        'ShopSphere.util.Format'
    ],

    onCatalogFilterChange: function () {
        var vm = this.getViewModel(),
            store = vm.getStore('catalog'),
            search = String(vm.get('searchText') || '').toLowerCase().trim(),
            category = vm.get('categoryFilter') || 'All';

        if (!store) {
            return;
        }

        store.clearFilter(true);
        store.filterBy(function (rec) {
            var isActive = rec.get('status') === 'Active',
                matchesSearch = !search ||
                    String(rec.get('name')).toLowerCase().indexOf(search) !== -1 ||
                    String(rec.get('brand')).toLowerCase().indexOf(search) !== -1 ||
                    String(rec.get('description')).toLowerCase().indexOf(search) !== -1,
                matchesCat = category === 'All' || rec.get('category') === category;

            return isActive && matchesSearch && matchesCat;
        });
    },

    onSortChange: function (field, value) {
        var store = this.getViewModel().getStore('catalog');
        if (!store) {
            return;
        }

        if (value === 'price_asc') {
            store.sort('price', 'ASC');
        } else if (value === 'price_desc') {
            store.sort('price', 'DESC');
        } else if (value === 'rating') {
            store.sort('rating', 'DESC');
        } else {
            store.sort('salesCount', 'DESC');
        }
    },

    onProductCardTap: function (dataview, location) {
        var rec = location && location.record,
            event = location && location.event;

        if (!rec || !event) {
            return;
        }

        if (event.getTarget('.js-add-to-cart')) {
            this.addToCart(rec);
        } else if (event.getTarget('.js-quick-view')) {
            this.openQuickView(rec);
        }
    },

    addToCart: function (rec) {
        var cartStore = Ext.getStore('cart'),
            added;

        if (!cartStore) {
            return;
        }

        added = cartStore.addProduct(rec, 1);
        if (added) {
            Ext.toast('Added "' + Ext.htmlEncode(rec.get('name')) + '" to your cart.', 2000);
        } else {
            Ext.toast('Sorry, this item is currently out of stock.', 2200);
        }
    },

    openQuickView: function (rec) {
        var me = this,
            stock = Number(rec.get('stock')) || 0,
            dialog = Ext.create('Ext.Dialog', {
                title: rec.get('name'),
                closable: true,
                modal: true,
                width: 460,
                maxWidth: '92vw',
                padding: 20,
                html:
                    '<div class="ss-quick-view">' +
                        '<div class="ss-qv-meta">' +
                            '<span class="ss-qv-brand">' + Ext.htmlEncode(rec.get('brand')) + ' • ' + Ext.htmlEncode(rec.get('category')) + '</span>' +
                            ShopSphere.util.Format.statusBadge(rec.get('stockState')) +
                        '</div>' +
                        '<div class="ss-qv-price">' + ShopSphere.util.Format.currency(rec.get('price')) + '</div>' +
                        '<p class="ss-qv-desc">' + Ext.htmlEncode(rec.get('description')) + '</p>' +
                        '<div class="ss-qv-stats">' +
                            '<span>SKU: <strong>' + Ext.htmlEncode(rec.get('sku')) + '</strong></span>' +
                            '<span>Rating: <strong>★ ' + Number(rec.get('rating')).toFixed(1) + '</strong></span>' +
                            '<span>Available: <strong>' + stock + ' units</strong></span>' +
                        '</div>' +
                    '</div>',
                buttons: [
                    {
                        text: 'Close',
                        handler: function (btn) {
                            btn.up('dialog').close();
                        }
                    },
                    {
                        text: stock > 0 ? 'Add to Cart' : 'Out of Stock',
                        ui: 'action',
                        disabled: stock <= 0,
                        handler: function (btn) {
                            me.addToCart(rec);
                            btn.up('dialog').close();
                        }
                    }
                ]
            });

        dialog.show();
    }
});
