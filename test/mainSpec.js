/**
 * Require js configuration file
 */
require.config({
    baseUrl: '../app/scripts',

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


require(['backbone', 'underscore', 'modules/common/appUtils', 'backboneWreqr', '../../test/spec/allTests'],
    function(Backbone, _){
        // Make console.log not throw error if it is not supported by the browser
        if (typeof window.console === "undefined"){
            window.console={};
            window.console.log = function(){
                return;
            };
        }
        window.AppUtils.vent = _.extend({}, Backbone.Events);
        window.AppUtils.reqres = new Backbone.Wreqr.RequestResponse();

        if (typeof mochaPhantomJS !== "undefined") { mochaPhantomJS.run(); }
        else { mocha.run(); }
    });

