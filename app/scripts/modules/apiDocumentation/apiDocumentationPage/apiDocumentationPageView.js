/**
 * View responsible for rendering the api documentation page
 */
define(['backbone',
    'underscore',
    'jquery',
    'modules/common/masterView',
    'handlebars',
    'text!modules/apiDocumentation/apiDocumentationPage/apiDocumentationPageBody.html',
    'text!modules/apiDocumentation/apiDocumentationPage/api-docs.json',
    'modules/apiDocumentation/apiDocumentationPage/apiDocumentationModel',
    'modules/apiDocumentation/resources/resourceListView',
    'modules/apiDocumentation/apiModel/apiModelCollection',
    'modules/apiDocumentation/apiModel/apiModelView',
    'modules/apiDocumentation/apiModel/apiModelModel'
], function (Backbone, _, $, MasterView, Handlebars, APIDocumentationPageBodyTemplate, APIDocs, APIDocumentationModel,
             ResourceListView, APIModelCollection, APIModelView, APIModelModel) {
    'use strict';

    return MasterView.extend({

        dom: {
            RESOURCES_CONTAINER: '.resources-container-js'
        },

        initialize: function (options) {
            var self = this;

            self.resourceId = options.resourceId;
            self.interfaceId = options.interfaceId;

            this.apiDocumentationPageBodyTemplate = Handlebars.compile(APIDocumentationPageBodyTemplate);

            // Insert the API docs JSON representation into a model
            this.apiDocumentationModel = new APIDocumentationModel(JSON.parse(APIDocs));

            // Set a handler to create and return a specific API model view
            window.AppUtils.reqres.setHandler('apiModelView', function(options){
                return self._createAPIModelView(options);
            });

            // Set a handler to return the properties of a specific API model
            window.AppUtils.reqres.setHandler('apiModelProperties', function(apiModelId){
                return self._getAPIModelProperties(apiModelId);
            });

            MasterView.prototype.initialize.apply(this);
        },

        /**
         * Return the properties of a specific API model
         * @param apiModelId the id of the API model that is being returned
         * @returns {*}
         * @private
         */
        _getAPIModelProperties: function(apiModelId) {
            var apiModel = this.apiDocumentationModel.get('models')[apiModelId];
            if(_.isUndefined(apiModel)) {
                throw 'The api model with id: ' + apiModelId + 'does not exist. Possible problem with the JSON source.';
            } else {
                if(_.isUndefined(apiModel.properties)) { return null; }
                else { return apiModel.properties; }
            }
        },

        /**
         * Retrieve an API model and return a view that has this model as a parameter
         * @param options an object with the apiModelId and the apiModelType
         * @returns {apiModelView}
         * @private
         */
        _createAPIModelView: function(options) {
            var apiModel = this.apiDocumentationModel.get('models')[options.apiModelId];
            if(_.isUndefined(apiModel)) {
                throw 'The api model with id: ' + options.apiModelId + 'does not exist. Possible problem with the JSON source.';
            } else {
                var apiModelView = new APIModelView({ model: new APIModelModel(apiModel),
                    apiModelType: options.apiModelType, resourcePartType: options.resourcePartType });
                return apiModelView;
            }
        },

        render: function() {
            var self = this;
            this._removeSubViews();
            this.$el.html(this.apiDocumentationPageBodyTemplate(this.apiDocumentationModel.toJSON()));

            // Instantiate and render the subviews
            this.resourceListView = new ResourceListView({
                el: this.$el.find(this.dom.RESOURCES_CONTAINER),
                collection: this.apiDocumentationModel.resourceCollection
            }).render();

            // Add references of the views to the subviews array
            this.subViews.push(this.resourceListView);

            // Stop json editor plugin from letting the user edit content
            this.$el.find('.json-editor input').attr('disabled', 'disabled');

            return this;
        },


        /**
         * Display the resource , if the resourceId was present in the URL, and the interface, if it is specified, and
         * scroll to the position that was "bookmarked" by the URL
         * @returns {*}
         */
        scrollToBookmark: function() {
            var self=this,
                anchorToGoTo = this.resourceId,
                displayResourcePromise,
                displayInterfacePromise;
            try {
                if(!_.isUndefined(this.resourceId) && !_.isNull(this.resourceId)){

                    // Request that a specific resource is displayed
                    window.AppUtils.reqres.request('display:resource:'+this.resourceId);

                    if(!_.isUndefined(this.interfaceId) && !_.isNull(this.interfaceId)){
                        // If an interfaceId is present in the URL update the anchor tag to scroll to
                        // The interface id needs to be changed because it has a "."
                        // that causes problems when referencing the DOM element
                        anchorToGoTo = this.interfaceId.split('.').join('');

                        // Request that a specific interface is displayed
                        window.AppUtils.reqres.request('display:interface:'+this.interfaceId);
                    }

                    // Either the resource the interface or both are displayed scroll to that most specific anchor tag
                    // (interfaceId if it was specified or resourceId otherwise)
                    $.when(displayResourcePromise, displayInterfacePromise).done(function(){
                        var aTag = $('#'+anchorToGoTo);
                        $('html,body').animate({scrollTop: aTag.offset().top},'fast');
                    });
                }
            } catch (err) {
                console.log('one of the resources does not exist ' + err);
            }
            return this;

        },

        remove: function() {
            MasterView.prototype.remove.apply(this);
        }

    });
});