/**
 * View of a resource's request
 */
define(['backbone',
    'underscore',
    'handlebars',
    'modules/common/masterView',
    'text!modules/apiDocumentation/resources/interfaces/response/response.html',
    'modules/apiDocumentation/resources/interfaces/response/error/errorListView'
], function (Backbone, _, Handlebars, MasterView, ResponseTemplate, ErrorListView) {
    'use strict';

    return MasterView.extend({

        dom: {
            RESPONSE_LIST: '.response-list-js'
        },

        initialize: function (params, options) {
            this.responseTemplate = Handlebars.compile(ResponseTemplate);
            MasterView.prototype.initialize.apply(this);
        },

        render: function () {
            this._removeSubViews();
            this.$el.html(this.responseTemplate());
            this.$elementList = this.$el.find(this.dom.RESPONSE_LIST);
            var fragment = document.createDocumentFragment(),
                response = this.model.get('response');

            // Create API model subviews
            this._createAPIModelSubView(fragment, 'bodySchema', response, 'response');
            var bodySchemaProperties = this._getAPIModelProperties('bodySchema', response, 'response');
            var errorListView = new ErrorListView({ collection: this.model.interfaceErrorsCollection });
            fragment.appendChild(errorListView.render().el);
            this.subViews.push(errorListView);

            this.$elementList.append(fragment);

            // If this request has body schema properties activate the jsonEditor using them so they are displayed in a
            // nice way
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

