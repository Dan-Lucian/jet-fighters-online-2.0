"use strict";(self.webpackChunkjet_fighters_online_2_0=self.webpackChunkjet_fighters_online_2_0||[]).push([[360],{9360:function(e,n,t){t.r(n),t.d(n,{default:function(){return M}});var s=t(885),o=t(7264),a=t(1413),r=t(2791),i=t(6871),b=t(8592),c=t(3232),u=t(2142),d=function(){var e=(0,b.m)(),n=(0,s.Z)(e,2),t=n[0],d=t.stateApp,l=t.isOwnerLobby,y=n[1],_=(0,c.v)(),p=(0,s.Z)(_,1)[0],f=(0,o.js)(),m=(0,s.Z)(f,2),Z=m[0],j=m[1],w=(0,u.J)(),L=w.message,g=w.sendMessage,h=w.resetMessage,v=(0,i.s0)(),x=Z.idLobby,J=Z.isReadyOwner,R=Z.isReadyJoiner,N=L.event,O=L.success,T="lobby"===d;(0,r.useLayoutEffect)((function(){if(T&&"updateLobby"===N&&(console.log("EVENT: updateLobby"),j(L.lobby),h()),T&&O&&"join"===N){console.log("EVENT: join");var e=L.idLobby,n=L.nameOwner,t=L.nameJoiner;j((function(s){var o=(0,a.Z)((0,a.Z)({},s),{},{idLobby:e,nameOwner:n,nameJoiner:t,isConnectedJoiner:!0});return g({event:"updateLobby",lobby:o}),o})),h()}if(T&&"quitJoiner"===N&&(console.log("EVENT: quitJoiner"),j((function(e){return(0,a.Z)((0,a.Z)({},e),{},{nameJoiner:"Empty...",isConnectedJoiner:!1,isReadyJoiner:!1,winsOwner:0,winsJoiner:0})})),y((function(e){return(0,a.Z)((0,a.Z)({},e),{},{msgPopup:"".concat(Z.nameJoiner," has quit/disconnected.")})})),h()),T&&"quitOwner"===N&&(console.log("EVENT: quitOwner"),y((function(e){return(0,a.Z)((0,a.Z)({},e),{},{stateApp:"preLobby",msgPopup:"".concat(Z.nameOwner," has quit/disconnected.")})})),j((0,a.Z)({},o._k)),h(),v("/")),T&&"requestReady"===N&&(console.log("EVENT: requestReady"),g({event:"responseReady",isReady:J&&R,idLobby:x,settings:p,isOwnerLobby:l}),h()),T&&"start"===N){console.log("EVENT: start");var s=L.stateGame;y((function(e){return(0,a.Z)((0,a.Z)({},e),{},{stateApp:"countdown"})})),h(),v("/game",{state:s})}}),[L])},l=function(){var e=(0,b.m)(),n=(0,s.Z)(e,1)[0],t=n.stateApp,i=n.isOwnerLobby,c=(0,o.js)(),d=(0,s.Z)(c,2)[1],l=(0,u.J)().sendMessage,y="lobby"===t;(0,r.useEffect)((function(){return i&&y?function(){d((function(e){var n=(0,a.Z)((0,a.Z)({},e),{},{isReadyOwner:!1});return l({event:"updateLobby",lobby:(0,a.Z)({},n)}),n}))}:y?function(){d((function(e){var n=(0,a.Z)((0,a.Z)({},e),{},{isReadyJoiner:!1});return l({event:"updateLobby",lobby:(0,a.Z)({},n)}),n}))}:void 0}),[i,y,l,d,t])},y="IdLobby_wrapper__1Zd3Y",_="IdLobby_title__lZaVh",p="IdLobby_btn__bPTej",f=t(184),m=function(e){var n=e.idLobby,t=(0,r.useState)(),o=(0,s.Z)(t,2),a=o[0],i=o[1];return(0,f.jsx)("div",{className:y,children:(0,f.jsxs)("h2",{className:_,children:["Lobby ID:"," ",(0,f.jsxs)("button",{onClick:a?null:function(){navigator.clipboard.writeText(n),i(!0),setTimeout((function(){i(!1)}),1500)},className:p,type:"button",children:[a&&"Copied",!a&&n]})]})})},Z="TablePlayers_table__kxReK",j="TablePlayers_textLight__DbHJC",w="TablePlayers_name__EMRbZ",L="TablePlayers_score__3gCPM",g="TablePlayers_ready__KRy62",h="TablePlayers_bgGreen__2FMj2",v="TablePlayers_bgRed__6iuBj",x="TablePlayers_textGreen__b6KIi",J="TablePlayers_textRed__tIlsj",R=function(e){return e?"".concat(w," ").concat(x):"".concat(w," ").concat(J)},N=function(e){return e?"".concat(g," ").concat(h):"".concat(g," ").concat(v)},O=function(){var e=(0,o.js)(),n=(0,s.Z)(e,1)[0],t=n.isConnectedOwner,a=n.nameOwner,r=n.winsOwner,i=n.isReadyOwner,b=n.isConnectedJoiner,c=n.nameJoiner,u=n.isReadyJoiner,d=n.winsJoiner;return(0,f.jsx)("table",{className:Z,children:(0,f.jsxs)("tbody",{children:[(0,f.jsxs)("tr",{children:[(0,f.jsxs)("td",{className:R(t),children:[a,(0,f.jsx)("span",{className:j,children:" (owner)"})]}),(0,f.jsx)("td",{className:L,children:r}),(0,f.jsx)("td",{className:N(i),children:"ready"})]}),(0,f.jsxs)("tr",{children:[(0,f.jsx)("td",{className:R(b),children:c}),(0,f.jsx)("td",{className:L,children:d}),(0,f.jsx)("td",{className:N(u),children:"ready"})]})]})})},T="BtnReady_btn__esHwX",E=function(){var e=(0,b.m)(),n=(0,s.Z)(e,1)[0],t=(0,o.js)(),r=(0,s.Z)(t,1)[0],i=(0,u.J)().sendMessage,c=n.stateApp,d=n.isOwnerLobby,l=r.isReadyOwner,y=r.isReadyJoiner,_="lobby"===c;return(0,f.jsx)("button",{disabled:!_,onClick:d&&_?function(){i({event:"updateLobby",lobby:(0,a.Z)((0,a.Z)({},r),{},{isReadyOwner:!l})})}:_?function(){return i({event:"updateLobby",lobby:(0,a.Z)((0,a.Z)({},r),{},{isReadyJoiner:!y})})}:function(){return console.log("updateLobby denial because needed stateApp=lobby but stateApp=".concat(c))},className:T,type:"button",children:"I'm ready"})},A="BtnStart_btn__gnzfS",P=function(){var e=(0,b.m)(),n=(0,s.Z)(e,1)[0].stateApp,t=(0,o.js)(),a=(0,s.Z)(t,1)[0],r=a.isReadyOwner,i=a.isReadyJoiner,c="lobby"===n,u=r&&i;return(0,f.jsx)("input",{disabled:!c||!u,className:A,type:"submit",value:"START",form:"form-settings-game"})},C="BtnQuit_btn__80rdu",k=function(){var e=(0,i.s0)(),n=(0,b.m)(),t=(0,s.Z)(n,2),r=t[0],c=r.stateApp,d=r.isOwnerLobby,l=t[1],y=(0,o.js)(),_=(0,s.Z)(y,2),p=_[0].idLobby,m=_[1],Z=(0,u.J)().sendMessage,j="lobby"===c;return(0,f.jsx)("button",{disabled:!j,onClick:j?function(){Z({event:"quitLobby",idLobby:p,isOwnerLobby:d}),l((function(e){return(0,a.Z)((0,a.Z)({},e),{},{stateApp:"preLobby"})})),m((0,a.Z)({},o._k)),e("/")}:function(){return console.log("quit denial because needed stateApp=lobby but stateApp=".concat(c))},className:C,type:"button",children:"Quit lobby"})},q="Lobby_wrapper__uf7hD",M=function(){d(),l();var e=(0,o.js)(),n=(0,s.Z)(e,1)[0].idLobby;return(0,f.jsxs)("div",{className:q,children:[(0,f.jsx)(m,{idLobby:n}),(0,f.jsx)(O,{}),(0,f.jsx)(k,{}),(0,f.jsx)(E,{}),(0,f.jsx)(P,{})]})}}}]);
//# sourceMappingURL=360.0eda1d8c.chunk.js.map