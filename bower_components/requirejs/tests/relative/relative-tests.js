require({baseUrl:requirejs.isBrowser?"./":"./relative/",paths:{text:"../../../text/text"},packages:[{name:"greek",main:"main",lib:"."}]},["require","foo/bar/one","greek/alpha"],function(e,t,n){doh.register("relative",[function(r){r.is("one",t.name),r.is("bar",t.barName),r.is("two",t.twoName),r.is("three",t.threeName),r.is("hello world",t.message),r.is("alpha",n.name),r.is("greek",n.getGreekName())}]),doh.run()});