Wreqr.Commands=function(e){return e.Handlers.extend({storageType:e.CommandStorage,constructor:function(t){this.options=t||{},this._initializeStorage(this.options),this.on("handler:add",this._executeCommands,this);var n=Array.prototype.slice.call(arguments);e.Handlers.prototype.constructor.apply(this,n)},execute:function(e,t){e=arguments[0],t=Array.prototype.slice.call(arguments,1),this.hasHandler(e)?this.getHandler(e).apply(this,t):this.storage.addCommand(e,t)},_executeCommands:function(e,t,n){var r=this.storage.getCommands(e);_.each(r.instances,function(e){t.apply(n,e)}),this.storage.clearCommands(e)},_initializeStorage:function(e){var t,n=e.storageType||this.storageType;_.isFunction(n)?t=new n:t=n,this.storage=t}})}(Wreqr);