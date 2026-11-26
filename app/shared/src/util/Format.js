/**
 * Shared formatting and badge rendering utilities for ShopSphere.
 * Using a singleton utility prevents duplicating currency, date, and
 * status-pill markup across grids, templates, and detail panels.
 */
Ext.define('ShopSphere.util.Format', {
    alternateClassName: ['ShopSphere.Format'],
    singleton: true,

    /**
     * Format a numeric amount as USD currency (e.g. $1,245.00).
     * @param {Number} value
     * @return {String}
     */
    currency: function (value) {
        var num = Number(value) || 0;
        return Ext.util.Format.usMoney(num);
    },

    /**
     * Format a numeric percentage with 1 decimal place.
     * @param {Number} value
     * @return {String}
     */
    percent: function (value) {
        var num = Number(value) || 0;
        return num.toFixed(1) + '%';
    },

    /**
     * Format a Date or ISO string into a concise display date (e.g. 26 Nov 2026).
     * @param {Date|String} value
     * @return {String}
     */
    shortDate: function (value) {
        if (!value) {
            return '—';
        }
        var date = Ext.isDate(value) ? value : Ext.Date.parse(value, 'Y-m-d', true) || new Date(value);
        if (!date || isNaN(date.getTime())) {
            return String(value);
        }
        return Ext.Date.format(date, 'd M Y');
    },

    /**
     * Render a styled HTML pill badge for statuses across Orders, Products, Customers, and Stock.
     * @param {String} label
     * @param {String} [explicitTone] Optional tone override: success|warning|info|danger|neutral|purple
     * @return {String}
     */
    statusBadge: function (label, explicitTone) {
        var text = Ext.htmlEncode(label || 'Unknown'),
            key = String(label || '').toLowerCase(),
            tone = explicitTone;

        if (!tone) {
            if (key === 'delivered' || key === 'active' || key === 'paid' || key === 'in stock' || key === 'vip') {
                tone = 'success';
            } else if (key === 'pending' || key === 'low stock' || key === 'at risk' || key === 'draft') {
                tone = 'warning';
            } else if (key === 'shipped' || key === 'processing' || key === 'regular' || key === 'new') {
                tone = 'info';
            } else if (key === 'cancelled' || key === 'out of stock' || key === 'refunded' || key === 'inactive' || key === 'archived') {
                tone = 'danger';
            } else {
                tone = 'neutral';
            }
        }

        return '<span class="ss-badge ss-badge--' + tone + '">' + text + '</span>';
    }
});
