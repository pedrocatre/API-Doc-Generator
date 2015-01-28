/**
 * Model that represents the entire API documentation
 */
define(['backbone',
    'modules/apiDocumentation/apiModel/apiModelCollection',
    'modules/apiDocumentation/resources/resourceCollection'
], function (Backbone, APIModelCollection, ResourceCollection) {
    'use strict';

    return Backbone.Model.extend({

        url: '/apiDocumentation',

        initialize: function() {
            this.resourceCollection = new ResourceCollection(this.get('resources'));
        }
    });
});