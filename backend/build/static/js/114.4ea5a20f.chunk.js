"use strict";(self.webpackChunkjet_fighters_online_2_0=self.webpackChunkjet_fighters_online_2_0||[]).push([[114,281,990],{3071:function(e,r,s){s.d(r,{Z:function(){return n}});var a="BtnSubmit_btn__2PgWn",t=s(184),n=function(e){var r=e.disabled,s=e.children;return(0,t.jsx)("button",{disabled:r,type:"submit",className:a,children:s})}},9163:function(e,r,s){s.d(r,{Z:function(){return n}});var a="FormAuth_form__i56jP",t=s(184),n=function(e){var r=e.onSubmit,s=e.children;return(0,t.jsx)("form",{onSubmit:r,className:a,children:s})}},1503:function(e,r,s){s.d(r,{Z:function(){return n}});var a={wrapper:"InputAuth_wrapper__FmqAX",input:"InputAuth_input__IQuwe",wrapperInner:"InputAuth_wrapperInner__33pRr",undertext:"InputAuth_undertext__hqxPV"},t=s(184),n=function(e){var r=e.id,s=e.type,n=e.label,i=e.undertext,l=e.pattern,c=e.name;return(0,t.jsxs)("div",{className:a.wrapper,children:[(0,t.jsx)("label",{className:a.label,htmlFor:r,children:n}),(0,t.jsxs)("div",{className:a.wrapperInner,children:[(0,t.jsx)("input",{required:!0,pattern:l,className:a.input,id:r,type:s,name:c}),(0,t.jsx)("p",{className:a.undertext,children:i})]})]})}},6880:function(e,r,s){s.d(r,{Z:function(){return n}});var a="Jet_jet__GaY3H",t=s(184),n=function(e){var r=e.onClick,s=e.imgJet;return(0,t.jsx)("button",{onClick:r,className:a,type:"button",children:(0,t.jsx)("img",{width:"48px",height:"48px",src:s,alt:"jet"})})}},990:function(e,r,s){s.r(r),s.d(r,{default:function(){return c}});var a=s(3504),t="PageNonexistent_wrapper__TAlZn",n="PageNonexistent_link__ojQmY",i="PageNonexistent_text__k-fmD",l=s(184),c=function(){return(0,l.jsxs)("main",{className:t,children:[(0,l.jsx)("div",{className:i,children:"404 no page here"}),(0,l.jsx)(a.rU,{className:n,to:"/",children:"home"})]})}},4876:function(e,r,s){s.d(r,{Z:function(){return c}});var a=s(1413),t=s(885),n=s(2791),i=function(e){var r=(0,n.useRef)(!1);return(0,n.useLayoutEffect)((function(){return r.current=!0,function(){r.current=!1}}),[]),(0,n.useCallback)((function(){return r.current?e.apply(void 0,arguments):void 0}),[e])},l=function(e,r){switch(r.type){case"pending":return{status:"pending",data:null,error:null};case"resolved":return{status:"resolved",data:r.data,error:null};case"rejected":return{status:"rejected",data:null,error:r.error};default:throw new Error("Unhandled action type: ".concat(r.type))}},c=function(e){var r=(0,n.useReducer)(l,(0,a.Z)({status:"idle",data:null,error:null},e)),s=(0,t.Z)(r,2),c=s[0],o=s[1],d=i(o),u=c.data,p=c.error,_=c.status,m=(0,n.useCallback)((function(e){d({type:"pending"}),e.then((function(e){d({type:"resolved",data:e})}),(function(e){d({type:"rejected",error:e})}))}),[d]),f=(0,n.useCallback)((function(e){return d({type:"resolved",data:e})}),[d]),h=(0,n.useCallback)((function(e){return d({type:"rejected",error:e})}),[d]);return{setData:f,setError:h,error:p,status:_,data:u,run:m}}},2281:function(e,r,s){s.r(r),s.d(r,{default:function(){return W}});var a=s(1413),t=s(885),n=s(2791),i=s(6871),l=s(6225),c=s(8592),o=s(4876),d=s(5210),u=s(990),p=s(1287),_=s(6080),m=s(6880),f=function(e){return e.charAt(0).toUpperCase()+e.slice(1)},h={wrapper:"JetFav_wrapper__ToXvL",wrapperJet:"JetFav_wrapperJet__02aEx",wrapperTypeJet:"JetFav_wrapperTypeJet__0hZov",games:"JetFav_games__CS7BE",stats:"JetFav_stats__pU+PS",wins:"JetFav_wins__jmQWA",loses:"JetFav_loses__Tgjjt"},j=s(184),g=function(e){var r=e.typeJet,s=e.wins,a=e.loses,t=e.draws,n=s+a+t;return(0,j.jsxs)("div",{className:h.wrapper,children:[(0,j.jsxs)("div",{className:h.wrapperJet,children:[(0,j.jsx)(m.Z,{onClick:function(){},imgJet:_.N[r].imgJet}),(0,j.jsxs)("div",{className:h.wrapperTypeJet,children:[(0,j.jsx)("p",{children:f(r)}),(0,j.jsxs)("p",{className:h.games,children:[n," games"]})]})]}),(0,j.jsxs)("div",{className:h.stats,children:[(0,j.jsxs)("p",{className:h.wins,children:[s,"W"]}),(0,j.jsxs)("p",{className:h.loses,children:[a,"L"]}),(0,j.jsxs)("p",{className:h.draws,children:[t,"D"]})]})]})},x=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],w=function(e){var r=new Date(e);return"Joined ".concat(r.getUTCDate()," ")+"".concat(x[r.getUTCMonth()]," ").concat(r.getUTCFullYear())},v=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[];return 0===e.length?null:Object.entries(e).sort((function(e,r){return r[1].wins+r[1].loses+r[1].draws-(e[1].wins+e[1].loses+e[1].draws)}))},N="PageProfile_wrapper__7aR4d",P="PageProfile_card__4kIRb",b="PageProfile_wrapperJet__sBsft",Z="PageProfile_backgroundHalf__Ma9dN",y="PageProfile_jet__lAbeZ",J="PageProfile_img__5HURZ",k="PageProfile_wrapperName__r9rWk",C="PageProfile_name__rHy3b",F="PageProfile_email__d3-Ja",A="PageProfile_btnLogout__9KF55",R="PageProfile_btnAddFriend__QpHah",D="PageProfile_stats__85cp1",U="PageProfile_wrapperWins__bWGwE",L="PageProfile_wrapperLoses__DROGV",E="PageProfile_wrapperDraws__AFbEd",I="PageProfile_wrapperMostPlayed__oDmCD",T="PageProfile_heading__5FDf2",W=function(){var e=(0,c.m)(),r=(0,t.Z)(e,2),s=r[0],m=r[1],f=(0,l.Z)(),h=f.account,x=f.logout,W=f.loading,M=(0,o.Z)(),S=M.status,H=M.data,B=M.run,Q=(0,n.useRef)(null),q=(0,i.UO)().userName,G=(0,i.s0)(),O=(0,i.TH)().pathname;if((0,n.useLayoutEffect)((function(){W||B(d.Z.getByUserName(q))}),[W,B,q]),W||"pending"===S||"idle"===S)return(0,j.jsx)(p.Z,{});if(!H)return(0,j.jsx)(u.default,{});var Y=q===(null===h||void 0===h?void 0:h.userName);Q.current||(Q.current=v(H.stats).slice(1,4));return(0,j.jsx)("main",{className:N,children:(0,j.jsxs)("div",{className:P,children:[(0,j.jsxs)("div",{className:b,children:[(0,j.jsx)("div",{className:Z}),(0,j.jsx)("div",{className:y,children:(0,j.jsx)("img",{className:J,src:_.N[Q.current[0][0]].imgJet,alt:"jet"})})]}),(0,j.jsxs)("section",{className:k,children:[(0,j.jsx)("h1",{className:C,children:H.userName}),Y&&(0,j.jsxs)(j.Fragment,{children:[(0,j.jsx)("p",{className:F,children:H.email}),(0,j.jsx)("p",{children:w(H.created)}),(0,j.jsx)("button",{className:A,onClick:function(){G("/"),x()},type:"button",children:"Log out"})]}),!Y&&(0,j.jsx)("button",{className:R,onClick:function(){if(!h)return G("/login"),void m((0,a.Z)((0,a.Z)({},s),{},{pathBeforeLogin:O}));d.Z.sendFriendRequest(H.userName)},type:"button",children:"Add friend"})]}),(0,j.jsxs)("section",{className:D,children:[(0,j.jsxs)("div",{className:U,children:[(0,j.jsx)("p",{children:"Wins"}),(0,j.jsx)("p",{children:H.stats.total.wins})]}),(0,j.jsxs)("div",{className:L,children:[(0,j.jsx)("p",{children:"Loses"}),(0,j.jsx)("p",{children:H.stats.total.loses})]}),(0,j.jsxs)("div",{className:E,children:[(0,j.jsx)("p",{children:"Draws"}),(0,j.jsx)("p",{children:H.stats.total.draws})]})]}),(0,j.jsxs)("section",{className:I,children:[(0,j.jsx)("h2",{className:T,children:"Most played jets"}),Q.current.map((function(e,r){return(0,j.jsx)(g,{typeJet:e[0],wins:e[1].wins,loses:e[1].loses,draws:e[1].draws},r)}))]})]})})}},7114:function(e,r,s){s.r(r),s.d(r,{default:function(){return N}});var a=s(1413),t=s(885),n=s(2791),i=s(3504),l="PageRegister_wrapper__Q7GMx",c="PageRegister_wrapperInner__w1Wzw",o="PageRegister_heading__m6ELo",d="PageRegister_wrapperLinks__Z-aJd",u="PageRegister_link__KC6Jv",p=s(4876),_=s(6225),m=s(8592),f=s(5210),h=s(9163),j=s(1503),g=s(3071),x=s(2281),w=s(1287),v=s(184),N=function(){var e=(0,_.Z)().account,r=(0,m.m)(),s=(0,t.Z)(r,2)[1],N=(0,p.Z)(),P=N.error,b=N.status,Z=N.run;(0,n.useEffect)((function(){P&&s((function(e){return(0,a.Z)((0,a.Z)({},e),{},{msgPopup:null===P||void 0===P?void 0:P.response.data.message})}))}),[P]);return e?(0,v.jsx)(x.default,{}):"pending"===b?(0,v.jsx)(w.Z,{}):"resolved"===b?(0,v.jsx)("main",{className:l,children:(0,v.jsxs)("div",{className:c,children:[(0,v.jsx)("p",{children:"Account created."}),(0,v.jsx)("p",{children:"We've sent an activation link to the specified email."}),(0,v.jsx)("p",{children:"If the email does not appear even after 5 minutes then check the spam section as well."})]})}):(0,v.jsxs)("main",{className:l,children:[(0,v.jsx)("h1",{className:o,children:"Registration"}),(0,v.jsxs)(h.Z,{onSubmit:function(e){e.preventDefault();var r=new FormData(e.target),s={email:r.get("email"),userName:r.get("userName"),password:r.get("password"),passwordConfirm:r.get("passwordConfirm")};Z(f.Z.register(s))},children:[(0,v.jsx)(j.Z,{id:"email",label:"Email",type:"email",name:"email"}),(0,v.jsx)(j.Z,{id:"username",label:"Username",type:"text",undertext:"* 3-15 characters",pattern:"^.{3,15}$",name:"userName"}),(0,v.jsx)(j.Z,{id:"password",label:"Password",type:"password",undertext:"* 8-25 characters",pattern:"^.{8,25}$",name:"password"}),(0,v.jsx)(j.Z,{id:"password-confirm",label:"Confirm the password",type:"password",pattern:"^.{8,25}$",name:"passwordConfirm"}),(0,v.jsxs)("div",{className:d,children:[(0,v.jsx)(i.rU,{to:"/login",className:u,children:"Login"}),(0,v.jsx)(i.rU,{to:"/forgot-password",className:u,children:"Forgot password"})]}),(0,v.jsx)(g.Z,{disabled:"pending"===b,children:"Register"})]})]})}}}]);
//# sourceMappingURL=114.4ea5a20f.chunk.js.map