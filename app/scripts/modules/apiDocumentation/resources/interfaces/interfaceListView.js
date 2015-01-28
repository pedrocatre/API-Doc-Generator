/**
 * View responsible for listing the interfaces
 */
define(['backbone',
    'underscore',
    'handlebars',
    'modules/common/masterView',
    'text!modules/apiDocumentation/resources/interfaces/interfaceList.html',
    'modules/apiDocumentation/resources/interfaces/interfaceItemView',
    'backbone'
], function (Backbone, _, Handlebars, MasterView, InterfaceListTemplate, InterfaceItemView) {
    'use strict';

    return MasterView.extend({

        dom: {
            INTERFACE_LIST: '.interface-list-js'
        },

        initialize: function (params, options) {
            this.interfaceListTemplate = Handlebars.compile(InterfaceListTemplate);
            MasterView.prototype.initialize.apply(this);
        },

        render: function () {
            this._removeSubViews();
            this.$el.html(this.interfaceListTemplate());
            this.$elementList = this.$el.find(this.dom.INTERFACE_LIST);

            // Create the new HTML in a fragment before adding it to the DOM
            var fragment = document.createDocumentFragment();
            this.collection.each( function(interfaceModel) {
                var interfaceItemView = new InterfaceItemView({model: interfaceModel});
                this.subViews.push(interfaceItemView);
                fragment.appendChild(interfaceItemView.render().el);
            }, this);

            if(this.collection.length > 0) {
                this.$elementList.html(fragment);
            }

            return this;
        },

        /**
         * Iterate over all child interface views and expand/show or collapse/hide them
         * @param show {Boolean} if true show the interfaces' details, otherwise hide them
         * @returns {*}
         */
        showInterfacesDetailsContainer: function(show) {
            _.each(this.subViews, function(subView) {
                if(typeof subView.showInterfaceDetailsContainer === 'function') {
                    subView.showInterfaceDetailsContainer(show);
                }
            }, this);
            return this;
        },

        remove: function() {
            MasterView.prototype.remove.apply(this);
        }

    });
});



