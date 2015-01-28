/**
 * The interface collection
 */
define([
    'backbone',
    'underscore',
    'modules/apiDocumentation/resources/interfaces/interfaceModel'
], function (Backbone, _, InterfaceModel) {
    'use strict';

    return Backbone.Collection.extend({
        model: InterfaceModel
    });
});

