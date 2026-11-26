Ext.define('ShopSphere.view.main.MainViewController', {
	extend: 'Ext.app.ViewController',
	alias: 'controller.mainviewcontroller',

	requires: [
		'ShopSphere.util.Auth'
	],

	routes: { 
		':xtype': {action: 'mainRoute'},
		'shop/:section': {action: 'shopRoute'}
	},

	// Listen to domain events fired by any child ViewController across the app
	listen: {
		controller: {
			'*': {
				showdetail: 'onShowDetail',
				navigate: 'onNavigateToRoute'
			}
		}
	},

	initViewModel: function(vm){
		vm.getStore('menu').on({
			load: 'onMenuDataLoad',
			single: true,
			scope: this
		});
	},

	onMenuDataLoad: function(store){
		this.mainRoute(Ext.util.History.getHash());
	},

	mainRoute: function (xtype) {
		var navview = this.lookup('navview'),
			menuview = navview.lookup('menuview'),
			centerview = this.lookup('centerview'),
			exists = Ext.ClassManager.getByAlias('widget.' + xtype),
			node, vm;

		if (exists === undefined) {
			console.log(xtype + ' does not exist');
			return;
		}

		node = this.getStore('menu').findNode('xtype', xtype);

		if (node == null) {
			console.log('unmatchedRoute: ' + xtype);
			return;
		}

		Ext.Viewport.setActiveItem(this.getView());

		if (!centerview.getComponent(xtype)) {
			centerview.add({ xtype: xtype, itemId: xtype, heading: node.get('text') });
		}

		centerview.setActiveItem(xtype);
		menuview.setSelection(node);
		vm = this.getViewModel();
		vm.set('heading', node.get('text'));
	},

	onMenuViewSelectionChange: function (tree, node) {
		if (node == null) { return }

		var vm = this.getViewModel();

		if (node.get('xtype') != undefined) {
			this.redirectTo( node.get('xtype') );
		}
	},

	onTopViewNavToggle: function () {
		var vm = this.getViewModel();

		vm.set('navCollapsed', !vm.get('navCollapsed'));
	},

	onHeaderViewDetailToggle: function (button) {
		var vm = this.getViewModel(),
			toggleBtn = button || this.lookup('headerview').lookup('detailtoggle');

		vm.set('detailCollapsed', !vm.get('detailCollapsed'));

		if (toggleBtn) {
			toggleBtn.setIconCls(vm.get('detailCollapsed') ? 'x-fa fa-arrow-left' : 'x-fa fa-arrow-right');
		}
	},

	onShowDetail: function (payload) {
		var vm = this.getViewModel(),
			header = this.lookup('headerview'),
			toggleBtn = header ? header.lookup('detailtoggle') : null;

		vm.set('detailPayload', payload || null);
		vm.set('detailCollapsed', false);
		if (toggleBtn) {
			toggleBtn.setIconCls('x-fa fa-arrow-right');
		}
	},

	onNavigateToRoute: function (xtype) {
		if (xtype) {
			this.redirectTo(xtype);
		}
	},

	onSwitchToCustomerPortal: function () {
		this.redirectTo('shop/catalog');
	},

	shopRoute: function (section) {
		var portal = Ext.Viewport.down('customerportalview');
		if (!portal) {
			portal = Ext.Viewport.add({ xtype: 'customerportalview' });
		}
		Ext.Viewport.setActiveItem(portal);
		portal.getController().activateSection(section || 'catalog');
	},

	onBottomViewlogout: function () {
		// Use Auth singleton to properly clear the session
		ShopSphere.util.Auth.logout();
		this.getView().destroy();
		Ext.Viewport.add([{ xtype: 'loginview' }]);
	}
});
