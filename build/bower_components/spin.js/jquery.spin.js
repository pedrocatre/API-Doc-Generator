/**
 * Copyright (c) 2011-2013 Felix Gnass
 * Licensed under the MIT license
 */

(function(e){if(typeof exports=="object")e(require("jquery"),require("spin"));else if(typeof define=="function"&&define.amd)define(["jquery","spin"],e);else{if(!window.Spinner)throw new Error("Spin.js not present");e(window.jQuery,window.Spinner)}})(function(e,t){e.fn.spin=function(n,r){return this.each(function(){var i=e(this),s=i.data();s.spinner&&(s.spinner.stop(),delete s.spinner),n!==!1&&(n=e.extend({color:r||i.css("color")},e.fn.spin.presets[n]||n),s.spinner=(new t(n)).spin(this))})},e.fn.spin.presets={tiny:{lines:8,length:2,width:2,radius:3},small:{lines:8,length:4,width:3,radius:5},large:{lines:10,length:8,width:4,radius:8}}});