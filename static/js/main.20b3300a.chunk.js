(this["webpackJsonpdistribute-crap"]=this["webpackJsonpdistribute-crap"]||[]).push([[0],{20:function(e){e.exports=JSON.parse('["Lorraine","Dave","Paul","John","Jim","Steve"]')},59:function(e,t,a){e.exports=a(94)},94:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),o=a(10),c=a.n(o),i=a(35),l=a(21),s=a(114),m=a(31),u=a(117),d=a(118),p=a(119),h=a(120),f=a(130),g=a(121),E=a(122),y=a(129),b=a(123),v=a(124),x=a(128),C=a(125),k=a(126),S=a(127),N=a(50),w=a.n(N),O=a(51),j=a.n(O),I=a(44),J=a(20),R=Object(s.a)((function(e){return{listRoot:{width:"100%",maxWidth:360,backgroundColor:e.palette.background.paper,minWidth:"300px"},cardContent:{padding:"4px 16px"},card:{width:"max-content"},title:{margin:"1vh 0"},root:{display:"flex",alignItems:"center",flexDirection:"column",height:"100vh"},nameRoot:{display:"flex",flexDirection:"row",alignItems:"center"},winCount:{display:"inline-block",minWidth:"24px",marginRight:"6px",color:"grey",fontSize:"0.8rem"},cardActions:{justifyContent:"space-around",padding:"4px 8px 16px"},winTextRoot:{display:"flex",flexDirection:"column",alignItems:"center"},winnerRoot:{marginTop:"1vh"},hr:{padding:"0",margin:"0 auto",width:"90%",border:"0.5px solid lightgray"},dialogActions:{marginTop:"16px"},dialogContent:{width:"60vw",height:"20vh",display:"flex",flexDirection:"column",justifyContent:"space-evenly"},buttonsContainer:{marginBottom:"4px"}}}));function M(){var e=function(){return J.reduce((function(e,t){return e.push({name:t,count:0}),e}),[])},t=R(),a=r.a.useState(!1),n=Object(l.a)(a,2),o=n[0],c=n[1],s=r.a.useState(function(){var e=localStorage.getItem("sortaFairMode");return null===e?(localStorage.setItem("sortaFairMode",!1),!1):"true"===e}()),N=Object(l.a)(s,2),O=N[0],M=N[1],T=r.a.useState(Object(i.a)(J)),D=Object(l.a)(T,2),P=D[0],W=D[1],H=r.a.useState(""),A=Object(l.a)(H,2),F=A[0],B=A[1],L=r.a.useState((function(){var t=localStorage.getItem("checkedHistory");if(null===t){var a=e();return localStorage.setItem("checkedHistory",JSON.stringify(a)),a}return JSON.parse(t)})),z=Object(l.a)(L,2),_=z[0],q=z[1],G=r.a.useState(!1),K=Object(l.a)(G,2),Q=K[0],U=K[1],V=function(e){return function(){var t=P.indexOf(e),a=Object(i.a)(P);-1===t?a.push(e):a.splice(t,1),W(a)}},X=function(){c(!1)},Y=function(){M(!O),localStorage.setItem("sortaFairMode",(!O).toString())},Z=function(e){return _.find((function(t){return t.name===e}))},$=function(e){U(!0),Z(e).count+=1,q(_),localStorage.setItem("checkedHistory",JSON.stringify(_)),U(!1),B(e)};return r.a.createElement("div",{className:t.root},r.a.createElement(m.a,{className:t.title,variant:"h4"},"CrapDistributor v0.2"),r.a.createElement("div",{className:t.buttonsContainer},r.a.createElement(u.a,{onClick:function(){return window.open("https://github.com/sbeck14/crap-distributor","_blank")}},r.a.createElement(w.a,null)),r.a.createElement(u.a,{onClick:function(){c(!0)}},r.a.createElement(j.a,null))),r.a.createElement(d.a,{className:t.card},r.a.createElement(p.a,{className:t.cardContent},r.a.createElement(h.a,{dense:!0,className:t.listRoot},r.a.createElement(f.a,{key:"select-all"},r.a.createElement(g.a,{primary:"Contestants",primaryTypographyProps:{variant:"h5"}}),r.a.createElement(E.a,null,r.a.createElement(y.a,{edge:"end",onChange:function(){P.length===J.length?W([]):W(Object(i.a)(J))},checked:P.length===J.length,color:"primary"}))),r.a.createElement("hr",{className:t.hr}),J.map((function(e){var a="checkbox-list-secondary-label-".concat(e),n=r.a.createElement("div",{className:t.nameRoot},r.a.createElement("span",{className:t.winCount},Z(e).count),r.a.createElement("span",null,e));return r.a.createElement(f.a,{key:e,button:!0,onClick:V(e)},r.a.createElement(g.a,{id:a,primary:n,primaryTypographyProps:{variant:"h6"}}),r.a.createElement(E.a,null,r.a.createElement(y.a,{edge:"end",onChange:V(e),checked:-1!==P.indexOf(e),inputProps:{"aria-labelledby":a}})))})))),r.a.createElement(b.a,{className:t.cardActions},r.a.createElement(v.a,{disabled:P.length<2||Q,variant:"contained",color:"primary",onClick:function(){O?function(){var e=_.filter((function(e){return P.find((function(t){return t===e.name}))})).reduce((function(e,t){var a=e.findIndex((function(e){return e.count===t.count}));return-1===a?e.push({count:t.count,members:[t.name]}):e[a].members.push(t.name),e}),[]);e.sort((function(e,t){return t.count-e.count}));for(var t=[],a=function(a){e[a].members.forEach((function(e){for(var n=0;n<=a;n++)t.push(e)}))},n=0;n<e.length;n++)a(n);var r=t[t.length*Math.random()|0];$(r)}():function(){var e=P[P.length*Math.random()|0];$(e)}()}},"Pick a winner"),r.a.createElement(v.a,{disabled:Q,color:"secondary",onClick:function(){W([]),B("")}},"Clear"))),r.a.createElement("br",null),r.a.createElement("div",{className:t.winnerRoot},Q?r.a.createElement(I.ScaleLoader,null):""!==F?r.a.createElement("div",{className:t.winTextRoot},r.a.createElement(m.a,{variant:"h5"},"Winner:"),r.a.createElement(m.a,{variant:"h4"},F)):null),r.a.createElement(x.a,{open:o,onClose:X,maxWidth:"md"},r.a.createElement(C.a,{id:"form-dialog-title"},"Settings"),r.a.createElement(k.a,{className:t.dialogContent},r.a.createElement(h.a,null,r.a.createElement(f.a,{key:"fairMode",button:!0,onClick:Y},r.a.createElement(g.a,{id:"fairMode",primary:'"Fair" Mode',primaryTypographyProps:{variant:"subtitle1"}}),r.a.createElement(E.a,null,r.a.createElement(y.a,{edge:"end",onChange:Y,checked:O})))),r.a.createElement(v.a,{variant:"contained",onClick:function(){var t=e();localStorage.setItem("checkedHistory",JSON.stringify(t)),q(t)}},"Clear Winner History")),r.a.createElement(S.a,{className:t.dialogActions},r.a.createElement(v.a,{onClick:X,color:"primary"},"Close"))))}function T(){return r.a.createElement(M,null)}c.a.render(r.a.createElement(T,null),document.getElementById("root"))}},[[59,1,2]]]);
//# sourceMappingURL=main.20b3300a.chunk.js.map