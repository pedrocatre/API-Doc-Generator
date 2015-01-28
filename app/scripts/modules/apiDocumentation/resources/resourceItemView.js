/**
 * View that represents a resource item
 */
define(['backbone',
    'underscore',
    'handlebars',
    'modules/common/masterView',
    'text!modules/apiDocumentation/resources/resourceItem.html',
    'modules/apiDocumentation/resources/interfaces/interfaceListView',
    'backbone'
], function (Backbone, _, Handlebars, MasterView, ResourceItemTemplate, InterfaceListView) {
    'use strict';

    return MasterView.extend({

        dom: {
            INTERFACE_LIST: '.interface-list-container-js'
        },

        tagName: 'li',
        className: 'resource-item',

        initialize: function (params, options) {
            var self = this;
            this.resourceItemTemplate = Handlebars.compile(ResourceItemTemplate);

            // Set handler for a request to display the resource
            window.AppUtils.reqres.setHandler('display:resource:' + this.model.get('id'), function(){
                // Show the resource and return a promise
                return self.$el.find(self.dom.INTERFACE_LIST).show().promise();
            });

            MasterView.prototype.initialize.apply(this);
        },

        events: {
            'click .resource-title-js': 'toggleInterfaceListContainer',
            'click .show-hide-resource-control-js': 'toggleInterfaceListContainer',
            'click .list-operations-resource-control-js': 'listResourceOperations',
            'click .expand-operations-resource-control-js': 'expandResourceOperations'
        },

        render: function () {
            this._removeSubViews();
            this.$el.html(this.resourceItemTemplate(this.model.toJSON()));
            this.$elementList = this.$el.find(this.dom.INTERFACE_LIST);

            // Create the view responsible for listing the resource's interfaces
            this.interfaceListView = new InterfaceListView({ collection: this.model.interfaceCollection });
            this.subViews.push(this.interfaceListView);
            this.$elementList.html(this.interfaceListView.render().el);

            return this;
        },

        /**
         * List the resources operations/interfaces. In other words it expands/shows the resource and collapses/hides
         * the details of its interfaces
         * @param e
         * @returns {*}
         */
        listResourceOperations: function(e) {
            if(!_.isUndefined(e)) { e.preventDefault(); }
            this.$el.find(this.dom.INTERFACE_LIST).slideDown();
            this.interfaceListView.showInterfacesDetailsContainer(false);
            return this;
        },

        /**
         * Toggles the visibility of the interface list container
         * @param e
         */
        toggleInterfaceListContainer: function(e) {
            if(!_.isUndefined(e)) { e.preventDefault(); }
            window.AppUtils.app.navigate('resource/' + this.model.get('id'), {trigger: false, replace: true});
            this.$el.find(this.dom.INTERFACE_LIST).slideToggle();
        },

        /**
         * Expands the resource's operations. In other words it expands/shows the resource and expands/shows the details
         * of the resource's interfaces
         * @param e
         * @returns {*}
         */
        expandResourceOperations: function(e) {
            if(!_.isUndefined(e)) { e.preventDefault(); }
            this.$el.find(this.dom.INTERFACE_LIST).slideDown();
            this.interfaceListView.showInterfacesDetailsContainer(true);
            return this;
        },

        remove: function() {
            MasterView.prototype.remove.apply(this);
        }

    });
});


