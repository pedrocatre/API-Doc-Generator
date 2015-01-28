/**
 * Application's router
 */
define([
    'jquery',
    'underscore',
    'backbone',
    'modules/apiDocumentation/apiDocumentationPage/apiDocumentationPageView',
    'bootstrap'
], function ($, _, Backbone, APIDocumentationPageView) {
    'use strict';

    var AppRouter = Backbone.Router.extend({
        routes: {
            'resource/:resourceId/operation/:interfaceId': 'apiDocsPage',
            'resource/:resourceId': 'apiDocsPage',
			'*actions': 'apiDocsPage'
        },

        initialize: function() {
            var self = this;
            self.$bodyContent = $('#body-content');
        },

        /**
         * Activates a specific navigation bar button based on the current fragment in backbone's history
         * @private
         */
        _activateNavBtn: function () {
            var backboneHistoryFragment = Backbone.history.fragment;
            $('.navbar-nav li').removeClass('active');
            $('.navbar-nav li a[href="#' + backboneHistoryFragment + '"]')
                .parent().addClass('active');
        },

        /**
         * Remove last page resources
         * @private
         */
        _tearDownLastPageResources: function () {
            this._tearDownView(this.apiDocumentationPageView);
        },

        /**
         * Remove a specific view
         * @param view
         * @private
         */
        _tearDownView: function(view) {
            if(!_.isUndefined(this.view) && !_.isNull(this.view)) {
                this.view.remove();
                this.view = null;
            }
        },

        /**
         * Prepare for a new page by tearing down the last page's resources and activating the new navigation bar menu
         * @private
         */
        _prepareForNewPage: function () {
            this._tearDownLastPageResources();
            this._activateNavBtn();
        },

        /**
         * Created and render the API documentation page and insert it in the DOM
         * @param resourceId id of the resource that is being accessed by the URL
         * @param interfaceId id of the interface that is being accessed by the URL
         */
        apiDocsPage: function(resourceId, interfaceId) {
            this._prepareForNewPage();
            this.apiDocumentationPageView = new APIDocumentationPageView({
                resourceId: resourceId,
                interfaceId: interfaceId
            });
            var renderedContent = this.apiDocumentationPageView.render().el;
            this.$bodyContent.html(renderedContent);
            this.apiDocumentationPageView.scrollToBookmark();
        }

    });

    var initialize = function () {
        var app = new AppRouter();
        window.AppUtils.app = app;
        Backbone.history.start();
    };

    return {
        initialize: initialize
    };
});