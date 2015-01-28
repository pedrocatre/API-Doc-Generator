/**
 * View responsible for rendering an API model
 */
define(['backbone',
    'underscore',
    'handlebars',
    'modules/common/masterView',
    'text!modules/apiDocumentation/apiModel/pathSchema.html',
    'text!modules/apiDocumentation/apiModel/querySchema.html',
    'text!modules/apiDocumentation/apiModel/bodySchemaResponse.html',
    'text!modules/apiDocumentation/apiModel/bodySchemaRequest.html',
    'modules/common/handlebarsHelpers'
], function (Backbone, _, Handlebars, MasterView, PathSchemaTemplate, QuerySchemaTemplate,
             BodySchemaResponseTemplate, BodySchemaRequestTemplate) {
    'use strict';

    return MasterView.extend({

        dom: {
            PROPERTIES_LIST: '.properties-list-js'
        },

        tagName: 'li',
        className: 'api-model-item',

        initialize: function (options) {
            this.apiModelType = options.apiModelType;

            // Based on the API model type render the corresponding template
            switch (this.apiModelType) {
                case 'pathSchema':
                    this.apiModelTemplate = Handlebars.compile(PathSchemaTemplate);
                    break;
                case 'querySchema':
                    this.apiModelTemplate = Handlebars.compile(QuerySchemaTemplate);
                    break;
                case 'bodySchema':
                    if(options.resourcePartType === 'request') {
                        this.apiModelTemplate = Handlebars.compile(BodySchemaRequestTemplate);
                    } else {
                        this.apiModelTemplate = Handlebars.compile(BodySchemaResponseTemplate);
                    }
                    break;
                default:
                    throw 'The model type ' + this.apiModelType + 'does not exist.';
            }

            MasterView.prototype.initialize.apply(this);
        },

        render: function () {
            this._removeSubViews();
            this.$el.html(this.apiModelTemplate(this.model.toJSON()));
            return this;
        },

        remove: function() {
            MasterView.prototype.remove.apply(this);
        }

    });
});



