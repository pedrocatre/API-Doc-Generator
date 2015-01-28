/**
 * View responsible for listing the resources
 */
define(['backbone',
    'underscore',
    'handlebars',
    'modules/common/masterView',
    'text!modules/apiDocumentation/resources/resourceList.html',
    'modules/apiDocumentation/resources/resourceItemView',
    'backbone'
], function (Backbone, _, Handlebars, MasterView, ResourceListHTML, ResourceItemView) {
    'use strict';

    return MasterView.extend({

        dom: {
            RESOURCE_LIST: '.resource-list-js'
        },

        initialize: function (params, options) {
            this.resourceListHTML = ResourceListHTML;
            MasterView.prototype.initialize.apply(this);
        },

        render: function () {
            this._removeSubViews();
            this.$el.html(this.resourceListHTML);
            this.$elementList = this.$el.find(this.dom.RESOURCE_LIST);

            // Create the new HTML in a fragment before adding it to the DOM
            var fragment = document.createDocumentFragment();
            this.collection.each( function(resourceModel) {
                var resourceItemView = new ResourceItemView({model: resourceModel});
                this.subViews.push(resourceItemView);
                fragment.appendChild(resourceItemView.render().el);
            }, this);

            if(this.collection.length > 0) {
                this.$elementList.html(fragment);
            }

            return this;
        },

        remove: function() {
            MasterView.prototype.remove.apply(this);
        }

    });
});


