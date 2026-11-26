/**
 * LoginView — the entry-point screen for ShopSphere.
 *
 * Ext JS concepts demonstrated:
 *  - Ext.Container with layout:'center' to vertically+horizontally centre the card
 *  - Ext.form.Panel for field grouping and validation
 *  - Two-way data binding: textfield 'bind' syncs field value → ViewModel → back
 *  - reference: 'xxx' lets the controller call this.lookup('xxx')
 *  - hidden binding: '{showError}' hides/shows the error panel reactively
 *  - Quick-login pills for fast demo switching (dev-only UX pattern)
 */
Ext.define('ShopSphere.view.login.LoginView', {
    extend: 'Ext.Container',
    xtype:  'loginview',
    cls:    'ss-login-bg',

    requires: [
        'Ext.form.Panel',
        'Ext.field.Text',
        'Ext.field.Password',
        'Ext.Button'
    ],

    controller: { type: 'loginviewcontroller' },
    viewModel:  { type: 'loginviewmodel'      },

    // Fill the full viewport
    layout: 'center',

    items: [
        {
            xtype: 'container',
            cls:   'ss-login-card',
            width:  400,
            padding: 0,

            items: [
                // ── Brand header ───────────────────────────────────────────
                {
                    xtype: 'component',
                    cls:   'ss-login-brand',
                    html: [
                        '<div class="ss-login-logo">S</div>',
                        '<h1 class="ss-login-title">ShopSphere</h1>',
                        '<p class="ss-login-subtitle">Enterprise E-Commerce Platform</p>'
                    ].join('')
                },

                // ── Form ───────────────────────────────────────────────────
                {
                    xtype: 'formpanel',
                    reference: 'loginForm',
                    cls:    'ss-login-form',
                    bodyPadding: '24px 32px',

                    items: [
                        // Error panel (hidden until login fails)
                        {
                            xtype: 'component',
                            cls:   'ss-login-error',
                            bind: {
                                html:   '<i class="x-fa fa-exclamation-circle"></i> {errorMessage}',
                                hidden: '{!showError}'
                            }
                        },

                        // Username field
                        {
                            xtype:       'textfield',
                            label:       'Username',
                            placeholder: 'Enter your username',
                            required:    true,
                            clearable:   true,
                            bind:        '{ username }',
                            listeners: {
                                // Allow pressing Enter in username to jump to password
                                action: function (field) {
                                    var pwdField = field.up('formpanel').down('passwordfield');
                                    if (pwdField) { pwdField.focus(); }
                                }
                            }
                        },

                        // Password field
                        {
                            xtype:       'passwordfield',
                            label:       'Password',
                            placeholder: 'Enter your password',
                            required:    true,
                            bind:        '{ password }',
                            listeners: {
                                // Allow pressing Enter in password to submit
                                action: 'onLogin'
                            }
                        },

                        // Sign In button
                        {
                            xtype:   'button',
                            text:    'Sign In',
                            ui:      'action',
                            cls:     'ss-login-submit-btn',
                            handler: 'onLogin'
                        }
                    ]
                },

                // ── Quick-login pills (demo shortcuts) ─────────────────────
                {
                    xtype: 'container',
                    cls:   'ss-login-quick',
                    html:  '<p class="ss-login-quick-label">Quick access for demo:</p>',
                    items: [
                        {
                            xtype:   'button',
                            text:    '🛡 Login as Admin',
                            cls:     'ss-quick-pill ss-quick-admin',
                            ui:      'plain',
                            handler: 'onQuickAdmin'
                        },
                        {
                            xtype:   'button',
                            text:    '🛍 Login as John Smith (Customer)',
                            cls:     'ss-quick-pill ss-quick-customer',
                            ui:      'plain',
                            handler: 'onQuickCustomer'
                        }
                    ]
                },

                // ── Credential hint ────────────────────────────────────────
                {
                    xtype: 'component',
                    cls:   'ss-login-hint',
                    html: [
                        '<code>admin / admin123</code> &nbsp;|&nbsp;',
                        '<code>john / john123</code>'
                    ].join('')
                }
            ]
        }
    ]
});
