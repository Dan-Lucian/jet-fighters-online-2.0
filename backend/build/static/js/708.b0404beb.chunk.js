"use strict";(self.webpackChunkjet_fighters_online_2_0=self.webpackChunkjet_fighters_online_2_0||[]).push([[708,486],{9486:function(e,n,r){r.r(n),r.d(n,{default:function(){return c}});var t=r(3504),s="PageNonexistent_wrapper__C-izW",a="PageNonexistent_link__hq7XP",o="PageNonexistent_text__7hUu3",i=r(184),c=function(){return(0,i.jsxs)("main",{className:s,children:[(0,i.jsx)("div",{className:o,children:"404 no page here"}),(0,i.jsx)(t.rU,{className:a,to:"/",children:"home"})]})}},4708:function(e,n,r){r.r(n),r.d(n,{default:function(){return V}});var t=r(885),s=r(8592),a=r(1413),o=r(2791),i=r(6871),c=r(7264),l=r(2142),u={joiner:{name:"_____ ",score:0},owner:{name:"_____ ",score:0},settings:{scoreMax:"0",widthMap:600,heightMap:300}},d=function(){var e=(0,i.TH)().state,n=(0,s.m)(),r=(0,t.Z)(n,2),d=r[0],f=r[1],m=(0,c.js)(),p=(0,t.Z)(m,2),v=p[0],_=p[1],w=(0,l.J)(),g=w.message,h=w.resetMessage,b=(0,i.s0)(),y=d.stateApp,x=g.event,j=g.stateGame||e||u,Z="countdown"===y,N="game"===y;return(0,o.useEffect)((function(){if(N&&"updateGame"===x&&console.log("EVENT: updateGame"),(N||Z)&&"quitJoiner"===x&&(console.log("EVENT: quitJoiner"),f((function(e){return(0,a.Z)((0,a.Z)({},e),{},{stateApp:"lobby",msgPopup:"".concat(v.nameJoiner," has quit/disconnected.")})})),_((function(e){return(0,a.Z)((0,a.Z)({},e),{},{nameJoiner:"Empty...",isConnectedJoiner:!1,isReadyJoiner:!1})})),h(),b("/lobby")),(N||Z)&&"quitOwner"===x&&(console.log("EVENT: quitOwner"),f((function(e){return(0,a.Z)((0,a.Z)({},e),{},{stateApp:"preLobby",msgPopup:"".concat(v.nameOwner," has quit/disconnected.")})})),_((0,a.Z)({},c._k)),h(),b("/")),N&&"gameOver"===x){console.log("EVENT: gameOver");var e=g.winner,n=g.winsOwner,r=g.winsJoiner;console.log("Winner: ",e),f((function(n){return(0,a.Z)((0,a.Z)({},n),{},{stateApp:"gameOver",winner:e})})),_((function(e){return(0,a.Z)((0,a.Z)({},e),{},{winsOwner:n,winsJoiner:r,isReadyOwner:!1,isReadyJoiner:!1})}))}}),[g]),j},f=function(e,n){var r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:window,t=(0,o.useRef)();(0,o.useEffect)((function(){console.log("effect runs"),t.current=n}),[n]),(0,o.useEffect)((function(){if(r&&r.addEventListener){var n=function(e){return t.current(e)};return console.log("".concat(e," event added")),r.addEventListener(e,n),function(){r.removeEventListener(e,n),console.log("".concat(e," event removed"))}}console.log("Element doesn't support addEventListener")}),[e,r])},m=function(){var e=(0,s.m)(),n=(0,t.Z)(e,1)[0],r=(0,l.J)().sendMessage,i=n.stateApp,c=n.isOwnerLobby,u="game"===i,d=(0,o.useCallback)((function(e){if(u){if(e.preventDefault(),e.repeat)return;var n={event:"input",isOwnerLobby:c};switch(e.key){case"ArrowRight":return void r((0,a.Z)((0,a.Z)({},n),{},{isPressedRight:!0}));case"ArrowLeft":return void r((0,a.Z)((0,a.Z)({},n),{},{isPressedLeft:!0}));case" ":r((0,a.Z)((0,a.Z)({},n),{},{isPressedFire:!0}))}}}),[c,u,r]),m=(0,o.useCallback)((function(e){if(u){if(e.preventDefault(),e.repeat)return;var n={event:"input",isOwnerLobby:c};switch(e.key){case"ArrowRight":return void r((0,a.Z)((0,a.Z)({},n),{},{isReleasedRight:!0}));case"ArrowLeft":r((0,a.Z)((0,a.Z)({},n),{},{isReleasedLeft:!0}))}}}),[c,u,r]);f("keydown",d),f("keyup",m)},p=r(9486),v=function(e,n,r){var t=n.scale,s=n.x,a=n.y,o=-(n.angle*Math.PI/180+Math.PI);e.setTransform(t,0,0,t,s,a),e.rotate(o),e.drawImage(r,-r.width/2,-r.height/2)},_=r(6080),w="Game_game__8rvLL",g="Game_wrapper__Lbmoa",h="Game_wrapperScores__k3d5k",b=r(184),y=function(e,n,r){!function(e){e.setTransform(1,0,0,1,0,0),e.clearRect(0,0,e.canvas.width,e.canvas.height)}(e),function(e,n){for(var r=n.owner,t=n.joiner,s=0;s<r.bullets.length;s+=1)e.fillStyle=r.bullets[s].color,e.fillRect(r.bullets[s].x,r.bullets[s].y,4,4);for(var a=0;a<t.bullets.length;a+=1)e.fillStyle=t.bullets[a].color,e.fillRect(t.bullets[a].x,t.bullets[a].y,4,4)}(e,n),function(e,n,r){var t=n.owner,s=n.joiner,a=r.imgJetOwner,o=r.imgJetJoiner;v(e,t,a),v(e,s,o)}(e,n,r)},x=function(e){var n=e.stateGame;console.log("Render: <Game />");var r=(0,o.useRef)(),t=(0,o.useRef)(null);(0,o.useEffect)((function(){if(n.settings.idLobby){var e=new Image;e.src=_.N[n.owner.typeJet].imgJet;var r=new Image;r.src=_.N[n.joiner.typeJet].imgJet,t.current={imgJetOwner:e,imgJetJoiner:r}}}),[]),(0,o.useEffect)((function(){if(n.settings.idLobby){var e,s=r.current.getContext("2d");return function r(){y(s,n,t.current),e=requestAnimationFrame(r)}(),function(){cancelAnimationFrame(e)}}}));var s=n.settings,a=s.widthMap,i=s.heightMap;return(0,b.jsxs)("div",{className:g,children:[(0,b.jsx)("canvas",{ref:r,width:a,height:i,className:w,children:"Game screen"}),(0,b.jsxs)("div",{className:h,children:[(0,b.jsx)("div",{style:{color:n.owner.color},children:n.owner.score}),(0,b.jsx)("div",{style:{color:n.joiner.color},children:n.joiner.score})]})]})},j="Header_header__ldbyd",Z=function(e){var n=e.text;return(0,b.jsx)("h2",{className:j,children:n})},N="Player_wrapper__n4edA",E="Player_name__8pYnT",J="Player_ball__VKkU3",L="Player_jetType__MJuvK",O="Player_wrapperColor__HId0W",P="Player_textColor__1K3tt",G="Player_squareColor__o7tJg",A=function(e){var n=e.player,r=n.name,t=n.score,s=n.typeJet;return(0,b.jsxs)("div",{className:N,children:[(0,b.jsx)("div",{className:J}),(0,b.jsxs)("p",{className:E,children:[r,": ",t]}),(0,b.jsxs)("p",{className:L,children:["Jet type: ",s]}),(0,b.jsxs)("div",{className:O,children:[(0,b.jsx)("p",{className:P,children:"Color:"}),(0,b.jsx)("div",{style:{backgroundColor:n.color},className:G})]})]})},k="TablePlayers_table__MmT9u",R=function(e){var n=e.stateGame,r=n.owner,t=n.joiner,s=n.settings.scoreMax;return(0,b.jsxs)("div",{className:k,children:[(0,b.jsx)(Z,{text:"Max score: ".concat(s)}),(0,b.jsx)(A,{player:r}),(0,b.jsx)(A,{player:t})]})},C={wrapper:"Countdown_wrapper__b27ED"},M=function(e){var n=e.handleCountownEnd,r=(0,o.useState)(3),s=(0,t.Z)(r,2),a=s[0],i=s[1];return(0,o.useEffect)((function(){var e=setInterval((function(){i((function(e){return e-1}))}),1e3);return function(){clearInterval(e)}}),[]),(0,o.useLayoutEffect)((function(){a<1&&n()})),(0,b.jsx)("div",{className:C.wrapper,children:(0,b.jsx)("div",{className:C.count,children:a})})},T="GameOver_wrapper__c3ItD",I=function(e){var n=e.winner,r=e.isOwnerLobby,t=e.handleGameOverEnd;console.log(n,r,t),(0,o.useEffect)((function(){var e=setTimeout((function(){t()}),3e3);return function(){clearInterval(e),t()}}),[t]);var s="joiner"===n?"You Win":"You Lose";return r&&(s="owner"===n?"You Win":"You Lose"),"draw"===n&&(s="It's a draw"),(0,b.jsx)("div",{className:T,children:s})},q="Overlay_wrapper__BWZYG",W=function(){var e=(0,s.m)(),n=(0,t.Z)(e,2),r=n[0],o=n[1],u=(0,c.js)(),d=(0,t.Z)(u,1)[0],f=(0,l.J)().sendMessage,m=(0,i.s0)(),p=r.stateApp,v=r.isOwnerLobby,_=r.winner,w=d.idLobby,g="countdown"===p,h="gameOver"===p;return(0,b.jsxs)("div",{className:q,children:[g&&(0,b.jsx)(M,{handleCountownEnd:function(){if(v)return f({event:"countdownEnd",idLobby:w}),void o((function(e){return(0,a.Z)((0,a.Z)({},e),{},{stateApp:"game"})}));o((function(e){return(0,a.Z)((0,a.Z)({},e),{},{stateApp:"game"})}))}}),h&&(0,b.jsx)(I,{winner:_,isOwnerLobby:v,handleGameOverEnd:function(){o((function(e){return(0,a.Z)((0,a.Z)({},e),{},{stateApp:"lobby"})})),m("/lobby")}})]})},Y="PageGame_pageGame__4pe1X",V=function(){var e=(0,s.m)(),n=(0,t.Z)(e,1)[0],r=d();m();var a=n.stateApp;return a&&"lobby"!==a&&"preLobby"!==a?(0,b.jsxs)("main",{className:Y,children:[(0,b.jsx)(x,{stateGame:r}),(0,b.jsx)(R,{stateGame:r}),(0,b.jsx)(W,{})]}):(0,b.jsx)(p.default,{})}}}]);
//# sourceMappingURL=708.b0404beb.chunk.js.map