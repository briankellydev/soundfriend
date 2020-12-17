(this.webpackJsonpsoundfriend=this.webpackJsonpsoundfriend||[]).push([[2],{114:function(e,t,n){},115:function(e,t,n){},151:function(e,t,n){},152:function(e,t,n){},153:function(e,t,n){},161:function(e,t,n){"use strict";n.r(t);var c=n(7),i=n(0),a=n.n(i),o=n(13),l=n.n(o),r=(n(114),n(115),n(116),n(164),n(119),n(163),n(22)),s=n(23),j=n(94),d=n.n(j);var u=function(e){var t=e.fileName,n=e.playing,a=e.volume,o=Object(i.createRef)();return Object(i.useEffect)((function(){o.current.pause(),o.current.load()}),[t,o]),Object(i.useEffect)((function(){n?o.current.play():o.current.pause(),o.current.volume=a}),[n,o,a]),Object(c.jsx)("audio",{ref:o,loop:!0,children:Object(c.jsx)("source",{src:t+".mp3",type:"audio/mpeg"})})},b=n(199),O=n(200),f=n(201),p=n(202),h=n(100),x=n(198);n(151);var v=function(e){var t=e.option;return Object(c.jsx)("div",{children:t.replace(".mp3","")})},m=(n(152),n(99)),g=n.n(m),C=n(206),k=n(194),y=n(195),S=n(196),N=n(204),w=n(197),D=n(203);n(153);var E=function(e){var t=e.handleClose,n=e.open,a=e.isAdmin,o=Object(i.useState)(""),l=Object(s.a)(o,2),j=l[0],d=l[1],u=Object(i.useState)(""),b=Object(s.a)(u,2),O=b[0],f=b[1],p=Object(i.useState)(0),h=Object(s.a)(p,2),v=h[0],m=h[1],g=Object(i.useState)(!1),E=Object(s.a)(g,2),I=E[0],P=E[1],A=Object(r.c)(),L=Object(r.g)(),F=Object(r.d)().firestore().collection("songs");return Object(c.jsxs)(C.a,{onClose:t,"aria-labelledby":"simple-dialog-title",open:n,children:[Object(c.jsx)(k.a,{id:"simple-dialog-title",children:"Settings"}),Object(c.jsx)(y.a,{children:Object(c.jsxs)("div",{className:"dialogWrapper",children:[Object(c.jsx)("div",{className:"field",children:Object(c.jsx)(S.a,{position:"static",children:Object(c.jsxs)(N.a,{value:v,onChange:function(e,t){m(t)},"aria-label":"simple tabs example",children:[Object(c.jsx)(w.a,{label:"Login"}),a&&Object(c.jsx)(w.a,{label:"Upload"})]})})}),0===v&&Object(c.jsxs)(c.Fragment,{children:[Object(c.jsx)("div",{className:"field",children:Object(c.jsx)(D.a,{required:!0,label:"E-Mail",value:j,onChange:function(e){return d(e.target.value)}})}),Object(c.jsx)("div",{className:"field",children:Object(c.jsx)(D.a,{required:!0,label:"Password",type:"password",value:O,onChange:function(e){return f(e.target.value)}})}),Object(c.jsxs)("div",{className:"field",children:[Object(c.jsx)(x.a,{variant:"outlined",color:"primary",disabled:!j||!O||I,onClick:function(){P(!0),A.signInWithEmailAndPassword(j,O).then((function(){P(!1),t()}))},children:"Login"}),Object(c.jsx)(x.a,{variant:"outlined",color:"secondary",disabled:I,onClick:function(){P(!0),A.signOut().then((function(){P(!1),t()}))},children:"Logout"})]})]}),1===v&&a&&Object(c.jsx)("input",{type:"file",accept:".mp3",onChange:function(e){P(!0),L.ref().child(e.target.files[0].name).put(e.target.files[0]).then((function(){F.add({title:e.target.files[0].name}).then((function(){P(!1),t()}))}))},disabled:I})]})})]})},I=window.location.hostname,P=d()(I);var A=function(e){var t,n=Object(i.useState)(!1),a=Object(s.a)(n,2),o=a[0],l=a[1],j=Object(i.useState)(""),d=Object(s.a)(j,2),m=d[0],C=d[1],k=Object(i.useState)(""),y=Object(s.a)(k,2),S=y[0],N=y[1],w=Object(i.useState)(0),D=Object(s.a)(w,2),I=D[0],A=D[1],L=Object(i.useState)(.25),F=Object(s.a)(L,2),U=F[0],B=F[1],J=Object(i.useState)(!1),q=Object(s.a)(J,2),M=q[0],T=q[1],W=Object(i.useState)(!1),z=Object(s.a)(W,2),K=z[0],Q=z[1],R=Object(r.d)(),_=R.firestore().collection("songs"),H=Object(r.e)(_,{initialData:[]}),V=Object(r.g)(),Z=Object(r.c)(),G=R.firestore().collection("users").doc(null===(t=Z.currentUser)||void 0===t?void 0:t.uid),X=Object(r.f)(G).data,Y=null===X||void 0===X?void 0:X.isAdmin;function $(){P.emit("stopSong")}function ee(e){P.emit("changeVolume",e)}return Object(i.useEffect)((function(){P.on("userChange",(function(e){A(e)})),P.on("play",(function(e){C(e),l(!0)})),P.on("stop",(function(){l(!1)})),P.on("volume",(function(e){B(e)}))}),[]),Object(c.jsxs)("div",{className:"appWrapper",children:[M?Object(c.jsxs)(b.a,{children:[Object(c.jsx)(O.a,{title:"DnD Jukebox",subheader:"Total Users: "+I,action:Object(c.jsx)(f.a,{onClick:function(){Q(!0)},children:Object(c.jsx)(g.a,{})})}),Object(c.jsxs)(p.a,{children:[Object(c.jsx)(r.a,{fallback:Object(c.jsx)(h.a,{className:"paper",elevation:3,children:"Please log in at the top right"})}),Y?Object(c.jsx)("div",{className:"controls",children:Object(c.jsxs)(h.a,{className:"paper",elevation:3,children:[Object(c.jsx)(x.a,{variant:"outlined",color:"primary",onClick:function(){P.emit("playSong",m)},disabled:!m,children:"Play"}),Object(c.jsx)(x.a,{variant:"outlined",color:"secondary",onClick:$,disabled:!m,children:"Stop"}),Object(c.jsx)(x.a,{variant:"outlined",color:"default",onClick:function(){return ee(.1)},children:"10%"}),Object(c.jsx)(x.a,{variant:"outlined",color:"default",onClick:function(){return ee(.25)},children:"25%"}),Object(c.jsx)(x.a,{variant:"outlined",color:"default",onClick:function(){return ee(.5)},children:"50%"}),Object(c.jsx)(x.a,{variant:"outlined",color:"default",onClick:function(){return ee(.75)},children:"75%"}),Object(c.jsx)(x.a,{variant:"outlined",color:"default",onClick:function(){return ee(1)},children:"100%"})]})}):Object(c.jsx)("div",{className:"controls",children:Object(c.jsx)(h.a,{className:"paper",elevation:3,children:Object(c.jsx)(x.a,{variant:"outlined",color:"secondary",onClick:function(){l(!1)},children:"Emergency Stop"})})}),Object(c.jsx)(h.a,{className:"paper",elevation:3,children:H.data.map((function(e){return Object(c.jsx)("div",{className:m===e.title?"option active":"option",onClick:function(){return t=e.title,void(Y&&($(),C(t),V.ref().child(t).getDownloadURL().then((function(e){N(e)}))));var t},children:Object(c.jsx)(v,{option:e.title})},"option"+e.title)}))}),Object(c.jsx)(r.a,{fallback:null,children:Object(c.jsx)(u,{playing:o,fileName:S,volume:U})})]})]}):Object(c.jsxs)(b.a,{children:[Object(c.jsx)(O.a,{title:"DnD Jukebox"}),Object(c.jsx)(p.a,{children:Object(c.jsx)("div",{className:"center",children:Object(c.jsx)(x.a,{variant:"outlined",color:"primary",onClick:function(){T(!0)},children:"Click me to begin!"})})})]}),Object(c.jsx)(E,{open:K,handleClose:function(){Q(!1)},isAdmin:Y})]})},L={apiKey:"AIzaSyAq3kbp7cnn-spQ4_vBbKczj9UeH_tMZPQ",authDomain:"soundfriend-529f7.firebaseapp.com",projectId:"soundfriend-529f7",storageBucket:"soundfriend-529f7.appspot.com",messagingSenderId:"318889120890",appId:"1:318889120890:web:077c03ecf7c6f86c7457c3"};var F=function(){return Object(c.jsx)(r.b,{firebaseConfig:L,children:Object(c.jsx)(A,{})})},U=function(e){e&&e instanceof Function&&n.e(9).then(n.bind(null,210)).then((function(t){var n=t.getCLS,c=t.getFID,i=t.getFCP,a=t.getLCP,o=t.getTTFB;n(e),c(e),i(e),a(e),o(e)}))};l.a.render(Object(c.jsx)(a.a.StrictMode,{children:Object(c.jsx)(F,{})}),document.getElementById("root")),U()}},[[161,3,4]]]);
//# sourceMappingURL=main.2c71140a.chunk.js.map