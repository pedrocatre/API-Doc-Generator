/**
 * The resource collection
 */
define([
    'backbone',
    'underscore',
    'modules/apiDocumentation/resources/resourceModel'
], function (Backbone, _, ResourceModel) {
    'use strict';

    return Backbone.Collection.extend({
        model: ResourceModel
    });
});
