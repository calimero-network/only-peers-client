(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[687],{3073:function(e,t,a){(window.__NEXT_P=window.__NEXT_P||[]).push(["/post/[id]",function(){return a(2020)}])},8271:function(e,t,a){"use strict";a.d(t,{v:function(){return p}}),(r=s||(s={})).CREATE_COMMENT="create_comment",r.POST="post",r.CREATE_POST="create_post",r.POSTS="posts";var n,r,s,l,i=a(6960),o=a(1189),c=a(2216),d=a(1565),u=a.n(d);async function x(e){let t=await m();if(!t)return null;let a=new TextEncoder().encode(e),n=u().encode(t.public.bytes),r=await crypto.subtle.digest("SHA-256",a),s=new Uint8Array(r),l=await t.sign(s);return{wallet_type:"NEAR",signing_key:n,signature:u().encode(l),challenge:u().encode(s)}}async function m(){try{let e=(0,o.Uw)();if(!e)return null;return await (0,c.r3)(u().decode(e.privateKey))}catch(e){return console.error("Error extracting private key:",e),null}}function h(){return new i.d("http://localhost:2428","/jsonrpc")}(n=l||(l={})).NEAR="NEAR",n.ETH="ETH";let f="5d77b7852d5c2fa9483ece70ada7e3cc7d2a9df5aa056d3916103dbe783df6e2";class p{async fetchFeed(e){var t,a;let n=await x(JSON.stringify(e));return{data:null!==(a=null===(t=(await h().query({applicationId:f,method:s.POSTS,argsJson:e},{headers:n})).result)||void 0===t?void 0:t.output)&&void 0!==a?a:[],error:null}}async fetchPost(e){var t;let a=await x(JSON.stringify(e)),n=await h().query({applicationId:f,method:s.POST,argsJson:e},{headers:a});return{data:null==n?void 0:null===(t=n.result)||void 0===t?void 0:t.output,error:null}}async createPost(e){var t;let a=await x(JSON.stringify(e)),n=await h().mutate({applicationId:f,method:s.CREATE_POST,argsJson:e},{headers:a});return{data:null==n?void 0:null===(t=n.result)||void 0===t?void 0:t.output,error:null}}async createComment(e){var t;let a=await x(JSON.stringify(e)),n=await h().mutate({applicationId:f,method:s.CREATE_COMMENT,argsJson:e},{headers:a});return{data:null==n?void 0:null===(t=n.result)||void 0===t?void 0:t.output,error:null}}}},1195:function(e,t,a){"use strict";a.d(t,{Z:function(){return r}});var n=a(2676);function r(e){let{title:t,onClick:a,backgroundColor:r,backgroundColorHover:s,disabled:l=!1}=e;return(0,n.jsx)("button",{className:"border-[1px] ".concat(r," ").concat(s," rounded-lg w-fit \n  px-4 py-1 text-white cusor-pointer font-light cursor-pointer text-sm"),onClick:()=>a(),disabled:l,children:t})}},3629:function(e,t,a){"use strict";a.d(t,{Z:function(){return u}});var n=a(2676),r=a(5271),s=a(3001),l=a(279),i=a(5040),o=a(5142),c=a(1986),d=a(1195);function u(e){let t=c.zs,[a,u]=(0,r.useState)(!0),x=(0,o.useRouter)();return(0,n.jsx)(s.u.Root,{show:a,as:r.Fragment,children:(0,n.jsxs)(l.V,{as:"div",className:"relative z-10",onClose:u,children:[(0,n.jsx)(s.u.Child,{as:r.Fragment,enter:"ease-out duration-300",enterFrom:"opacity-0",enterTo:"opacity-100",leave:"ease-in duration-200",leaveFrom:"opacity-100",leaveTo:"opacity-0",children:(0,n.jsx)("div",{className:"fixed inset-0 bg-black bg-opacity-75 transition-opacity"})}),(0,n.jsx)("div",{className:"fixed inset-0 z-10 w-screen overflow-y-auto",children:(0,n.jsx)("div",{className:"flex min-h-full items-center justify-center p-4 text-center",children:(0,n.jsx)(s.u.Child,{as:r.Fragment,enter:"ease-out duration-300",enterFrom:"opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95",enterTo:"opacity-100 translate-y-0 sm:scale-100",leave:"ease-in duration-200",leaveFrom:"opacity-100 translate-y-0 sm:scale-100",leaveTo:"opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95",children:(0,n.jsxs)(l.V.Panel,{className:"relative max-w-[450px] transform overflow-hidden rounded-lg bg-[#1c2123] px-4 pb-4 pt-5 text-left shadow-xl transition-all",children:[(0,n.jsxs)("div",{children:[(0,n.jsx)("div",{className:"mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-[#B67352]",children:(0,n.jsx)(i.Z,{className:"h-6 w-6 text-[#ECB159]","aria-hidden":"true"})}),(0,n.jsxs)("div",{className:"mt-3 text-center",children:[(0,n.jsx)(l.V.Title,{as:"h3",className:"text-base font-semibold leading-6 text-white",children:t.dialogTitle}),(0,n.jsx)("div",{className:"mt-2flex justify-center items-center",children:(0,n.jsx)("p",{className:"text-sm text-white w-full",children:e.error})})]})]}),(0,n.jsx)("div",{className:"mt-5 flex justify-center",children:(0,n.jsx)(d.Z,{title:t.reloadButtonText,backgroundColor:"bg-[#B67352]",backgroundColorHover:"",onClick:()=>x.reload()})})]})})})})]})})}},1884:function(e,t,a){"use strict";a.d(t,{Z:function(){return u}});var n=a(2676),r=a(5271),s=a(6091),l=a.n(s),i=a(1986),o=a(5142),c=a(520),d=a(1189);function u(){let e=i.Fs,t=(0,o.useRouter)(),[a,s]=(0,r.useState)((0,d.Uw)()),[u,x]=(0,r.useState)("");return(0,r.useEffect)(()=>{let e=async()=>{x(await (0,c.O)())};a&&e()},[a]),(0,n.jsx)("header",{className:"border-b-2 border-[#1c2123] mx-10",children:(0,n.jsxs)("nav",{className:"mx-auto flex items-center justify-between p-4","aria-label":"Global",children:[(0,n.jsx)("div",{className:"flex lg:flex-1",children:(0,n.jsxs)(l(),{href:"/",className:"-m-1.5 p-1.5 flex justify-center items-center",children:[(0,n.jsxs)("svg",{viewBox:"-20.62 0.53 820.42 555.49",xmlns:"http://www.w3.org/2000/svg",width:"40",height:"36",children:[(0,n.jsx)("path",{d:"M266.82.53c35 0 69.65 6.91 101.98 20.34s61.71 33.11 86.45 57.93c24.75 24.81 44.37 54.27 57.77 86.7a267.919 267.919 0 0 1 20.29 102.27c0 108.09-64.93 205.53-164.51 246.89s-214.2 18.5-290.41-57.93C2.18 380.3-20.62 265.36 20.62 165.5 61.87 65.64 159.04.53 266.82.53zm0 347.4c10.5.01 20.9-2.05 30.61-6.07s18.52-9.93 25.95-17.38 13.31-16.29 17.33-26.02a80.365 80.365 0 0 0 6.06-30.7c0-32.43-19.48-61.66-49.35-74.07s-64.26-5.55-87.12 17.38-29.7 57.41-17.33 87.37 41.53 49.49 73.86 49.49z",fill:"#ECB159"}),(0,n.jsx)("path",{d:"M566.35 200.96c67.71 19.54 147.63 0 147.63 0-23.19 101.55-96.75 165.15-202.81 172.89a266.766 266.766 0 0 1-40.48 65.86 266.208 266.208 0 0 1-57.62 51.43c-21.6 14.24-45.15 25.25-69.92 32.68s-50.48 11.19-76.33 11.18l79.95-254.81C428.95 18.28 471.08.54 665.98.54H799.8c-22.38 98.88-99.54 174.41-233.44 200.42z",fill:"#B67352"})]}),(0,n.jsx)("div",{className:"text-white text-xl font-bold font-serif",children:e.logoText})]})}),(0,n.jsx)("div",{className:"flex flex-1 justify-end items-center gap-2",children:u&&(0,n.jsxs)("div",{className:"text-sm font-semibold leading-6 text-white cursor-pointer",children:[e.peerIdText,":"," ",(0,n.jsx)("span",{className:"text-purple-500 pl-1",onClick:function(){(0,d.J9)(),(0,d.f_)(),t.reload()},children:"".concat(u.slice(0,4).toLocaleLowerCase(),"...").concat(u.slice(u.length-4,u.length).toLocaleLowerCase())})]})})]})})}},9259:function(e,t,a){"use strict";a.d(t,{Z:function(){return s}});var n=a(2676),r=a(1986);function s(){let e=r._m;return(0,n.jsxs)("div",{role:"status",className:"flex w-full justify-center items-center",children:[(0,n.jsxs)("svg",{"aria-hidden":"true",className:"w-10 h-10 text-[#B67352] animate-spin dark:text-gray-600 fill-[#ECB159]",viewBox:"0 0 100 101",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:[(0,n.jsx)("path",{d:"M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z",fill:"currentColor"}),(0,n.jsx)("path",{d:"M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z",fill:"currentFill"})]}),(0,n.jsx)("span",{className:"sr-only",children:e.srOnlyText})]})}},520:function(e,t,a){"use strict";a.d(t,{O:function(){return s}});var n=a(302),r=a(1189);async function s(){let e=(0,r.Uw)();if(!e)return"";let t=Uint8Array.from(Array.from(e.publicKey).map(e=>e.charCodeAt(0)));return(await (0,n.y5)(t)).toString()}},2020:function(e,t,a){"use strict";a.r(t),a.d(t,{default:function(){return j}});var n=a(2676),r=a(1884),s=a(4207),l=a(5271);let i=l.forwardRef(function({title:e,titleId:t,...a},n){return l.createElement("svg",Object.assign({xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",fill:"currentColor","aria-hidden":"true","data-slot":"icon",ref:n,"aria-labelledby":t},a),e?l.createElement("title",{id:t},e):null,l.createElement("path",{fillRule:"evenodd",d:"M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z",clipRule:"evenodd"}))});function o(e){let{commentItem:t}=e;return(0,n.jsxs)("div",{className:"mt-2 mb-2 flex flex-col",children:[(0,n.jsxs)("div",{className:"flex items-center gap-2",children:[(0,n.jsx)(i,{className:"w-6 h-6 rounded-full text-white border-[1px] border-white px-1"}),(0,n.jsx)("div",{className:"text-white",children:t.user})]}),(0,n.jsx)("div",{className:"text-white font-light text-sm pl-4 pt-2",children:t.text})]})}var c=a(3001),d=a(279),u=a(9259),x=a(1986),m=a(1195);function h(e){let{createComment:t,open:a,setOpen:r}=e,s=x.NH,[i,o]=(0,l.useState)(""),[h,f]=(0,l.useState)(!1);return(0,n.jsx)(c.u.Root,{show:a,as:l.Fragment,children:(0,n.jsxs)(d.V,{as:"div",className:"relative z-10",onClose:r,children:[(0,n.jsx)(c.u.Child,{as:l.Fragment,enter:"ease-out duration-300",enterFrom:"opacity-0",enterTo:"opacity-100",leave:"ease-in duration-200",leaveFrom:"opacity-100",leaveTo:"opacity-0",children:(0,n.jsx)("div",{className:"fixed inset-0 bg-black bg-opacity-70 transition-opacity"})}),(0,n.jsx)("div",{className:"fixed inset-0 z-10 w-screen overflow-y-auto",children:(0,n.jsx)("div",{className:"flex min-h-full items-center justify-center p-4 text-center",children:(0,n.jsx)(c.u.Child,{as:l.Fragment,enter:"ease-out duration-300",enterFrom:"opacity-0 translate-y-4",enterTo:"opacity-100 translate-y-0",leave:"ease-in duration-200",leaveFrom:"opacity-100 translate-y-0",leaveTo:"opacity-0 translate-y-4",children:(0,n.jsx)(d.V.Panel,{className:"relative transform overflow-hidden rounded-lg bg-[#1c2123] px-4 pb-4 pt-5 text-left shadow-xl transition-all",children:h?(0,n.jsxs)("div",{children:[(0,n.jsx)("div",{className:"text-lg font-semibold leading-6 text-white text-center pb-4",children:s.loadingText}),(0,n.jsx)(u.Z,{})]}):(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)("div",{children:(0,n.jsxs)("div",{className:"text-center",children:[(0,n.jsx)(d.V.Title,{as:"h3",className:"text-lg font-semibold leading-6 text-white",children:s.dialogTitle}),(0,n.jsx)("label",{className:"block mb-2 mt-2 text-white text-start",children:s.inputLabel}),(0,n.jsxs)("div",{className:"relative",children:[(0,n.jsx)("textarea",{className:"w-72 px-3 py-2 rounded-md resize-none outline-none bg-black text-white",rows:6,value:i,onChange:e=>o(e.target.value),placeholder:s.inputPlaceholder}),(0,n.jsxs)("div",{className:"text-gray-500 text-sm absolute bottom-2 right-2",children:[i.length,"/250"]})]})]})}),(0,n.jsxs)("div",{className:"flex justify-between items-center mt-2",children:[(0,n.jsx)(m.Z,{title:s.cancelButtonText,backgroundColor:"bg-[#B67352]",backgroundColorHover:"",onClick:()=>r(!1)}),(0,n.jsx)(m.Z,{title:s.createButtonText,backgroundColor:"bg-[#ECB159]",backgroundColorHover:"".concat(""===i.trim()||i.length>250?"opacity-50 cursor-not-allowed":""),disabled:""===i.trim()||i.length>250,onClick:()=>{f(!0),t(i)}})]})]})})})})})]})})}function f(e){let{post:t,createComment:a,openCreateComment:r,setOpenCreateComment:l}=e,i=x.R8;return(0,n.jsx)("div",{className:"flex justify-center w-full",children:t&&(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)("div",{className:"w-1/5"}),(0,n.jsxs)("div",{className:"flex flex-col cursor-pointer px-4 pt-2 pb-2 mt-1 w-3/5",children:[(0,n.jsx)("h4",{className:"text-white text-2xl",children:t.title}),(0,n.jsx)("div",{className:"text-gray-300 text-sm font-light mt-4",children:t.content}),(0,n.jsxs)("div",{className:"flex items-center gap-1 bg-[#142f37] rounded-2xl w-fit px-4 mt-6",children:[(0,n.jsx)(s.Z,{className:"h-7 w-5 text-white"}),(0,n.jsx)("span",{className:"text-white text-md font-light",children:t.comments.length})]}),(0,n.jsx)("div",{className:"mt-8",children:(0,n.jsx)(m.Z,{title:i.addButtonText,onClick:()=>l(!0),backgroundColor:"border-gray-400",backgroundColorHover:"hover:border-white"})}),(0,n.jsx)("div",{className:"mt-4",children:t.comments.map((e,t)=>(0,n.jsx)("div",{children:(0,n.jsx)(o,{commentItem:e})},t))})]}),(0,n.jsx)("div",{className:"w-1/5"}),r&&(0,n.jsx)(h,{createComment:a,open:r,setOpen:l})]})})}var p=a(5142),v=a(3629),g=a(520),w=a(8271);function j(){let{id:e}=(0,p.useRouter)().query,[t,a]=(0,l.useState)(""),[s,i]=(0,l.useState)(null),[o,c]=(0,l.useState)(!1),d=e?parseInt(e,10):null,[x,m]=(0,l.useState)(!0),h=async e=>{let t=await (0,g.O)(),n=await new w.v().createComment({post_id:d,text:e,user:t});if(n.error){a(n.error.message);return}c(!1),j(d)},j=(0,l.useCallback)(async e=>{if(!e)return;let t=await new w.v().fetchPost({id:e});if(t.error){a(t.error.message);return}i(t.data),m(!1)},[]);return(0,l.useEffect)(()=>{(async()=>{j(d)})()},[j,d]),(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(r.Z,{}),x&&(0,n.jsx)(u.Z,{}),t&&(0,n.jsx)(v.Z,{error:t}),!x&&s&&(0,n.jsx)(f,{post:s,openCreateComment:o,setOpenCreateComment:c,createComment:h})]})}},1986:function(e){"use strict";e.exports=JSON.parse('{"zs":{"dialogTitle":"Error: Failed to fetch data","reloadButtonText":"Reload the page"},"l6":{"feedTitle":"Posts","createButtonText":"Create a post","noPostsText":"No posts yet"},"Fs":{"logoText":"OnlyPeers","peerIdText":"PeerId","addButtonText":"Add peerId"},"_m":{"srOnlyText":"Loading..."},"NH":{"loadingText":"Creating Comment...","dialogTitle":"Add a comment","inputLabel":"Comment","inputPlaceholder":"content","maxCharLength":"/250","cancelButtonText":"Cancel","createButtonText":"Comment"},"lO":{"loadingText":"Creating Post...","dialogTitle":"Create a post","inputTitleLabel":"Post Title","inputTitlePlaceholder":"title","inputContentLabel":"Post Content","inputContentPlacerholder":"content","maxCharLength":"/250","backButtonText":"Back to the feed","createButtonText":"Create Post"},"R8":{"addButtonText":"Add a comment"}}')}},function(e){e.O(0,[830,640,888,774,179],function(){return e(e.s=3073)}),_N_E=e.O()}]);