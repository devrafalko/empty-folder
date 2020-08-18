module.exports=function(t){var e={};function r(n){if(e[n])return e[n].exports;var o=e[n]={i:n,l:!1,exports:{}};return t[n].call(o.exports,o,o.exports,r),o.l=!0,o.exports}return r.m=t,r.c=e,r.d=function(t,e,n){r.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},r.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},r.t=function(t,e){if(1&e&&(t=r(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var o in t)r.d(n,o,function(e){return t[e]}.bind(null,o));return n},r.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return r.d(e,"a",e),e},r.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},r.p="",r(r.s=0)}([function(t,e,r){function n(t,e){var r;if("undefined"==typeof Symbol||null==t[Symbol.iterator]){if(Array.isArray(t)||(r=function(t,e){if(!t)return;if("string"==typeof t)return o(t,e);var r=Object.prototype.toString.call(t).slice(8,-1);"Object"===r&&t.constructor&&(r=t.constructor.name);if("Map"===r||"Set"===r)return Array.from(t);if("Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r))return o(t,e)}(t))||e&&t&&"number"==typeof t.length){r&&(t=r);var n=0,i=function(){};return{s:i,n:function(){return n>=t.length?{done:!0}:{done:!1,value:t[n++]}},e:function(t){throw t},f:i}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var u,s=!0,a=!1;return{s:function(){r=t[Symbol.iterator]()},n:function(){var t=r.next();return s=t.done,t},e:function(t){a=!0,u=t},f:function(){try{s||null==r.return||r.return()}finally{if(a)throw u}}}}function o(t,e){(null==e||e>t.length)&&(e=t.length);for(var r=0,n=new Array(e);r<e;r++)n[r]=t[r];return n}var i=r(1),u=r(2),s=r(3),a=r(4),l=r(5);t.exports=function(t,e,r){var o=[c,d,h,v,p,b],f={args:arguments,returned:{error:null,removed:[],failed:[]}};function c(t){s(this.args,[String,Boolean,Function],(function(t){throw new TypeError(t.message)}))&&t()}function d(n){this.callback=r,this.rootAbsolute=i.resolve(t),this.removeRoot=e,n()}function h(t,e){var r=this;u.stat(this.rootAbsolute,(function(n,o){var i=null===n,s=o instanceof u.Stats&&o.isDirectory();return i&&s?t():i&&!s?e(new Error('The given path "'.concat(r.rootAbsolute,'" is not a directory.'))):i?void 0:e(new Error('The given path "'.concat(r.rootAbsolute,'" does not exist or is inaccessible.')))}))}function v(t){var e=this;a(this.rootAbsolute,(function(r){e.dirs=r.dirs.sort((function(t,e){return e.length-t.length})),e.files=r.files;var o,u=n(r.inaccessible);try{for(u.s();!(o=u.n()).done;){var s=o.value;e.returned.failed.push(i.resolve(e.rootAbsolute,s))}}catch(t){u.e(t)}finally{u.f()}t()}))}function p(t){var e=this,r=0;if(!this.files.length)return t();var o,s=n(this.files);try{var a=function(){var n=o.value,s=i.resolve(e.rootAbsolute,n);u.unlink(s,(function(n){e.returned[n?"failed":"removed"].push(s),++r===e.files.length&&t()}))};for(s.s();!(o=s.n()).done;)a()}catch(t){s.e(t)}finally{s.f()}}function b(t){var e=[];this.removeRoot&&this.dirs.push(this.rootAbsolute);var r,o=n(this.dirs);try{var s=function(){var t=r.value;e.push((function(e){var r=this,n=i.resolve(this.rootAbsolute,t);u.rmdir(n,(function(t){return r.returned[t?"failed":"removed"].push(n),e()}))}))};for(o.s();!(r=o.n()).done;)s()}catch(t){o.e(t)}finally{o.f()}l(e,{context:this},t,t)}function y(){var t=this.returned.failed.length;t&&(this.returned.error=new Error("The ".concat(t," item").concat(t>1?"s":""," could not be removed."))),this.callback(this.returned)}function m(t,e){this.returned.error=e,this.callback(this.returned)}l(o,{context:f},y,m)}},function(t,e){t.exports=require("path")},function(t,e){t.exports=require("fs")},function(t,e){t.exports=require("typeof-arguments")},function(t,e){t.exports=require("list-contents")},function(t,e){t.exports=require("move-on")}]);