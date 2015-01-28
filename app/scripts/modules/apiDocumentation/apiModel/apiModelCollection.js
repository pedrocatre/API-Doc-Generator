/**
 * The collection for the API models
 */
define([
    'backbone',
    'underscore',
    'modules/apiDocumentation/apiModel/apiModelModel'
], function (Backbone, _, APIModelModel) {
    'use strict';

    return Backbone.Collection.extend({
        model: APIModelModel
    });
});

