/**
 * LoginViewModel — holds the form binding data.
 *
 * Ext JS MVVM concept: ViewModels supply reactive data to their bound view.
 * The 'showError' formula drives the error panel's hidden binding.
 */
Ext.define('ShopSphere.view.login.LoginViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.loginviewmodel',

    data: {
        username:     '',
        password:     '',
        errorMessage: '',
        showError:    false
    }
});
