$(document).ready(function(){module("Collections"),test("each",function(){_.each([1,2,3],function(e,t){equal(e,t+1,"each iterators provide value and iteration count")});var e=[];_.each([1,2,3],function(t){e.push(t*this.multiplier)},{multiplier:5}),equal(e.join(", "),"5, 10, 15","context object property accessed"),e=[],_.forEach([1,2,3],function(t){e.push(t)}),equal(e.join(", "),"1, 2, 3",'aliased as "forEach"'),e=[];var t={one:1,two:2,three:3};t.constructor.prototype.four=4,_.each(t,function(t,n){e.push(n)}),equal(e.join(", "),"one, two, three","iterating over objects works, and ignores the object prototype."),delete t.constructor.prototype.four;var n=null;_.each([1,2,3],function(e,t,r){_.include(r,e)&&(n=!0)}),ok(n,"can reference the original collection from inside the iterator"),e=0,_.each(null,function(){++e}),equal(e,0,"handles a null properly")}),test("map",function(){var e=_.map([1,2,3],function(e){return e*2});equal(e.join(", "),"2, 4, 6","doubled numbers"),e=_.collect([1,2,3],function(e){return e*2}),equal(e.join(", "),"2, 4, 6",'aliased as "collect"');var t=_.map([1,2,3],function(e){return e*this.multiplier},{multiplier:3});equal(t.join(", "),"3, 6, 9","tripled numbers with context");var e=_([1,2,3]).map(function(e){return e*2});equal(e.join(", "),"2, 4, 6","OO-style doubled numbers");if(document.querySelectorAll){var n=_.map(document.querySelectorAll("#map-test *"),function(e){return e.id});deepEqual(n,["id1","id2"],"Can use collection methods on NodeLists.")}var n=_.map($("#map-test").children(),function(e){return e.id});deepEqual(n,["id1","id2"],"Can use collection methods on jQuery Array-likes.");var n=_.map(document.images,function(e){return e.id});ok(n[0]=="chart_image","can use collection methods on HTMLCollections");var r=_.map(null,function(){});ok(_.isArray(r)&&r.length===0,"handles a null properly")}),test("reduce",function(){var e=_.reduce([1,2,3],function(e,t){return e+t},0);equal(e,6,"can sum up an array");var t={multiplier:3};e=_.reduce([1,2,3],function(e,t){return e+t*this.multiplier},0,t),equal(e,18,"can reduce with a context object"),e=_.inject([1,2,3],function(e,t){return e+t},0),equal(e,6,'aliased as "inject"'),e=_([1,2,3]).reduce(function(e,t){return e+t},0),equal(e,6,"OO-style reduce");var e=_.reduce([1,2,3],function(e,t){return e+t});equal(e,6,"default initial value");var n=_.reduce([1,2,3,4],function(e,t){return e*t});equal(n,24,"can reduce via multiplication");var r;try{_.reduce(null,function(){})}catch(i){r=i}ok(r instanceof TypeError,"handles a null (without initial value) properly"),ok(_.reduce(null,function(){},138)===138,"handles a null (with initial value) properly"),equal(_.reduce([],function(){},undefined),undefined,"undefined can be passed as a special case"),raises(function(){_.reduce([],function(){})},TypeError,"throws an error for empty arrays with no initial value")}),test("reduceRight",function(){var e=_.reduceRight(["foo","bar","baz"],function(e,t){return e+t},"");equal(e,"bazbarfoo","can perform right folds");var e=_.foldr(["foo","bar","baz"],function(e,t){return e+t},"");equal(e,"bazbarfoo",'aliased as "foldr"');var e=_.foldr(["foo","bar","baz"],function(e,t){return e+t});equal(e,"bazbarfoo","default initial value");var t;try{_.reduceRight(null,function(){})}catch(n){t=n}ok(t instanceof TypeError,"handles a null (without initial value) properly");var r=_.reduceRight({a:1,b:2,c:3},function(e,t){return e+t});equal(r,6,"default initial value on object"),ok(_.reduceRight(null,function(){},138)===138,"handles a null (with initial value) properly"),equal(_.reduceRight([],function(){},undefined),undefined,"undefined can be passed as a special case"),raises(function(){_.reduceRight([],function(){})},TypeError,"throws an error for empty arrays with no initial value");var i,s={},o={a:1,b:2},u=_.keys(o).pop(),a=u=="a"?[s,1,"a",o]:[s,2,"b",o];_.reduceRight(o,function(){i||(i=_.toArray(arguments))},s),deepEqual(i,a),o={2:"a",1:"b"},u=_.keys(o).pop(),i=null,a=u=="2"?[s,"a","2",o]:[s,"b","1",o],_.reduceRight(o,function(){i||(i=_.toArray(arguments))},s),deepEqual(i,a)}),test("find",function(){var e=[1,2,3,4];strictEqual(_.find(e,function(e){return e>2}),3,"should return first found `value`"),strictEqual(_.find(e,function(){return!1}),void 0,"should return `undefined` if `value` is not found")}),test("detect",function(){var e=_.detect([1,2,3],function(e){return e*2==4});equal(e,2,'found the first "2" and broke the loop')}),test("select",function(){var e=_.select([1,2,3,4,5,6],function(e){return e%2==0});equal(e.join(", "),"2, 4, 6","selected each even number"),e=_.filter([1,2,3,4,5,6],function(e){return e%2==0}),equal(e.join(", "),"2, 4, 6",'aliased as "filter"')}),test("reject",function(){var e=_.reject([1,2,3,4,5,6],function(e){return e%2==0});equal(e.join(", "),"1, 3, 5","rejected each even number");var t="obj",n=_.reject([1,2,3,4,5,6],function(e){return equal(t,"obj"),e%2!=0},t);equal(n.join(", "),"2, 4, 6","rejected each odd number")}),test("all",function(){ok(_.all([],_.identity),"the empty set"),ok(_.all([!0,!0,!0],_.identity),"all true values"),ok(!_.all([!0,!1,!0],_.identity),"one false value"),ok(_.all([0,10,28],function(e){return e%2==0}),"even numbers"),ok(!_.all([0,11,28],function(e){return e%2==0}),"an odd number"),ok(_.all([1],_.identity)===!0,"cast to boolean - true"),ok(_.all([0],_.identity)===!1,"cast to boolean - false"),ok(_.every([!0,!0,!0],_.identity),'aliased as "every"'),ok(!_.all([undefined,undefined,undefined],_.identity),"works with arrays of undefined")}),test("any",function(){var e=Array.prototype.some;Array.prototype.some=null,ok(!_.any([]),"the empty set"),ok(!_.any([!1,!1,!1]),"all false values"),ok(_.any([!1,!1,!0]),"one true value"),ok(_.any([null,0,"yes",!1]),"a string"),ok(!_.any([null,0,"",!1]),"falsy values"),ok(!_.any([1,11,29],function(e){return e%2==0}),"all odd numbers"),ok(_.any([1,10,29],function(e){return e%2==0}),"an even number"),ok(_.any([1],_.identity)===!0,"cast to boolean - true"),ok(_.any([0],_.identity)===!1,"cast to boolean - false"),ok(_.some([!1,!1,!0]),'aliased as "some"'),Array.prototype.some=e}),test("include",function(){ok(_.include([1,2,3],2),"two is in the array"),ok(!_.include([1,3,9],2),"two is not in the array"),ok(_.contains({moe:1,larry:3,curly:9},3)===!0,"_.include on objects checks their values"),ok(_([1,2,3]).include(2),"OO-style include")}),test("invoke",function(){var e=[[5,1,7],[3,2,1]],t=_.invoke(e,"sort");equal(t[0].join(", "),"1, 5, 7","first array sorted"),equal(t[1].join(", "),"1, 2, 3","second array sorted")}),test("invoke w/ function reference",function(){var e=[[5,1,7],[3,2,1]],t=_.invoke(e,Array.prototype.sort);equal(t[0].join(", "),"1, 5, 7","first array sorted"),equal(t[1].join(", "),"1, 2, 3","second array sorted")}),test("invoke when strings have a call method",function(){String.prototype.call=function(){return 42};var e=[[5,1,7],[3,2,1]],t="foo";equal(t.call(),42,"call function exists");var n=_.invoke(e,"sort");equal(n[0].join(", "),"1, 5, 7","first array sorted"),equal(n[1].join(", "),"1, 2, 3","second array sorted"),delete String.prototype.call,equal(t.call,undefined,"call function removed")}),test("pluck",function(){var e=[{name:"moe",age:30},{name:"curly",age:50}];equal(_.pluck(e,"name").join(", "),"moe, curly","pulls names out of objects")}),test("where",function(){var e=[{a:1,b:2},{a:2,b:2},{a:1,b:3},{a:1,b:4}],t=_.where(e,{a:1});equal(t.length,3),equal(t[t.length-1].b,4),t=_.where(e,{b:2}),equal(t.length,2),equal(t[0].a,1),t=_.where(e,{a:1},!0),equal(t.b,2,"Only get the first object matched."),t=_.where(e,{a:1},!1),equal(t.length,3)}),test("findWhere",function(){var e=[{a:1,b:2},{a:2,b:2},{a:1,b:3},{a:1,b:4},{a:2,b:4}],t=_.findWhere(e,{a:1});deepEqual(t,{a:1,b:2}),t=_.findWhere(e,{b:4}),deepEqual(t,{a:1,b:4}),t=_.findWhere(e,{c:1}),ok(_.isUndefined(t),"undefined when not found"),t=_.findWhere([],{c:1}),ok(_.isUndefined(t),"undefined when searching empty list")}),test("max",function(){equal(3,_.max([1,2,3]),"can perform a regular Math.max");var e=_.max([1,2,3],function(e){return-e});equal(e,1,"can perform a computation-based max"),equal(-Infinity,_.max({}),"Maximum value of an empty object"),equal(-Infinity,_.max([]),"Maximum value of an empty array"),equal(_.max({a:"a"}),-Infinity,"Maximum value of a non-numeric collection"),equal(299999,_.max(_.range(1,3e5)),"Maximum value of a too-big array")}),test("min",function(){equal(1,_.min([1,2,3]),"can perform a regular Math.min");var e=_.min([1,2,3],function(e){return-e});equal(e,3,"can perform a computation-based min"),equal(Infinity,_.min({}),"Minimum value of an empty object"),equal(Infinity,_.min([]),"Minimum value of an empty array"),equal(_.min({a:"a"}),Infinity,"Minimum value of a non-numeric collection");var t=new Date(9999999999),n=new Date(0);equal(_.min([t,n]),n),equal(1,_.min(_.range(1,3e5)),"Minimum value of a too-big array")}),test("sortBy",function(){function r(e,t){this.x=e,this.y=t}var e=[{name:"curly",age:50},{name:"moe",age:30}];e=_.sortBy(e,function(e){return e.age}),equal(_.pluck(e,"name").join(", "),"moe, curly","stooges sorted by age");var t=[undefined,4,1,undefined,3,2];equal(_.sortBy(t,_.identity).join(","),"1,2,3,4,,","sortBy with undefined values");var t=["one","two","three","four","five"],n=_.sortBy(t,"length");equal(n.join(" "),"one two four five three","sorted by length");var i=[new r(1,1),new r(1,2),new r(1,3),new r(1,4),new r(1,5),new r(1,6),new r(2,1),new r(2,2),new r(2,3),new r(2,4),new r(2,5),new r(2,6),new r(undefined,1),new r(undefined,2),new r(undefined,3),new r(undefined,4),new r(undefined,5),new r(undefined,6)],s=_.sortBy(i,function(e){return e.x});deepEqual(s,i,"sortBy should be stable")}),test("groupBy",function(){var e=_.groupBy([1,2,3,4,5,6],function(e){return e%2});ok("0"in e&&"1"in e,"created a group for each value"),equal(e[0].join(", "),"2, 4, 6","put each even number in the right group");var t=["one","two","three","four","five","six","seven","eight","nine","ten"],n=_.groupBy(t,"length");equal(n[3].join(" "),"one two six ten"),equal(n[4].join(" "),"four five nine"),equal(n[5].join(" "),"three seven eight");var r={};_.groupBy([{}],function(){ok(this===r)},r),n=_.groupBy([4.2,6.1,6.4],function(e){return Math.floor(e)>4?"hasOwnProperty":"constructor"}),equal(n.constructor.length,1),equal(n.hasOwnProperty.length,2);var i=[{}];_.groupBy(i,function(e,t,n){ok(n===i)});var i=[1,2,1,2,3],n=_.groupBy(i);equal(n[1].length,2),equal(n[3].length,1);var s=[[1,2],[1,3],[2,3]];deepEqual(_.groupBy(s,0),{1:[[1,2],[1,3]],2:[[2,3]]}),deepEqual(_.groupBy(s,1),{2:[[1,2]],3:[[1,3],[2,3]]})}),test("indexBy",function(){var e=_.indexBy([1,2,3,4,5],function(e){return e%2==0});equal(e["true"],4),equal(e["false"],5);var t=["one","two","three","four","five","six","seven","eight","nine","ten"],n=_.indexBy(t,"length");equal(n[3],"ten"),equal(n[4],"nine"),equal(n[5],"eight");var r=[1,2,1,2,3],n=_.indexBy(r);equal(n[1],1),equal(n[2],2),equal(n[3],3)}),test("countBy",function(){var e=_.countBy([1,2,3,4,5],function(e){return e%2==0});equal(e["true"],2),equal(e["false"],3);var t=["one","two","three","four","five","six","seven","eight","nine","ten"],n=_.countBy(t,"length");equal(n[3],4),equal(n[4],3),equal(n[5],3);var r={};_.countBy([{}],function(){ok(this===r)},r),n=_.countBy([4.2,6.1,6.4],function(e){return Math.floor(e)>4?"hasOwnProperty":"constructor"}),equal(n.constructor,1),equal(n.hasOwnProperty,2);var i=[{}];_.countBy(i,function(e,t,n){ok(n===i)});var i=[1,2,1,2,3],n=_.countBy(i);equal(n[1],2),equal(n[3],1)}),test("sortedIndex",function(){var e=[10,20,30,40,50],t=35,n=_.sortedIndex(e,t);equal(n,3,"35 should be inserted at index 3");var r=_.sortedIndex(e,30);equal(r,2,"30 should be inserted at index 2");var i=[{x:10},{x:20},{x:30},{x:40}],s=function(e){return e.x};strictEqual(_.sortedIndex(i,{x:25},s),2),strictEqual(_.sortedIndex(i,{x:35},"x"),3);var o={1:2,2:3,3:4};s=function(e){return this[e]},strictEqual(_.sortedIndex([1,3],2,s,o),1)}),test("shuffle",function(){var e=_.range(10),t=_.shuffle(e).sort();notStrictEqual(e,t,"original object is unmodified"),equal(t.join(","),e.join(","),"contains the same members before and after shuffle")}),test("sample",function(){var e=_.range(10),t=_.sample(e,10).sort();equal(t.join(","),e.join(","),"contains the same members before and after sample"),t=_.sample(e,20).sort(),equal(t.join(","),e.join(","),"also works when sampling more objects than are present"),ok(_.contains(e,_.sample(e)),"sampling a single element returns something from the array"),strictEqual(_.sample([]),undefined,"sampling empty array with no number returns undefined"),notStrictEqual(_.sample([],5),[],"sampling empty array with a number returns an empty array"),notStrictEqual(_.sample([1,2,3],0),[],"sampling an array with 0 picks returns an empty array"),deepEqual(_.sample([1,2],-1),[],"sampling a negative number of picks returns an empty array")}),test("toArray",function(){ok(!_.isArray(arguments),"arguments object is not an array"),ok(_.isArray(_.toArray(arguments)),"arguments object converted into array");var e=[1,2,3];ok(_.toArray(e)!==e,"array is cloned"),equal(_.toArray(e).join(", "),"1, 2, 3","cloned array contains same elements");var t=_.toArray({one:1,two:2,three:3});equal(t.join(", "),"1, 2, 3","object flattened into array");try{var n=_.toArray(document.childNodes)}catch(r){}ok(_.isArray(n),"should not throw converting a node list")}),test("size",function(){equal(_.size({one:1,two:2,three:3}),3,"can compute the size of an object"),equal(_.size([1,2,3]),3,"can compute the size of an array"),equal(_.size($("<div>").add("<span>").add("<span>")),3,"can compute the size of jQuery objects");var e=function(){return _.size(arguments)};equal(e(1,2,3,4),4,"can test the size of the arguments object"),equal(_.size("hello"),5,"can compute the size of a string literal"),equal(_.size(new String("hello")),5,"can compute the size of string object"),equal(_.size(null),0,"handles nulls")})});