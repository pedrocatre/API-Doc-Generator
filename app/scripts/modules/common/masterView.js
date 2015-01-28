/**
 * MasterView is composed by subviews and offers common functionality to handle subviews.
 * A common use scenario is for a list view with item suviews
 */
define(['backbone',
    'underscore',
    'modules/common/baseView'
], function (Backbone, _, BaseView) {
    'use strict';

    return BaseView.extend({

        initialize: function () {
            this.subViews = [];
        },

        /**
         * Renders all the elements inside the collection property using the view in the ChildView property (that needs
         * to be assigned before calling render)
         * @returns {*}
         */
        render: function () {
            this._removeSubViews();
            var fragment = document.createDocumentFragment();
            this.collection.each( function(type){
                var childView = new this.ChildView({model:type});
                this.subViews.push(childView);
                fragment.appendChild(childView.render().el);
            }, this);
            this.$elementList.append(fragment);
            return this;
        },

        /**
         * Adds a single element that is appended to the end of the list
         * @param resource backbone model with the resource data
         * @returns {*}
         */
        addElement: function(resource) {
            var resourceView = new this.ChildView({model:resource});
            this.subViews.push(resourceView);
            this.$el.append(resourceView.render().el);
            return this;
        },

        /**
         * Calls remove on all child views and empties the subViews array property
         * @private
         */
        _removeSubViews:function() {
            _.each(this.subViews, function(subView) {
                subView.remove();
            }, this);
            this.subViews = [];
        },

        /**
         * Creates and renders a subview of the specified API docs model
         * @param fragment the fragment where the rendered view is appended
         * @param resourcePartSubType a string that represents the API model type
         * @param resourcePart the part of the resource from where the model reference is being extracted (can be the
         * request part or the response part of the resource
         * @param resourcePartType inside the resourcePart there are different properties and resourceParType identifies
         * the one that is being targeted
         * @private
         */
        _createAPIModelSubView: function(fragment, resourcePartSubType, resourcePart, resourcePartType) {
            if(!_.isUndefined(resourcePart) && !_.isUndefined(resourcePart[resourcePartSubType]) && !_.isUndefined(resourcePart[resourcePartSubType]['$ref'])) {
                var apiModelView = window.AppUtils.reqres.request('apiModelView',
                    { apiModelId: resourcePart[resourcePartSubType]['$ref'], apiModelType: resourcePartSubType, resourcePartType: resourcePartType });
                this.subViews.push(apiModelView);
                var renderedContent = apiModelView.render().el;
                fragment.appendChild(renderedContent);
            }
        },

        /**
         * Get the properties of a specified model of the API docs
         * @param resourcePartSubType a string that represents the API model type
         * @param resourcePart he part of the resource from where the model reference is being extracted (can be the
         * request part or the response part of the resource
         * @param resourcePartType inside the resourcePart there are different properties and resourceParType identifies
         * the one that is being targeted
         * @returns {*}
         * @private
         */
        _getAPIModelProperties: function(resourcePartSubType, resourcePart, resourcePartType) {
            if(!_.isUndefined(resourcePart) && !_.isUndefined(resourcePart[resourcePartSubType]) && !_.isUndefined(resourcePart[resourcePartSubType]['$ref'])) {
                return window.AppUtils.reqres.request('apiModelProperties', resourcePart[resourcePartSubType]['$ref']);
            }
            return null;
        },

        /**
         * Stop event listeners and remove all suviews.
         */
        remove:function() {
            this.stopListening();
            this._removeSubViews();
            this.subViews=null;
            BaseView.prototype.remove.apply(this);
        }
    });
});