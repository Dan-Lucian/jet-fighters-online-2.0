"use strict";(self.webpackChunkjet_fighters_online_2_0=self.webpackChunkjet_fighters_online_2_0||[]).push([[114,844,486],{4830:function(e,r,s){s.d(r,{Z:function(){return n}});var a="BtnSubmit_btn__DwWgI",t=s(184),n=function(e){var r=e.disabled,s=e.children;return(0,t.jsx)("button",{disabled:r,type:"submit",className:a,children:s})}},1166:function(e,r,s){s.d(r,{Z:function(){return n}});var a="FormAuth_form__9jVKL",t=s(184),n=function(e){var r=e.onSubmit,s=e.children;return(0,t.jsx)("form",{onSubmit:r,className:a,children:s})}},1710:function(e,r,s){s.d(r,{Z:function(){return n}});var a={wrapper:"InputAuth_wrapper__mggdz",input:"InputAuth_input__SPVYc",wrapperInner:"InputAuth_wrapperInner__ghQHC",undertext:"InputAuth_undertext__-F9on"},t=s(184),n=function(e){var r=e.id,s=e.type,n=e.label,i=e.undertext,l=e.pattern,c=e.name;return(0,t.jsxs)("div",{className:a.wrapper,children:[(0,t.jsx)("label",{className:a.label,htmlFor:r,children:n}),(0,t.jsxs)("div",{className:a.wrapperInner,children:[(0,t.jsx)("input",{required:!0,pattern:l,className:a.input,id:r,type:s,name:c}),(0,t.jsx)("p",{className:a.undertext,children:i})]})]})}},7040:function(e,r,s){s.d(r,{Z:function(){return n}});var a="Jet_jet__0FqRm",t=s(184),n=function(e){var r=e.onClick,s=e.imgJet;return(0,t.jsx)("button",{onClick:r,className:a,type:"button",children:(0,t.jsx)("img",{src:s,alt:"jet"})})}},9486:function(e,r,s){s.r(r),s.d(r,{default:function(){return l}});var a=s(3504),t="PageNonexistent_wrapper__C-izW",n="PageNonexistent_link__hq7XP",i=s(184),l=function(){return(0,i.jsxs)("main",{className:t,children:[(0,i.jsx)("div",{children:"404 no page here"}),(0,i.jsx)(a.rU,{className:n,to:"/",children:"home"})]})}},4876:function(e,r,s){s.d(r,{Z:function(){return c}});var a=s(1413),t=s(885),n=s(2791),i=function(e){var r=(0,n.useRef)(!1);return(0,n.useLayoutEffect)((function(){return r.current=!0,function(){r.current=!1}}),[]),(0,n.useCallback)((function(){return r.current?e.apply(void 0,arguments):void 0}),[e])},l=function(e,r){switch(r.type){case"pending":return{status:"pending",data:null,error:null};case"resolved":return{status:"resolved",data:r.data,error:null};case"rejected":return{status:"rejected",data:null,error:r.error};default:throw new Error("Unhandled action type: ".concat(r.type))}},c=function(e){var r=(0,n.useReducer)(l,(0,a.Z)({status:"idle",data:null,error:null},e)),s=(0,t.Z)(r,2),c=s[0],o=s[1],d=i(o),u=c.data,p=c.error,_=c.status,m=(0,n.useCallback)((function(e){d({type:"pending"}),e.then((function(e){d({type:"resolved",data:e})}),(function(e){d({type:"rejected",error:e})}))}),[d]),f=(0,n.useCallback)((function(e){return d({type:"resolved",data:e})}),[d]),h=(0,n.useCallback)((function(e){return d({type:"rejected",error:e})}),[d]);return{setData:f,setError:h,error:p,status:_,data:u,run:m}}},5844:function(e,r,s){s.r(r),s.d(r,{default:function(){return A}});var a=s(2791),t=s(6871),n=s(6225),i=s(4876),l=s(5210),c=s(9486),o=s(3503),d=s(6080),u=s(7040),p={wrapper:"JetFav_wrapper__fBSqU",wrapperJet:"JetFav_wrapperJet__KtaeC",wrapperTypeJet:"JetFav_wrapperTypeJet__45dw7",games:"JetFav_games__+fRj-",stats:"JetFav_stats__Jcbgb",wins:"JetFav_wins__ruoI8",loses:"JetFav_loses__Fi0ls"},_=s(184),m=function(e){return e.charAt(0).toUpperCase()+e.slice(1)},f=function(e){var r=e.typeJet,s=e.wins,a=e.loses,t=e.draws,n=s+a+t;return(0,_.jsxs)("div",{className:p.wrapper,children:[(0,_.jsxs)("div",{className:p.wrapperJet,children:[(0,_.jsx)(u.Z,{onClick:function(){},imgJet:d.N[r].imgJet}),(0,_.jsxs)("div",{className:p.wrapperTypeJet,children:[(0,_.jsx)("p",{children:m(r)}),(0,_.jsxs)("p",{className:p.games,children:[n," games"]})]})]}),(0,_.jsxs)("div",{className:p.stats,children:[(0,_.jsxs)("p",{className:p.wins,children:[s,"W"]}),(0,_.jsxs)("p",{className:p.loses,children:[a,"L"]}),(0,_.jsxs)("p",{className:p.draws,children:[t,"D"]})]})]})},h="PageProfile_wrapper__7aR4d",g="PageProfile_card__4kIRb",j="PageProfile_wrapperJet__sBsft",x="PageProfile_backgroundHalf__Ma9dN",w="PageProfile_jet__lAbeZ",v="PageProfile_img__5HURZ",N="PageProfile_wrapperName__r9rWk",P="PageProfile_name__rHy3b",b="PageProfile_email__d3-Ja",y="PageProfile_btnLogout__9KF55",J="PageProfile_stats__85cp1",Z="PageProfile_wrapperWins__bWGwE",C="PageProfile_wrapperLoses__DROGV",k="PageProfile_wrapperDraws__AFbEd",F="PageProfile_wrapperMostPlayed__oDmCD",D="PageProfile_heading__5FDf2",R=function(e){return Object.entries(e).sort((function(e,r){return r[1].wins+r[1].loses+r[1].draws-(e[1].wins+e[1].loses+e[1].draws)}))},E=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],I=function(e){var r=new Date(e);return"Joined ".concat(r.getUTCDate()," ")+"".concat(E[r.getUTCMonth()]," ").concat(r.getUTCFullYear())},A=function(){console.log("I RENDERED");var e=(0,t.s0)(),r=(0,i.Z)(),s=r.status,u=r.data,p=r.run,m=(0,n.Z)(),E=m.account,A=m.logout,L=m.loading;(0,a.useLayoutEffect)((function(){E&&p(l.Z.getById(E.id))}),[E]);if(L)return(0,_.jsx)(o.Z,{});if("pending"===s||"idle"===s)return(0,_.jsx)(o.Z,{});if(!E)return(0,_.jsx)(c.default,{});var U=R(u.stats).slice(1,4);return(0,_.jsx)("main",{className:h,children:(0,_.jsxs)("div",{className:g,children:[(0,_.jsxs)("div",{className:j,children:[(0,_.jsx)("div",{className:x}),(0,_.jsx)("div",{className:w,children:(0,_.jsx)("img",{className:v,src:d.N[U[0][0]].imgJet,alt:"jet"})})]}),(0,_.jsxs)("section",{className:N,children:[(0,_.jsx)("h1",{className:P,children:u.userName}),(0,_.jsx)("p",{className:b,children:u.email}),(0,_.jsx)("p",{children:I(u.created)}),(0,_.jsx)("button",{className:y,onClick:function(){e("/"),A()},type:"button",children:"Log out"})]}),(0,_.jsxs)("section",{className:J,children:[(0,_.jsxs)("div",{className:Z,children:[(0,_.jsx)("p",{children:"Wins"}),(0,_.jsx)("p",{children:u.stats.total.wins})]}),(0,_.jsxs)("div",{className:C,children:[(0,_.jsx)("p",{children:"Loses"}),(0,_.jsx)("p",{children:u.stats.total.loses})]}),(0,_.jsxs)("div",{className:k,children:[(0,_.jsx)("p",{children:"Draws"}),(0,_.jsx)("p",{children:u.stats.total.draws})]})]}),(0,_.jsxs)("section",{className:F,children:[(0,_.jsx)("h2",{className:D,children:"Most played jets"}),U.map((function(e,r){return(0,_.jsx)(f,{typeJet:e[0],wins:e[1].wins,loses:e[1].loses,draws:e[1].draws},r)}))]})]})})}},7114:function(e,r,s){s.r(r),s.d(r,{default:function(){return v}});var a=s(1413),t=s(885),n=s(2791),i=s(3504),l="PageRegister_wrapper__Q7GMx",c="PageRegister_heading__m6ELo",o="PageRegister_wrapperLinks__Z-aJd",d="PageRegister_link__KC6Jv",u=s(4876),p=s(6225),_=s(8592),m=s(5210),f=s(1166),h=s(1710),g=s(4830),j=s(5844),x=s(3503),w=s(184),v=function(){var e=(0,p.Z)().account,r=(0,_.m)(),s=(0,t.Z)(r,2)[1],v=(0,u.Z)({status:"idle"}),N=v.error,P=v.status,b=v.run;(0,n.useEffect)((function(){N&&s((function(e){return(0,a.Z)((0,a.Z)({},e),{},{msgPopup:null===N||void 0===N?void 0:N.response.data.message})}))}),[N]);return e?(0,w.jsx)(j.default,{}):"pending"===P?(0,w.jsx)(x.Z,{}):"resolved"===P?(0,w.jsx)("main",{className:l,children:"Account created. We've sent an activation link to the specified email."}):(0,w.jsxs)("main",{className:l,children:[(0,w.jsx)("h1",{className:c,children:"Registration"}),(0,w.jsxs)(f.Z,{onSubmit:function(e){e.preventDefault();var r=new FormData(e.target),s={email:r.get("email"),userName:r.get("userName"),password:r.get("password"),passwordConfirm:r.get("passwordConfirm")};b(m.Z.register(s))},children:[(0,w.jsx)(h.Z,{id:"email",label:"Email",type:"email",name:"email"}),(0,w.jsx)(h.Z,{id:"username",label:"Username",type:"text",undertext:"* 3-15 characters",pattern:"^.{3,15}$",name:"userName"}),(0,w.jsx)(h.Z,{id:"password",label:"Password",type:"password",undertext:"* 8-25 characters",pattern:"^.{8,25}$",name:"password"}),(0,w.jsx)(h.Z,{id:"password-confirm",label:"Confirm the password",type:"password",pattern:"^.{8,25}$",name:"passwordConfirm"}),(0,w.jsxs)("div",{className:o,children:[(0,w.jsx)(i.rU,{to:"/login",className:d,children:"Login"}),(0,w.jsx)(i.rU,{to:"/forgot-password",className:d,children:"Forgot password"})]}),(0,w.jsx)(g.Z,{disabled:"pending"===P,children:"Register"})]})]})}}}]);
//# sourceMappingURL=114.07d7a3e2.chunk.js.map