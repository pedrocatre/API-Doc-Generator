/**
 * The interface error collection
 */
define([
    'backbone',
    'underscore',
    'modules/apiDocumentation/resources/interfaces/response/error/errorModel'
], function (Backbone, _, ErrorModel) {
    'use strict';

    return Backbone.Collection.extend({
        model: ErrorModel
    });
});


