/**
 * Right-hand master-detail inspector drawer.
 * Displays structured metadata for whichever Product, Order, or Customer is selected.
 */
Ext.define('ShopSphere.view.main.detail.DetailView', {
    extend: 'Ext.Panel',
    xtype: 'detailview',
    cls: 'detailview',
    layout: 'fit',

    title: 'Inspector',
    header: {
        cls: 'ss-detail-header'
    },

    items: [
        {
            xtype: 'component',
            scrollable: true,
            cls: 'ss-detail-body',
            bind: {
                data: '{detailPayload}'
            },
            tpl: new Ext.XTemplate(
                '<tpl if="title">',
                    '<div class="ss-detail-card">',
                        '<div class="ss-detail-top">',
                            '<span class="ss-detail-eyebrow">{entityType:htmlEncode}</span>',
                            '{badgeHtml}',
                        '</div>',
                        '<h3 class="ss-detail-title">{title:htmlEncode}</h3>',
                        '<tpl if="subtitle"><p class="ss-detail-subtitle">{subtitle:htmlEncode}</p></tpl>',
                        '<div class="ss-detail-rows">',
                            '<tpl for="rows">',
                                '<div class="ss-detail-row">',
                                    '<span class="ss-detail-label">{label:htmlEncode}</span>',
                                    '<span class="ss-detail-value">{value:htmlEncode}</span>',
                                '</div>',
                            '</tpl>',
                        '</div>',
                        '<tpl if="notes">',
                            '<div class="ss-detail-notes">',
                                '<div class="ss-detail-label">Notes</div>',
                                '<p>{notes:htmlEncode}</p>',
                            '</div>',
                        '</tpl>',
                    '</div>',
                '<tpl else>',
                    '<div class="ss-detail-empty">',
                        '<span class="x-fa fa-info-circle"></span>',
                        '<h4>Nothing Selected</h4>',
                        '<p>Select any product, order, or customer row to inspect details here.</p>',
                    '</div>',
                '</tpl>'
            )
        }
    ]
});
