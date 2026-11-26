Ext.define('ShopSphere.view.main.nav.top.TopView', {
    extend: 'Ext.Toolbar',
    xtype: 'topview',
    cls: 'topview',
    viewModel: {},
    shadow: false,
    items: [
        {
            xtype: 'container', 
            cls: 'topviewtext',
            bind: { 
                html: `
                <div class="brand-container">
                    <span class="brand-logo">S</span>
                    <span class="brand-name">ShopSphere</span>
                </div>
            `,
                hidden: '{navCollapsed}' 
            }
        },
        '->',
        {
            xtype: 'button',
            ui: 'topviewbutton',
            reference: 'navtoggle',
            handler: 'onTopViewNavToggle',
            iconCls: 'x-fa fa-navicon'
        }
    ]
});