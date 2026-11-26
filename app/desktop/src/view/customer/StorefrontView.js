/**
 * Customer-Facing Product Catalog Grid View.
 */
Ext.define('ShopSphere.view.customer.StorefrontView', {
    extend: 'Ext.Panel',
    xtype: 'storefrontview',
    cls: 'ss-page-panel storefrontview',

    requires: [
        'Ext.dataview.DataView',
        'Ext.Toolbar',
        'Ext.field.Search',
        'Ext.field.Select',
        'ShopSphere.util.Format'
    ],

    controller: { type: 'storefrontviewcontroller' },
    viewModel: { type: 'storefrontviewmodel' },

    layout: 'fit',

    items: [
        {
            xtype: 'toolbar',
            docked: 'top',
            cls: 'ss-page-toolbar',
            items: [
                {
                    xtype: 'searchfield',
                    placeholder: 'Search products or brands...',
                    width: 280,
                    bind: '{searchText}',
                    listeners: {
                        change: { fn: 'onCatalogFilterChange', buffer: 150 }
                    }
                },
                {
                    xtype: 'selectfield',
                    width: 190,
                    bind: '{categoryFilter}',
                    options: [
                        { text: 'All Categories', value: 'All' },
                        { text: 'Electronics', value: 'Electronics' },
                        { text: 'Apparel', value: 'Apparel' },
                        { text: 'Home & Kitchen', value: 'Home & Kitchen' },
                        { text: 'Accessories', value: 'Accessories' },
                        { text: 'Beauty & Wellness', value: 'Beauty & Wellness' }
                    ],
                    listeners: {
                        change: 'onCatalogFilterChange'
                    }
                },
                '->',
                {
                    xtype: 'selectfield',
                    width: 195,
                    label: 'Sort:',
                    labelWidth: 42,
                    bind: '{sortBy}',
                    options: [
                        { text: 'Best Selling', value: 'featured' },
                        { text: 'Price: Low to High', value: 'price_asc' },
                        { text: 'Price: High to Low', value: 'price_desc' },
                        { text: 'Top Rated', value: 'rating' }
                    ],
                    listeners: {
                        change: 'onSortChange'
                    }
                }
            ]
        },
        {
            xtype: 'dataview',
            cls: 'ss-catalog-grid',
            scrollable: true,
            disableSelection: true,
            bind: '{catalog}',
            emptyText: 'No matching products found.',
            listeners: {
                childtap: 'onProductCardTap'
            },
            itemTpl: new Ext.XTemplate(
                '<div class="ss-product-card x-item-no-select">',
                    // ── Product image (Picsum via imageUrl field) ──────────────────
                    '<div class="ss-product-card__img-wrap">',
                        '<tpl if="imageUrl">',
                            '<img class="ss-product-card__img" src="{imageUrl}" ',
                                 'alt="{name:htmlEncode}" ',
                                 'onerror="this.parentNode.classList.add(\'ss-product-card__img-wrap--error\')"/>',
                        '</tpl>',
                        '<tpl if="!imageUrl">',
                            '<div class="ss-product-card__img-placeholder">{[values.name ? values.name[0] : "?"]}</div>',
                        '</tpl>',
                    '</div>',
                    // ── Card body ──────────────────────────────────────────────────
                    '<div class="ss-product-card__body">',
                        '<div class="ss-product-card__top">',
                            '<span class="ss-product-card__cat">{category:htmlEncode}</span>',
                            '{[ShopSphere.util.Format.statusBadge(values.stockState)]}',
                        '</div>',
                        '<div class="ss-product-card__brand">{brand:htmlEncode}</div>',
                        '<h3 class="ss-product-card__title">{name:htmlEncode}</h3>',
                        '<p class="ss-product-card__desc">{description:htmlEncode}</p>',
                        '<div class="ss-product-card__meta">',
                            '<span class="ss-product-card__rating">★ {[Number(values.rating || 0).toFixed(1)]}</span>',
                            '<span class="ss-product-card__sold">{salesCount} sold</span>',
                        '</div>',
                        '<div class="ss-product-card__footer">',
                            '<span class="ss-product-card__price">{[ShopSphere.util.Format.currency(values.price)]}</span>',
                            '<div class="ss-product-card__actions">',
                                '<button type="button" class="ss-btn ss-btn--ghost js-quick-view">Details</button>',
                                '<button type="button" class="ss-btn ss-btn--primary js-add-to-cart" {[values.stock <= 0 ? "disabled" : ""]}>',
                                    '{[values.stock <= 0 ? "Sold Out" : "+ Add"]}',
                                '</button>',
                            '</div>',
                        '</div>',
                    '</div>',
                '</div>'
            )
        }
    ]
});
