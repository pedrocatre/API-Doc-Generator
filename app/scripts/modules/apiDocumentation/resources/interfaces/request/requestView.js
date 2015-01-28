/**
 * View responsible for presenting the request
 */
define(['backbone',
    'underscore',
    'handlebars',
    'modules/common/masterView',
    'text!modules/apiDocumentation/resources/interfaces/request/request.html',
    'flexiJsonEditor'
], function (Backbone, _, Handlebars, MasterView, RequestTemplate) {
    'use strict';

    return MasterView.extend({

        dom: {
            REQUEST_LIST: '.request-list-js',
            REQUEST_BODY_SCHEMA: '.request-body-schema-js'
        },

        initialize: function (params, options) {
            this.requestTemplate = Handlebars.compile(RequestTemplate);

            MasterView.prototype.initialize.apply(this);
        },

        render: function () {
            this._removeSubViews();
            this.$el.html(this.requestTemplate());
            this.$elementList = this.$el.find(this.dom.REQUEST_LIST);
            var fragment = document.createDocumentFragment(),
                request = this.model.get('request');

            // Create API doc model sub views for bodySchema, pathSchema and querySchema
            this._createAPIModelSubView(fragment, 'bodySchema', request, 'request');
            this._createAPIModelSubView(fragment, 'pathSchema', request,  'request');
            this._createAPIModelSubView(fragment, 'querySchema', request,  'request');

            var bodySchemaProperties = this._getAPIModelProperties('bodySchema', request, 'request');

            this.$elementList.append(fragment);

            // If there are bodySchema properties render them using the jsonEditor plugin so that they are displayed in
            // a nice way
            if(!_.isNull(bodySchemaProperties)) {
                this.$elementList.find('.json-editor').jsonEditor(bodySchemaProperties);
            }

            return this;
        },

        remove: function() {
            MasterView.prototype.remove.apply(this);
        }

    });
});
