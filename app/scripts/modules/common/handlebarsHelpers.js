/**
 * Helper functions to be used in handlebars' templates
 */
define(['handlebars',
    'underscore',
    'jquery'
], function (Handlebars, _, $) {
    'use strict';

    /**
     * Checks whether the parameter is required and returns a string stating that it is required if that is the case
     */
    Handlebars.registerHelper('parameterRequired', function(key, required) {
        if(!_.isUndefined(required) && _.contains(required, key)) {
            return ' <span class="path-parameter-required">(required)</span>';
        }
        else {
            return '';
        }
    });

    /**
     * The interface id in the API docs needs to be changed because it has a "." that causes problems when referencing
     * the DOM element by id
     */
    Handlebars.registerHelper('formatInterfaceId', function(interfaceId) {
        return interfaceId.split('.').join('');
    });

});

