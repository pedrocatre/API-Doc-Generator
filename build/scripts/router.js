define(["jquery","underscore","backbone","modules/apiDocumentation/apiDocumentationPage/apiDocumentationPageView","bootstrap"],function(e,t,n,r){var i=n.Router.extend({routes:{"resource/:resourceId/operation/:interfaceId":"apiDocsPage","resource/:resourceId":"apiDocsPage","*actions":"apiDocsPage"},initialize:function(){var t=this;t.$bodyContent=e("#body-content")},_activateNavBtn:function(){var t=n.history.fragment;e(".navbar-nav li").removeClass("active"),e('.navbar-nav li a[href="#'+t+'"]').parent().addClass("active")},_tearDownLastPageResources:function(){this._tearDownView(this.apiDocumentationPageView)},_tearDownView:function(e){!t.isUndefined(this.view)&&!t.isNull(this.view)&&(this.view.remove(),this.view=null)},_prepareForNewPage:function(){this._tearDownLastPageResources(),this._activateNavBtn()},apiDocsPage:function(e,t){this._prepareForNewPage(),this.apiDocumentationPageView=new r({resourceId:e,interfaceId:t});var n=this.apiDocumentationPageView.render().el;this.$bodyContent.html(n),this.apiDocumentationPageView.scrollToBookmark()}}),s=function(){var e=new i;window.AppUtils.app=e,n.history.start()};return{initialize:s}});