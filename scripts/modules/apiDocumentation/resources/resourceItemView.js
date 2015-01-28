define(["backbone","underscore","handlebars","modules/common/masterView","text!modules/apiDocumentation/resources/resourceItem.html","modules/apiDocumentation/resources/interfaces/interfaceListView","backbone"],function(e,t,n,r,i,s){return r.extend({dom:{INTERFACE_LIST:".interface-list-container-js"},tagName:"li",className:"resource-item",initialize:function(e,t){var s=this;this.resourceItemTemplate=n.compile(i),window.AppUtils.reqres.setHandler("display:resource:"+this.model.get("id"),function(){return s.$el.find(s.dom.INTERFACE_LIST).show().promise()}),r.prototype.initialize.apply(this)},events:{"click .resource-title-js":"toggleInterfaceListContainer","click .show-hide-resource-control-js":"toggleInterfaceListContainer","click .list-operations-resource-control-js":"listResourceOperations","click .expand-operations-resource-control-js":"expandResourceOperations"},render:function(){return this._removeSubViews(),this.$el.html(this.resourceItemTemplate(this.model.toJSON())),this.$elementList=this.$el.find(this.dom.INTERFACE_LIST),this.interfaceListView=new s({collection:this.model.interfaceCollection}),this.subViews.push(this.interfaceListView),this.$elementList.html(this.interfaceListView.render().el),this},listResourceOperations:function(e){return t.isUndefined(e)||e.preventDefault(),this.$el.find(this.dom.INTERFACE_LIST).slideDown(),this.interfaceListView.showInterfacesDetailsContainer(!1),this},toggleInterfaceListContainer:function(e){t.isUndefined(e)||e.preventDefault(),window.AppUtils.app.navigate("resource/"+this.model.get("id"),{trigger:!1,replace:!0}),this.$el.find(this.dom.INTERFACE_LIST).slideToggle()},expandResourceOperations:function(e){return t.isUndefined(e)||e.preventDefault(),this.$el.find(this.dom.INTERFACE_LIST).slideDown(),this.interfaceListView.showInterfacesDetailsContainer(!0),this},remove:function(){r.prototype.remove.apply(this)}})});