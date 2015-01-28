/**
 * Copyright (c) 2011-2013 Felix Gnass
 * Licensed under the MIT license
 */

(function(e,t){typeof exports=="object"?module.exports=t():typeof define=="function"&&define.amd?define(t):e.Spinner=t()})(this,function(){function r(e,t){var n=document.createElement(e||"div"),r;for(r in t)n[r]=t[r];return n}function i(e){for(var t=1,n=arguments.length;t<n;t++)e.appendChild(arguments[t]);return e}function o(e,r,i,o){var u=["opacity",r,~~(e*100),i,o].join("-"),a=.01+i/o*100,f=Math.max(1-(1-e)/r*(100-a),e),l=n.substring(0,n.indexOf("Animation")).toLowerCase(),c=l&&"-"+l+"-"||"";return t[u]||(s.insertRule("@"+c+"keyframes "+u+"{"+"0%{opacity:"+f+"}"+a+"%{opacity:"+e+"}"+(a+.01)+"%{opacity:1}"+(a+r)%100+"%{opacity:"+e+"}"+"100%{opacity:"+f+"}"+"}",s.cssRules.length),t[u]=1),u}function u(t,n){var r=t.style,i,s;n=n.charAt(0).toUpperCase()+n.slice(1);for(s=0;s<e.length;s++){i=e[s]+n;if(r[i]!==undefined)return i}if(r[n]!==undefined)return n}function a(e,t){for(var n in t)e.style[u(e,n)||n]=t[n];return e}function f(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)e[r]===undefined&&(e[r]=n[r])}return e}function l(e){var t={x:e.offsetLeft,y:e.offsetTop};while(e=e.offsetParent)t.x+=e.offsetLeft,t.y+=e.offsetTop;return t}function c(e,t){return typeof e=="string"?e:e[t%e.length]}function p(e){if(typeof this=="undefined")return new p(e);this.opts=f(e||{},p.defaults,h)}function d(){function e(e,t){return r("<"+e+' xmlns="urn:schemas-microsoft.com:vml" class="spin-vml">',t)}s.addRule(".spin-vml","behavior:url(#default#VML)"),p.prototype.lines=function(t,n){function o(){return a(e("group",{coordsize:s+" "+s,coordorigin:-r+" "+ -r}),{width:s,height:s})}function h(t,s,u){i(f,i(a(o(),{rotation:360/n.lines*t+"deg",left:~~s}),i(a(e("roundrect",{arcsize:n.corners}),{width:r,height:n.width,left:n.radius,top:-n.width>>1,filter:u}),e("fill",{color:c(n.color,t),opacity:n.opacity}),e("stroke",{opacity:0}))))}var r=n.length+n.width,s=2*r,u=-(n.width+n.length)*2+"px",f=a(o(),{position:"absolute",top:u,left:u}),l;if(n.shadow)for(l=1;l<=n.lines;l++)h(l,-2,"progid:DXImageTransform.Microsoft.Blur(pixelradius=2,makeshadow=1,shadowopacity=.3)");for(l=1;l<=n.lines;l++)h(l);return i(t,f)},p.prototype.opacity=function(e,t,n,r){var i=e.firstChild;r=r.shadow&&r.lines||0,i&&t+r<i.childNodes.length&&(i=i.childNodes[t+r],i=i&&i.firstChild,i=i&&i.firstChild,i&&(i.opacity=n))}}var e=["webkit","Moz","ms","O"],t={},n,s=function(){var e=r("style",{type:"text/css"});return i(document.getElementsByTagName("head")[0],e),e.sheet||e.styleSheet}(),h={lines:12,length:7,width:5,radius:10,rotate:0,corners:1,color:"#000",direction:1,speed:1,trail:100,opacity:.25,fps:20,zIndex:2e9,className:"spinner",top:"auto",left:"auto",position:"relative"};p.defaults={},f(p.prototype,{spin:function(e){this.stop();var t=this,i=t.opts,s=t.el=a(r(0,{className:i.className}),{position:i.position,width:0,zIndex:i.zIndex}),o=i.radius+i.length+i.width,u,f;e&&(e.insertBefore(s,e.firstChild||null),f=l(e),u=l(s),a(s,{left:(i.left=="auto"?f.x-u.x+(e.offsetWidth>>1):parseInt(i.left,10)+o)+"px",top:(i.top=="auto"?f.y-u.y+(e.offsetHeight>>1):parseInt(i.top,10)+o)+"px"})),s.setAttribute("role","progressbar"),t.lines(s,t.opts);if(!n){var c=0,h=(i.lines-1)*(1-i.direction)/2,p,d=i.fps,v=d/i.speed,m=(1-i.opacity)/(v*i.trail/100),g=v/i.lines;(function y(){c++;for(var e=0;e<i.lines;e++)p=Math.max(1-(c+(i.lines-e)*g)%v*m,i.opacity),t.opacity(s,e*i.direction+h,p,i);t.timeout=t.el&&setTimeout(y,~~(1e3/d))})()}return t},stop:function(){var e=this.el;return e&&(clearTimeout(this.timeout),e.parentNode&&e.parentNode.removeChild(e),this.el=undefined),this},lines:function(e,t){function l(e,n){return a(r(),{position:"absolute",width:t.length+t.width+"px",height:t.width+"px",background:e,boxShadow:n,transformOrigin:"left",transform:"rotate("+~~(360/t.lines*s+t.rotate)+"deg) translate("+t.radius+"px"+",0)",borderRadius:(t.corners*t.width>>1)+"px"})}var s=0,u=(t.lines-1)*(1-t.direction)/2,f;for(;s<t.lines;s++)f=a(r(),{position:"absolute",top:1+~(t.width/2)+"px",transform:t.hwaccel?"translate3d(0,0,0)":"",opacity:t.opacity,animation:n&&o(t.opacity,t.trail,u+s*t.direction,t.lines)+" "+1/t.speed+"s linear infinite"}),t.shadow&&i(f,a(l("#000","0 0 4px #000"),{top:"2px"})),i(e,i(f,l(c(t.color,s),"0 0 1px rgba(0,0,0,.1)")));return e},opacity:function(e,t,n){t<e.childNodes.length&&(e.childNodes[t].style.opacity=n)}});var v=a(r("group"),{behavior:"url(#default#VML)"});return!u(v,"transform")&&v.adj?d():n=u(v,"animation"),p});