Wreqr.Handlers=function(e,t){var n=function(e){this.options=e,this._wreqrHandlers={},t.isFunction(this.initialize)&&this.initialize(e)};return n.extend=e.Model.extend,t.extend(n.prototype,e.Events,{setHandlers:function(e){t.each(e,function(e,n){var r=null;t.isObject(e)&&!t.isFunction(e)&&(r=e.context,e=e.callback),this.setHandler(n,e,r)},this)},setHandler:function(e,t,n){var r={callback:t,context:n};this._wreqrHandlers[e]=r,this.trigger("handler:add",e,t,n)},hasHandler:function(e){return!!this._wreqrHandlers[e]},getHandler:function(e){var t=this._wreqrHandlers[e];if(!t)throw new Error("Handler not found for '"+e+"'");return function(){var e=Array.prototype.slice.apply(arguments);return t.callback.apply(t.context,e)}},removeHandler:function(e){delete this._wreqrHandlers[e]},removeAllHandlers:function(){this._wreqrHandlers={}}}),n}(Backbone,_);