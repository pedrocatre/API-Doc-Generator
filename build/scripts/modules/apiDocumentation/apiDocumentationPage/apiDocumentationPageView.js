define(["backbone","underscore","jquery","modules/common/masterView","handlebars","text!modules/apiDocumentation/apiDocumentationPage/apiDocumentationPageBody.html","text!modules/apiDocumentation/apiDocumentationPage/api-docs.json","modules/apiDocumentation/apiDocumentationPage/apiDocumentationModel","modules/apiDocumentation/resources/resourceListView","modules/apiDocumentation/apiModel/apiModelCollection","modules/apiDocumentation/apiModel/apiModelView","modules/apiDocumentation/apiModel/apiModelModel"],function(e,t,n,r,i,s,o,u,a,f,l,c){return r.extend({dom:{RESOURCES_CONTAINER:".resources-container-js"},initialize:function(e){var t=this;t.resourceId=e.resourceId,t.interfaceId=e.interfaceId,this.apiDocumentationPageBodyTemplate=i.compile(s),this.apiDocumentationModel=new u(JSON.parse(o)),window.AppUtils.reqres.setHandler("apiModelView",function(e){return t._createAPIModelView(e)}),window.AppUtils.reqres.setHandler("apiModelProperties",function(e){return t._getAPIModelProperties(e)}),r.prototype.initialize.apply(this)},_getAPIModelProperties:function(e){var n=this.apiDocumentationModel.get("models")[e];if(t.isUndefined(n))throw"The api model with id: "+e+"does not exist. Possible problem with the JSON source.";return t.isUndefined(n.properties)?null:n.properties},_createAPIModelView:function(e){var n=this.apiDocumentationModel.get("models")[e.apiModelId];if(t.isUndefined(n))throw"The api model with id: "+e.apiModelId+"does not exist. Possible problem with the JSON source.";var r=new l({model:new c(n),apiModelType:e.apiModelType,resourcePartType:e.resourcePartType});return r},render:function(){var e=this;return this._removeSubViews(),this.$el.html(this.apiDocumentationPageBodyTemplate(this.apiDocumentationModel.toJSON())),this.resourceListView=(new a({el:this.$el.find(this.dom.RESOURCES_CONTAINER),collection:this.apiDocumentationModel.resourceCollection})).render(),this.subViews.push(this.resourceListView),this.$el.find(".json-editor input").attr("disabled","disabled"),this},scrollToBookmark:function(){var e=this,r=this.resourceId,i,s;try{!t.isUndefined(this.resourceId)&&!t.isNull(this.resourceId)&&(window.AppUtils.reqres.request("display:resource:"+this.resourceId),!t.isUndefined(this.interfaceId)&&!t.isNull(this.interfaceId)&&(r=this.interfaceId.split(".").join(""),window.AppUtils.reqres.request("display:interface:"+this.interfaceId)),n.when(i,s).done(function(){var e=n("#"+r);n("html,body").animate({scrollTop:e.offset().top},"fast")}))}catch(o){console.log("one of the resources does not exist "+o)}return this},remove:function(){r.prototype.remove.apply(this)}})});