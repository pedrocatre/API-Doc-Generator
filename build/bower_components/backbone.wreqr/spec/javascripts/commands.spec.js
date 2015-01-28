describe("commands",function(){describe("when executing a command",function(){var e,t;beforeEach(function(){e=new Wreqr.Commands,e.setHandler("do:it",function(){return"some value"}),t=e.execute("do:it")}),it("should not return any value",function(){expect(t).toBeUndefined()})}),describe("when executing a command with a parameter",function(){var e,t,n;beforeEach(function(){e=new Wreqr.Commands,e.setHandler("do:it",function(e){n=e}),t=e.execute("do:it","foo")}),it("should pass the param along",function(){expect(n).toBe("foo")})}),describe("when executing with multiple parameters",function(){var e,t,n,r;beforeEach(function(){e=new Wreqr.Commands,e.setHandler("do:it",function(e,t){n=e,r=t}),e.execute("do:it","foo","bar")}),it("should pass the param along",function(){expect(n).toBe("foo"),expect(r).toBe("bar")})})});