/*! This file is auto-generated */
(()=>{"use strict";var e={n:n=>{var r=n&&n.__esModule?()=>n.default:()=>n;return e.d(r,{a:r}),r},d:(n,r)=>{for(var t in r)e.o(r,t)&&!e.o(n,t)&&Object.defineProperty(n,t,{enumerable:!0,get:r[t]})},o:(e,n)=>Object.prototype.hasOwnProperty.call(e,n),r:e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})}},n={};e.r(n),e.d(n,{PluginArea:()=>P,getPlugin:()=>w,getPlugins:()=>x,registerPlugin:()=>h,unregisterPlugin:()=>f,usePluginContext:()=>c,withPluginContext:()=>p});const r=window.wp.element,t=window.wp.hooks,o=window.wp.isShallowEqual;var i=e.n(o);const l=window.wp.compose,s=window.ReactJSXRuntime,u=(0,r.createContext)({name:null,icon:null}),a=u.Provider;function c(){return(0,r.useContext)(u)}const p=e=>(0,l.createHigherOrderComponent)((n=>r=>(0,s.jsx)(u.Consumer,{children:t=>(0,s.jsx)(n,{...r,...e(t,r)})})),"withPluginContext");class g extends r.Component{constructor(e){super(e),this.state={hasError:!1}}static getDerivedStateFromError(){return{hasError:!0}}componentDidCatch(e){const{name:n,onError:r}=this.props;r&&r(n,e)}render(){return this.state.hasError?null:this.props.children}}const d=window.wp.primitives,v=(0,s.jsx)(d.SVG,{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",children:(0,s.jsx)(d.Path,{d:"M10.5 4v4h3V4H15v4h1.5a1 1 0 011 1v4l-3 4v2a1 1 0 01-1 1h-3a1 1 0 01-1-1v-2l-3-4V9a1 1 0 011-1H9V4h1.5zm.5 12.5v2h2v-2l3-4v-3H8v3l3 4z"})}),m={};function h(e,n){if("object"!=typeof n)return console.error("No settings object provided!"),null;if("string"!=typeof e)return console.error("Plugin name must be string."),null;if(!/^[a-z][a-z0-9-]*$/.test(e))return console.error('Plugin name must include only lowercase alphanumeric characters or dashes, and start with a letter. Example: "my-plugin".'),null;m[e]&&console.error(`Plugin "${e}" is already registered.`),n=(0,t.applyFilters)("plugins.registerPlugin",n,e);const{render:r,scope:o}=n;if("function"!=typeof r)return console.error('The "render" property must be specified and must be a valid function.'),null;if(o){if("string"!=typeof o)return console.error("Plugin scope must be string."),null;if(!/^[a-z][a-z0-9-]*$/.test(o))return console.error('Plugin scope must include only lowercase alphanumeric characters or dashes, and start with a letter. Example: "my-page".'),null}return m[e]={name:e,icon:v,...n},(0,t.doAction)("plugins.pluginRegistered",n,e),n}function f(e){if(!m[e])return void console.error('Plugin "'+e+'" is not registered.');const n=m[e];return delete m[e],(0,t.doAction)("plugins.pluginUnregistered",n,e),n}function w(e){return m[e]}function x(e){return Object.values(m).filter((n=>n.scope===e))}const y=function(e,n){var r,t,o=0;function i(){var i,l,s=r,u=arguments.length;e:for(;s;){if(s.args.length===arguments.length){for(l=0;l<u;l++)if(s.args[l]!==arguments[l]){s=s.next;continue e}return s!==r&&(s===t&&(t=s.prev),s.prev.next=s.next,s.next&&(s.next.prev=s.prev),s.next=r,s.prev=null,r.prev=s,r=s),s.val}s=s.next}for(i=new Array(u),l=0;l<u;l++)i[l]=arguments[l];return s={args:i,val:e.apply(null,i)},r?(r.prev=s,s.next=r):t=s,o===n.maxSize?(t=t.prev).next=null:o++,r=s,s.val}return n=n||{},i.clear=function(){r=null,t=null,o=0},i}(((e,n)=>({icon:e,name:n})));const P=function({scope:e,onError:n}){const o=(0,r.useMemo)((()=>{let n=[];return{subscribe:e=>((0,t.addAction)("plugins.pluginRegistered","core/plugins/plugin-area/plugins-registered",e),(0,t.addAction)("plugins.pluginUnregistered","core/plugins/plugin-area/plugins-unregistered",e),()=>{(0,t.removeAction)("plugins.pluginRegistered","core/plugins/plugin-area/plugins-registered"),(0,t.removeAction)("plugins.pluginUnregistered","core/plugins/plugin-area/plugins-unregistered")}),getValue(){const r=x(e);return i()(n,r)||(n=r),n}}}),[e]),l=(0,r.useSyncExternalStore)(o.subscribe,o.getValue,o.getValue);return(0,s.jsx)("div",{style:{display:"none"},children:l.map((({icon:e,name:r,render:t})=>(0,s.jsx)(a,{value:y(e,r),children:(0,s.jsx)(g,{name:r,onError:n,children:(0,s.jsx)(t,{})})},r)))})};(window.wp=window.wp||{}).plugins=n})();