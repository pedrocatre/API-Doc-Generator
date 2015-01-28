/**
 * The interface model
 */
define(['backbone',
    'modules/apiDocumentation/resources/interfaces/response/error/errorCollection'
], function (Backbone, ErrorCollection) {
    'use strict';

    return Backbone.Model.extend({
        initialize: function() {
            // Create a collection of the interface's possible errors on the response
            this.interfaceErrorsCollection = new ErrorCollection(this.get('response').errors);
        }
    });
});
