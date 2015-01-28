/**
 * View that lists the possible response errors
 */
define(['backbone',
    'underscore',
    'handlebars',
    'modules/common/baseView',
    'text!modules/apiDocumentation/resources/interfaces/response/error/errorList.html',
    'backbone'
], function (Backbone, _, Handlebars, BaseView, ErrorListTemplate) {
    'use strict';

    return BaseView.extend({

        dom: {
            ERROR_LIST: '.error-list-js'
        },

        initialize: function (params, options) {
            this.errorListTemplate = Handlebars.compile(ErrorListTemplate);
        },

        render: function () {
            this.$el.html(this.errorListTemplate(this.collection.toJSON()));
            return this;
        }
    });
});



