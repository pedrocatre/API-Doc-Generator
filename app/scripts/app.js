/**
 * Start the router
 */
define([
    'jquery',
    'underscore',
    'backbone',
    'router'
], function($, _, Backbone, Router){
    'use strict';

    var initialize = function(){
        Router.initialize();
    };

    return {
        initialize: initialize
    };
});