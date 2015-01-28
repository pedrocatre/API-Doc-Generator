/**
 * View for an interface item
 */
define(['backbone',
    'underscore',
    'handlebars',
    'modules/common/masterView',
    'text!modules/apiDocumentation/resources/interfaces/interfaceItem.html',
    'modules/apiDocumentation/resources/interfaces/request/requestView',
    'modules/apiDocumentation/resources/interfaces/response/responseView',
    'backbone'
], function (Backbone, _, Handlebars, MasterView, InterfaceItemTemplate, RequestView, ResponseView) {
    'use strict';

    return MasterView.extend({

        dom: {
            INTERFACE_DETAILS_CONTAINER: '.interface-details-container-js'
        },

        tagName: 'li',
        className: 'interface-element',


        initialize: function (params, options) {
            var self = this;
            this.interfaceItemTemplate = Handlebars.compile(InterfaceItemTemplate);

            // Set handler for a request to display/show this interface
            window.AppUtils.reqres.setHandler('display:interface:' +this.model.get('id'), function(){
                return self.$el.find(self.dom.INTERFACE_DETAILS_CONTAINER).show().promise();
            });
            MasterView.prototype.initialize.apply(this);
        },

        events: {
            'click .interface-method-header-js': 'toggleInterfaceDetailsContainer'

        },

        render: function () {
            this.$el.addClass('interface-element-' + this.model.get('method'));
            this._removeSubViews();
            this.$el.html(this.interfaceItemTemplate(this.model.toJSON()));
            this.$elementList = this.$el.find(this.dom.INTERFACE_DETAILS_CONTAINER);
            var fragment = document.createDocumentFragment();

            // Create and render the request view and add it to the document fragment
            var requestView = new RequestView({ model: this.model });
            fragment.appendChild(requestView.render().el);

            // Create and render the response view and add it to the document fragment
            var responseView = new ResponseView({ model: this.model });
            fragment.appendChild(responseView.render().el);

            this.subViews.push(requestView, responseView);
            this.$elementList.html(fragment);

            return this;
        },

        /**
         * Toggle the visibility of the interface details and change the URL to "bookmark" the app state
         * @param e
         */
        toggleInterfaceDetailsContainer: function(e) {
            e.preventDefault();
            var interfaceId = this.model.get('id'),
                parentResourceId = interfaceId.split('.')[0],
                path = 'resource/' + parentResourceId + '/operation/' + interfaceId;

            window.AppUtils.app.navigate(path , {trigger: false, replace: true});
            this.$el.find(this.dom.INTERFACE_DETAILS_CONTAINER).slideToggle();
        },

        /**
         * Show or hide the interface's details
         * @param show {Boolean} if true display the interface's details, otherwise hide them
         * @returns {*}
         */
        showInterfaceDetailsContainer: function(show) {
            if(show) { this.$el.find(this.dom.INTERFACE_DETAILS_CONTAINER).slideDown(); }
            else {this.$el.find(this.dom.INTERFACE_DETAILS_CONTAINER).slideUp();}
            return this;
        },

        remove: function() {
            MasterView.prototype.remove.apply(this);
        }

    });
});


