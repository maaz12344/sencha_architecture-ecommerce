/**
 * Products Catalog ViewController.
 * Handles filtering, CRUD dialog lifecycle, and master-detail inspector updates.
 */
Ext.define('ShopSphere.view.products.ProductsViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.productsviewcontroller',

    requires: [
        'ShopSphere.util.Format',
        'ShopSphere.view.products.ProductFormDialog'
    ],

    onFilterChange: function () {
        var vm = this.getViewModel(),
            store = vm.getStore('products'),
            search = String(vm.get('searchText') || '').toLowerCase().trim(),
            category = vm.get('categoryFilter') || 'All',
            status = vm.get('statusFilter') || 'All';

        if (!store) {
            return;
        }

        store.clearFilter(true);
        store.filterBy(function (rec) {
            var matchesSearch = !search ||
                String(rec.get('name')).toLowerCase().indexOf(search) !== -1 ||
                String(rec.get('sku')).toLowerCase().indexOf(search) !== -1 ||
                String(rec.get('brand')).toLowerCase().indexOf(search) !== -1;

            var matchesCategory = category === 'All' || rec.get('category') === category;
            var matchesStatus = status === 'All' || rec.get('status') === status;

            return matchesSearch && matchesCategory && matchesStatus;
        });
    },

    onClearFilters: function () {
        var vm = this.getViewModel();
        vm.set({
            searchText: '',
            categoryFilter: 'All',
            statusFilter: 'All'
        });
        this.onFilterChange();
    },

    onProductSelect: function (grid, selected) {
        var rec = Ext.isArray(selected) ? selected[0] : selected;
        if (!rec) {
            return;
        }

        this.fireEvent('showdetail', {
            entityType: 'Product',
            title: rec.get('name'),
            subtitle: rec.get('sku') + ' • ' + rec.get('brand'),
            badgeHtml: ShopSphere.util.Format.statusBadge(rec.get('stockState')),
            rows: [
                { label: 'Category', value: rec.get('category') },
                { label: 'Status', value: rec.get('status') },
                { label: 'Retail Price', value: ShopSphere.util.Format.currency(rec.get('price')) },
                { label: 'Unit Cost', value: ShopSphere.util.Format.currency(rec.get('cost')) },
                { label: 'Gross Margin', value: ShopSphere.util.Format.percent(rec.get('marginPct')) },
                { label: 'Stock On Hand', value: String(rec.get('stock')) + ' units' },
                { label: 'Units Sold', value: String(rec.get('salesCount')) },
                { label: 'Updated', value: ShopSphere.util.Format.shortDate(rec.get('updatedAt')) }
            ],
            notes: rec.get('description')
        });
    },

    onAddProduct: function () {
        this.openProductDialog(null, false);
    },

    onEditProductTool: function (grid, context) {
        if (context && context.record) {
            this.openProductDialog(context.record, true);
        }
    },

    onDeleteProductTool: function (grid, context) {
        var rec = context && context.record,
            masterStore = Ext.getStore('products');

        if (!rec || !masterStore) {
            return;
        }

        Ext.Msg.confirm(
            'Remove Product',
            'Delete "' + Ext.htmlEncode(rec.get('name')) + '" (' + Ext.htmlEncode(rec.get('sku')) + ')?',
            function (choice) {
                if (choice === 'yes') {
                    masterStore.remove(rec);
                    Ext.toast('Product removed from catalog.', 2200);
                }
            }
        );
    },

    openProductDialog: function (record, isEdit) {
        var me = this,
            dialog = Ext.create('ShopSphere.view.products.ProductFormDialog', {
                record: record,
                isEdit: isEdit,
                listeners: {
                    saveproduct: function (dlg, values) {
                        me.saveProductValues(record, isEdit, values);
                        dlg.close();
                    }
                }
            });

        dialog.show();
    },

    saveProductValues: function (record, isEdit, values) {
        var masterStore = Ext.getStore('products'),
            today = Ext.Date.format(new Date(), 'Y-m-d'),
            nextId;

        if (!masterStore) {
            return;
        }

        if (isEdit && record) {
            record.set(Ext.apply({}, values, { updatedAt: today }));
            this.onProductSelect(null, record);
            Ext.toast('Product updated.', 2000);
        } else {
            nextId = (masterStore.max('id') || 100) + 1;
            masterStore.add(Ext.apply({
                id: nextId,
                reorderLevel: 15,
                rating: 4.5,
                salesCount: 0,
                updatedAt: today
            }, values));
            Ext.toast('New product added to catalog.', 2000);
        }
    }
});
