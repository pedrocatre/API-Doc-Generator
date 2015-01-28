/**
 * The resource model
 */
define(['backbone',
    'modules/apiDocumentation/resources/interfaces/interfaceCollection'
], function (Backbone, InterfaceCollection) {
    'use strict';

    return Backbone.Model.extend({

        initialize: function() {
            // Creates a collection for the resource model's interfaces
            this.interfaceCollection = new InterfaceCollection(this.get('interfaces'));
        }
    });
});
