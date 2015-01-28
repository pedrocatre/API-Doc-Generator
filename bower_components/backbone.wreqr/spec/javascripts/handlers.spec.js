describe("handlers",function(){describe("when adding a handler",function(){var e,t,n,r;beforeEach(function(){e=new Wreqr.Handlers,spyOn(e,"trigger"),r={},n=jasmine.createSpy("a setHandlered handler"),e.setHandler("foo",n,r),t=e.getHandler("foo"),t()}),it("should trigger a handler:add event",function(){expect(e.trigger).toHaveBeenCalledWith("handler:add","foo",n,r)})}),describe("when requesting a handler by name",function(){describe("and a handler has been setHandlered with that name",function(){var e,t,n;beforeEach(function(){var r=new Wreqr.Handlers;n={},t=jasmine.createSpy("a setHandlered handler"),r.setHandler("handler",t,n),e=r.getHandler("handler"),e()}),it("should return the setHandlered handler callback",function(){expect(t).toHaveBeenCalled()}),it("should return the setHandlered handler context",function(){expect(t.mostRecentCall.object).toBe(n)})}),describe("and a handler has not been setHandlered with that name",function(){var e;beforeEach(function(){e=new Wreqr.Handlers}),it("should thrown an error saying a handler was not found",function(){function t(){e.getHandler("not registered")}expect(t).toThrow("Handler not found for 'not registered'")})})}),describe("when removing a named handler",function(){var e,t,n;beforeEach(function(){e=new Wreqr.Handlers,n={},t=jasmine.createSpy("a setHandlered handler"),e.setHandler("handler",t,n),e.removeHandler("handler")}),it("should no longer return the requested hander",function(){function t(){e.getHandler("handler")}expect(t).toThrow("Handler not found for 'handler'")})}),describe("when removing all handlers",function(){var e,t,n;beforeEach(function(){e=new Wreqr.Handlers,n={},t=jasmine.createSpy("a setHandlered handler"),e.setHandler("handler1",t,n),e.setHandler("handler2",t,n),e.removeAllHandlers()}),it("should no longer return the requested handler",function(){function t(){e.getHandler("handler")}expect(t).toThrow("Handler not found for 'handler'")})})});