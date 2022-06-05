!function(e){var t=!1
if("function"==typeof define&&define.amd&&(define(e),t=!0),"object"==typeof exports&&(module.exports=e(),t=!0),!t){var r=window.Cookies,i=window.Cookies=e()
i.noConflict=function(){return window.Cookies=r,i}}}(function(){function e(){for(var e=0,t={};e<arguments.length;e++){var r=arguments[e]
for(var i in r)t[i]=r[i]}return t}function t(r){function i(t,o,a){var n
if("undefined"!=typeof document){if(arguments.length>1){if(a=e({path:"/"},i.defaults,a),"number"==typeof a.expires){var d=new Date
d.setMilliseconds(d.getMilliseconds()+864e5*a.expires),a.expires=d}a.expires=a.expires?a.expires.toUTCString():""
try{n=JSON.stringify(o),/^[\{\[]/.test(n)&&(o=n)}catch(l){}o=r.write?r.write(o,t):encodeURIComponent(o+"").replace(/%(23|24|26|2B|3A|3C|3E|3D|2F|3F|40|5B|5D|5E|60|7B|7D|7C)/g,decodeURIComponent),t=encodeURIComponent(t+""),t=t.replace(/%(23|24|26|2B|5E|60|7C)/g,decodeURIComponent),t=t.replace(/[\(\)]/g,escape)
var s=""
for(var c in a)a[c]&&(s+="; "+c,a[c]!==!0&&(s+="="+a[c]))
return document.cookie=t+"="+o+s}t||(n={})
for(var u=document.cookie?document.cookie.split("; "):[],p=/(%[0-9A-Z]{2})+/g,g=0;g<u.length;g++){var m=u[g].split("="),v=m.slice(1).join("=")
'"'===v.charAt(0)&&(v=v.slice(1,-1))
try{var f=m[0].replace(p,decodeURIComponent)
if(v=r.read?r.read(v,f):r(v,f)||v.replace(p,decodeURIComponent),this.json)try{v=JSON.parse(v)}catch(l){}if(t===f){n=v
break}t||(n[f]=v)}catch(l){}}return n}}return i.set=i,i.get=function(e){return i.call(i,e)},i.getJSON=function(){return i.apply({json:!0},[].slice.call(arguments))},i.defaults={},i.remove=function(t,r){i(t,"",e(r,{expires:-1}))},i.withConverter=t,i}return t(function(){})})
