/**
 * This module creates an object for the application's global variables.
 * It is helpful because it avoids too much pollution of the global namespace preventing possible conflicts for example:
 * with project libs and browser extensions.
 */
define([], function () {
    'use strict';

    window.AppUtils = window.AppUtils || {};
    return window.AppUtils;
});