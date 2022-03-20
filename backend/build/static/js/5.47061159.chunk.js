"use strict";(self.webpackChunkjet_fighters_online_2_0=self.webpackChunkjet_fighters_online_2_0||[]).push([[5,844,486],{4830:function(e,r,s){s.d(r,{Z:function(){return n}});var a="BtnSubmit_btn__DwWgI",t=s(184),n=function(e){var r=e.disabled,s=e.children;return(0,t.jsx)("button",{disabled:r,type:"submit",className:a,children:s})}},1166:function(e,r,s){s.d(r,{Z:function(){return n}});var a="FormAuth_form__9jVKL",t=s(184),n=function(e){var r=e.onSubmit,s=e.children;return(0,t.jsx)("form",{onSubmit:r,className:a,children:s})}},1710:function(e,r,s){s.d(r,{Z:function(){return n}});var a={wrapper:"InputAuth_wrapper__mggdz",input:"InputAuth_input__SPVYc",wrapperInner:"InputAuth_wrapperInner__ghQHC",undertext:"InputAuth_undertext__-F9on"},t=s(184),n=function(e){var r=e.id,s=e.type,n=e.label,i=e.undertext,l=e.pattern,c=e.name;return(0,t.jsxs)("div",{className:a.wrapper,children:[(0,t.jsx)("label",{className:a.label,htmlFor:r,children:n}),(0,t.jsxs)("div",{className:a.wrapperInner,children:[(0,t.jsx)("input",{required:!0,pattern:l,className:a.input,id:r,type:s,name:c}),(0,t.jsx)("p",{className:a.undertext,children:i})]})]})}},7040:function(e,r,s){s.d(r,{Z:function(){return n}});var a="Jet_jet__0FqRm",t=s(184),n=function(e){var r=e.onClick,s=e.imgJet;return(0,t.jsx)("button",{onClick:r,className:a,type:"button",children:(0,t.jsx)("img",{width:"48px",height:"48px",src:s,alt:"jet"})})}},9486:function(e,r,s){s.r(r),s.d(r,{default:function(){return c}});var a=s(3504),t="PageNonexistent_wrapper__C-izW",n="PageNonexistent_link__hq7XP",i="PageNonexistent_text__7hUu3",l=s(184),c=function(){return(0,l.jsxs)("main",{className:t,children:[(0,l.jsx)("div",{className:i,children:"404 no page here"}),(0,l.jsx)(a.rU,{className:n,to:"/",children:"home"})]})}},4876:function(e,r,s){s.d(r,{Z:function(){return c}});var a=s(1413),t=s(885),n=s(2791),i=function(e){var r=(0,n.useRef)(!1);return(0,n.useLayoutEffect)((function(){return r.current=!0,function(){r.current=!1}}),[]),(0,n.useCallback)((function(){return r.current?e.apply(void 0,arguments):void 0}),[e])},l=function(e,r){switch(r.type){case"pending":return{status:"pending",data:null,error:null};case"resolved":return{status:"resolved",data:r.data,error:null};case"rejected":return{status:"rejected",data:null,error:r.error};default:throw new Error("Unhandled action type: ".concat(r.type))}},c=function(e){var r=(0,n.useReducer)(l,(0,a.Z)({status:"idle",data:null,error:null},e)),s=(0,t.Z)(r,2),c=s[0],o=s[1],u=i(o),d=c.data,p=c.error,_=c.status,f=(0,n.useCallback)((function(e){u({type:"pending"}),e.then((function(e){u({type:"resolved",data:e})}),(function(e){u({type:"rejected",error:e})}))}),[u]),m=(0,n.useCallback)((function(e){return u({type:"resolved",data:e})}),[u]),h=(0,n.useCallback)((function(e){return u({type:"rejected",error:e})}),[u]);return{setData:m,setError:h,error:p,status:_,data:d,run:f}}},3005:function(e,r,s){s.r(r),s.d(r,{default:function(){return x}});var a=s(1413),t=s(885),n=s(2791),i=s(3504),l=s(6225),c=s(1166),o=s(1710),u=s(4830),d=s(3503),p="PageLogin_wrapper__l2ytW",_="PageLogin_heading__ApWj0",f="PageLogin_wrapperLinks__ddwqB",m="PageLogin_link__hdSqy",h=s(5844),g=s(8592),j=s(184),x=function(){var e=(0,l.Z)(),r=e.account,s=e.login,x=e.loading,w=e.error,v=(0,g.m)(),N=(0,t.Z)(v,2)[1];(0,n.useEffect)((function(){w&&N((function(e){return(0,a.Z)((0,a.Z)({},e),{},{msgPopup:null===w||void 0===w?void 0:w.response.data.message})}))}),[w]);return x?(0,j.jsx)(d.Z,{}):r?(0,j.jsx)(h.default,{}):(0,j.jsxs)("main",{className:p,children:[(0,j.jsx)("h1",{className:_,children:"Login"}),(0,j.jsxs)(c.Z,{onSubmit:function(e){e.preventDefault();var r=new FormData(e.target),a={email:r.get("email"),password:r.get("password")};s(a)},children:[(0,j.jsx)(o.Z,{id:"email",label:"Email",type:"email",name:"email"}),(0,j.jsx)(o.Z,{id:"password",label:"Password",type:"password",undertext:"* 8-25 characters",pattern:"^.{8,25}$",name:"password"}),(0,j.jsxs)("div",{className:f,children:[(0,j.jsx)(i.rU,{to:"/register",className:m,children:"Register"}),(0,j.jsx)(i.rU,{to:"/forgot-password",className:m,children:"Forgot password"})]}),(0,j.jsx)(u.Z,{children:"Login"})]})]})}},5844:function(e,r,s){s.r(r),s.d(r,{default:function(){return E}});var a=s(2791),t=s(6871),n=s(6225),i=s(4876),l=s(5210),c=s(9486),o=s(3503),u=s(6080),d=s(7040),p={wrapper:"JetFav_wrapper__fBSqU",wrapperJet:"JetFav_wrapperJet__KtaeC",wrapperTypeJet:"JetFav_wrapperTypeJet__45dw7",games:"JetFav_games__+fRj-",stats:"JetFav_stats__Jcbgb",wins:"JetFav_wins__ruoI8",loses:"JetFav_loses__Fi0ls"},_=s(184),f=function(e){return e.charAt(0).toUpperCase()+e.slice(1)},m=function(e){var r=e.typeJet,s=e.wins,a=e.loses,t=e.draws,n=s+a+t;return(0,_.jsxs)("div",{className:p.wrapper,children:[(0,_.jsxs)("div",{className:p.wrapperJet,children:[(0,_.jsx)(d.Z,{onClick:function(){},imgJet:u.N[r].imgJet}),(0,_.jsxs)("div",{className:p.wrapperTypeJet,children:[(0,_.jsx)("p",{children:f(r)}),(0,_.jsxs)("p",{className:p.games,children:[n," games"]})]})]}),(0,_.jsxs)("div",{className:p.stats,children:[(0,_.jsxs)("p",{className:p.wins,children:[s,"W"]}),(0,_.jsxs)("p",{className:p.loses,children:[a,"L"]}),(0,_.jsxs)("p",{className:p.draws,children:[t,"D"]})]})]})},h="PageProfile_wrapper__7aR4d",g="PageProfile_card__4kIRb",j="PageProfile_wrapperJet__sBsft",x="PageProfile_backgroundHalf__Ma9dN",w="PageProfile_jet__lAbeZ",v="PageProfile_img__5HURZ",N="PageProfile_wrapperName__r9rWk",P="PageProfile_name__rHy3b",b="PageProfile_email__d3-Ja",y="PageProfile_btnLogout__9KF55",J="PageProfile_stats__85cp1",Z="PageProfile_wrapperWins__bWGwE",F="PageProfile_wrapperLoses__DROGV",k="PageProfile_wrapperDraws__AFbEd",C="PageProfile_wrapperMostPlayed__oDmCD",D="PageProfile_heading__5FDf2",L=function(e){return Object.entries(e).sort((function(e,r){return r[1].wins+r[1].loses+r[1].draws-(e[1].wins+e[1].loses+e[1].draws)}))},I=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],A=function(e){var r=new Date(e);return"Joined ".concat(r.getUTCDate()," ")+"".concat(I[r.getUTCMonth()]," ").concat(r.getUTCFullYear())},E=function(){console.log("I RENDERED");var e=(0,t.s0)(),r=(0,i.Z)(),s=r.status,d=r.data,p=r.run,f=(0,n.Z)(),I=f.account,E=f.logout,R=f.loading;(0,a.useLayoutEffect)((function(){I&&p(l.Z.getById(I.id))}),[I]);if(R)return(0,_.jsx)(o.Z,{});if("pending"===s||"idle"===s)return(0,_.jsx)(o.Z,{});if(!I)return(0,_.jsx)(c.default,{});var U=L(d.stats).slice(1,4);return(0,_.jsx)("main",{className:h,children:(0,_.jsxs)("div",{className:g,children:[(0,_.jsxs)("div",{className:j,children:[(0,_.jsx)("div",{className:x}),(0,_.jsx)("div",{className:w,children:(0,_.jsx)("img",{className:v,src:u.N[U[0][0]].imgJet,alt:"jet"})})]}),(0,_.jsxs)("section",{className:N,children:[(0,_.jsx)("h1",{className:P,children:d.userName}),(0,_.jsx)("p",{className:b,children:d.email}),(0,_.jsx)("p",{children:A(d.created)}),(0,_.jsx)("button",{className:y,onClick:function(){e("/"),E()},type:"button",children:"Log out"})]}),(0,_.jsxs)("section",{className:J,children:[(0,_.jsxs)("div",{className:Z,children:[(0,_.jsx)("p",{children:"Wins"}),(0,_.jsx)("p",{children:d.stats.total.wins})]}),(0,_.jsxs)("div",{className:F,children:[(0,_.jsx)("p",{children:"Loses"}),(0,_.jsx)("p",{children:d.stats.total.loses})]}),(0,_.jsxs)("div",{className:k,children:[(0,_.jsx)("p",{children:"Draws"}),(0,_.jsx)("p",{children:d.stats.total.draws})]})]}),(0,_.jsxs)("section",{className:C,children:[(0,_.jsx)("h2",{className:D,children:"Most played jets"}),U.map((function(e,r){return(0,_.jsx)(m,{typeJet:e[0],wins:e[1].wins,loses:e[1].loses,draws:e[1].draws},r)}))]})]})})}}}]);
//# sourceMappingURL=5.47061159.chunk.js.map