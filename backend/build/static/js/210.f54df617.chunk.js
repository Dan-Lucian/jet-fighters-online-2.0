"use strict";(self.webpackChunkjet_fighters_online_2_0=self.webpackChunkjet_fighters_online_2_0||[]).push([[210],{3071:function(e,r,n){n.d(r,{Z:function(){return u}});var t="BtnSubmit_btn__2PgWn",a=n(184),u=function(e){var r=e.disabled,n=e.children;return(0,a.jsx)("button",{disabled:r,type:"submit",className:t,children:n})}},9163:function(e,r,n){n.d(r,{Z:function(){return u}});var t="FormAuth_form__i56jP",a=n(184),u=function(e){var r=e.onSubmit,n=e.children;return(0,a.jsx)("form",{onSubmit:r,className:t,children:n})}},1503:function(e,r,n){n.d(r,{Z:function(){return u}});var t={wrapper:"InputAuth_wrapper__FmqAX",input:"InputAuth_input__IQuwe",wrapperInner:"InputAuth_wrapperInner__33pRr",undertext:"InputAuth_undertext__hqxPV"},a=n(184),u=function(e){var r=e.id,n=e.type,u=e.label,s=e.undertext,o=e.pattern,c=e.name;return(0,a.jsxs)("div",{className:t.wrapper,children:[(0,a.jsx)("label",{className:t.label,htmlFor:r,children:u}),(0,a.jsxs)("div",{className:t.wrapperInner,children:[(0,a.jsx)("input",{required:!0,pattern:o,className:t.input,id:r,type:n,name:c}),(0,a.jsx)("p",{className:t.undertext,children:s})]})]})}},4876:function(e,r,n){n.d(r,{Z:function(){return c}});var t=n(1413),a=n(885),u=n(2791),s=function(e){var r=(0,u.useRef)(!1);return(0,u.useLayoutEffect)((function(){return r.current=!0,function(){r.current=!1}}),[]),(0,u.useCallback)((function(){return r.current?e.apply(void 0,arguments):void 0}),[e])},o=function(e,r){switch(r.type){case"pending":return{status:"pending",data:null,error:null};case"resolved":return{status:"resolved",data:r.data,error:null};case"rejected":return{status:"rejected",data:null,error:r.error};default:throw new Error("Unhandled action type: ".concat(r.type))}},c=function(e){var r=(0,u.useReducer)(o,(0,t.Z)({status:"idle",data:null,error:null},e)),n=(0,a.Z)(r,2),c=n[0],i=n[1],d=s(i),l=c.data,p=c.error,f=c.status,h=(0,u.useCallback)((function(e){d({type:"pending"}),e.then((function(e){d({type:"resolved",data:e})}),(function(e){d({type:"rejected",error:e})}))}),[d]),w=(0,u.useCallback)((function(e){return d({type:"resolved",data:e})}),[d]),m=(0,u.useCallback)((function(e){return d({type:"rejected",error:e})}),[d]);return{setData:w,setError:m,error:p,status:f,data:l,run:h}}},2722:function(e,r,n){var t=n(6871),a=n(2791);r.Z=function(){var e=(0,t.TH)().search;return(0,a.useMemo)((function(){return new URLSearchParams(e)}),[e])}},1210:function(e,r,n){n.r(r),n.d(r,{default:function(){return h}});var t=n(2791),a=n(6871),u=n(2722),s=n(4876),o=n(5210),c=n(9163),i=n(1503),d=n(3071),l="PageResetPassword_wrapper__zuu2h",p="PageResetPassword_heading__wed9k",f=n(184),h=function(){var e=(0,t.useRef)(null),r=(0,u.Z)(),n=(0,a.s0)(),h=(0,s.Z)().run;(0,t.useEffect)((function(){var t=r.get("token");if(n(window.location.pathname,{replace:!0}),!t||80!==t.length)return null;e.current=t}),[]);return(0,f.jsxs)("main",{className:l,children:[(0,f.jsx)("h1",{className:p,children:"Reset"}),(0,f.jsxs)(c.Z,{onSubmit:function(r){r.preventDefault();var n=new FormData(r.target);h(o.Z.resetPassword({password:n.get("password"),passwordConfirm:n.get("passwordConfirm"),token:e.current}))},children:[(0,f.jsx)(i.Z,{id:"password",label:"Password",type:"password",undertext:"* 8-25 characters",pattern:"^.{8,25}$",name:"password"}),(0,f.jsx)(i.Z,{id:"password-confirm",label:"Confirm the password",type:"password",pattern:"^.{8,25}$",name:"passwordConfirm"}),(0,f.jsx)(d.Z,{children:"Reset password"})]})]})}}}]);
//# sourceMappingURL=210.f54df617.chunk.js.map