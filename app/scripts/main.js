/**
 * Require js configuration file
 */
require.config({
    paths: {
        // libs / bower components
        jquery:             '../bower_components/jquery/jquery',
        underscore:         '../bower_components/underscore/underscore',
        backbone:           '../bower_components/backbone/backbone',
        backboneWreqr:      '../bower_components/backbone.wreqr/lib/backbone.wreqr',
        handlebars:         '../bower_components/handlebars/handlebars',
        text:               '../bower_components/requirejs-text/text',
        bootstrap:          '../bower_components/bootstrap/dist/js/bootstrap.min',
        flexiJsonEditor:    '../vendor/FlexiJsonEditor-master/jquery.jsoneditor'
    },

    shim: {
        'backbone': {
            deps: ['underscore', 'jquery'],
            exports: 'Backbone'
        },
        'backboneWreqr': {
            deps: ['backbone', 'underscore']
        },
        'underscore': {
            exports: '_'
        },
        'jquery': {
            exports: ['jQuery', '$']
        },
        'flexiJsonEditor': {
            deps: ['jquery']
        },
        'handlebars': {
            exports: 'Handlebars'
        },
        'bootstrap': {
            deps: ['jquery']
        }
    }
});

/**
 * Responsible for starting the execution of the application
 */
require([
    'app',
    'modules/common/appUtils',
    'backbone',
    'underscore',
    'backboneWreqr'
],
    function (App, AppUtils, Backbone, _) {

        // Make console.log not throw error if it is not supported by the browser
        if (typeof window.console === "undefined"){
            window.console={};
            window.console.log = function(){
                return;
            };
        }
        window.AppUtils.vent = _.extend({}, Backbone.Events);
        window.AppUtils.reqres = new Backbone.Wreqr.RequestResponse();
        App.initialize();
    });