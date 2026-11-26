/**
 * Customers CRM ViewController.
 */
Ext.define('ShopSphere.view.customers.CustomersViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.customersviewcontroller',

    requires: [
        'ShopSphere.util.Format'
    ],

    onFilterChange: function () {
        var vm = this.getViewModel(),
            store = vm.getStore('customers'),
            search = String(vm.get('searchText') || '').toLowerCase().trim(),
            segment = vm.get('segmentFilter') || 'All';

        if (!store) {
            return;
        }

        store.clearFilter(true);
        store.filterBy(function (rec) {
            var matchesSearch = !search ||
                String(rec.get('name')).toLowerCase().indexOf(search) !== -1 ||
                String(rec.get('email')).toLowerCase().indexOf(search) !== -1 ||
                String(rec.get('city')).toLowerCase().indexOf(search) !== -1;

            var matchesSegment = segment === 'All' || rec.get('segment') === segment;
            return matchesSearch && matchesSegment;
        });
    },

    onCustomerSelect: function (grid, selected) {
        var rec = Ext.isArray(selected) ? selected[0] : selected;
        if (!rec) {
            return;
        }

        this.fireEvent('showdetail', {
            entityType: 'Customer',
            title: rec.get('name'),
            subtitle: rec.get('email'),
            badgeHtml: ShopSphere.util.Format.statusBadge(rec.get('segment')),
            rows: [
                { label: 'Phone', value: rec.get('phone') },
                { label: 'Location', value: rec.get('city') + ', ' + rec.get('country') },
                { label: 'Total Orders', value: String(rec.get('ordersCount')) },
                { label: 'Lifetime Value', value: ShopSphere.util.Format.currency(rec.get('totalSpent')) },
                { label: 'Last Order', value: ShopSphere.util.Format.shortDate(rec.get('lastOrderDate')) },
                { label: 'Account Status', value: rec.get('active') ? 'Active' : 'Inactive' }
            ]
        });
    }
});
