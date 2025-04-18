(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[786],{133:(e,s,t)=>{"use strict";t.r(s),t.d(s,{default:()=>N});var a=t(5155),r=t(2115),l=t(8999),n=t(9434);let i=r.forwardRef((e,s)=>{let{className:t,...r}=e;return(0,a.jsx)("div",{ref:s,className:(0,n.cn)("rounded-lg border bg-card text-card-foreground shadow-sm",t),...r})});i.displayName="Card";let d=r.forwardRef((e,s)=>{let{className:t,...r}=e;return(0,a.jsx)("div",{ref:s,className:(0,n.cn)("flex flex-col space-y-1.5 p-6",t),...r})});d.displayName="CardHeader";let o=r.forwardRef((e,s)=>{let{className:t,...r}=e;return(0,a.jsx)("div",{ref:s,className:(0,n.cn)("text-2xl font-semibold leading-none tracking-tight",t),...r})});o.displayName="CardTitle",r.forwardRef((e,s)=>{let{className:t,...r}=e;return(0,a.jsx)("div",{ref:s,className:(0,n.cn)("text-sm text-muted-foreground",t),...r})}).displayName="CardDescription";let c=r.forwardRef((e,s)=>{let{className:t,...r}=e;return(0,a.jsx)("div",{ref:s,className:(0,n.cn)("p-6 pt-0",t),...r})});function m(e){let{className:s,...t}=e;return(0,a.jsx)("div",{className:(0,n.cn)("animate-pulse rounded-md bg-muted",s),...t})}c.displayName="CardContent",r.forwardRef((e,s)=>{let{className:t,...r}=e;return(0,a.jsx)("div",{ref:s,className:(0,n.cn)("flex items-center p-6 pt-0",t),...r})}).displayName="CardFooter";let x=(0,t(2085).F)("relative w-full rounded-lg border p-4 [&>svg~*]:pl-7 [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground",{variants:{variant:{default:"bg-background text-foreground",destructive:"border-destructive/50 text-destructive dark:border-destructive [&>svg]:text-destructive"}},defaultVariants:{variant:"default"}}),u=r.forwardRef((e,s)=>{let{className:t,variant:r,...l}=e;return(0,a.jsx)("div",{ref:s,role:"alert",className:(0,n.cn)(x({variant:r}),t),...l})});u.displayName="Alert";let f=r.forwardRef((e,s)=>{let{className:t,...r}=e;return(0,a.jsx)("h5",{ref:s,className:(0,n.cn)("mb-1 font-medium leading-none tracking-tight",t),...r})});f.displayName="AlertTitle";let h=r.forwardRef((e,s)=>{let{className:t,...r}=e;return(0,a.jsx)("div",{ref:s,className:(0,n.cn)("text-sm [&_p]:leading-relaxed",t),...r})});h.displayName="AlertDescription";let p=(0,t(157).A)("Terminal",[["polyline",{points:"4 17 10 11 4 5",key:"akl6gq"}],["line",{x1:"12",x2:"20",y1:"19",y2:"19",key:"q2wloq"}]]),j=()=>{var e,s;let t=(0,l.useSearchParams)().get("session_id"),[n,x]=(0,r.useState)(null),[j,N]=(0,r.useState)(!0),[v,g]=(0,r.useState)(null);return((0,r.useEffect)(()=>{if(!t){g("No session ID found in URL."),N(!1);return}(async()=>{N(!0),g(null);try{let e=await fetch("/api/confirmation-details?session_id=".concat(t));if(!e.ok){let s=await e.json();throw Error(s.error||"Failed to fetch details: ".concat(e.statusText))}let s=await e.json();x(s)}catch(e){console.error("Error fetching confirmation details:",e),g(e instanceof Error?e.message:"An unknown error occurred.")}finally{N(!1)}})()},[t]),j)?(0,a.jsxs)("div",{className:"max-w-md mx-auto py-10",children:[(0,a.jsx)("h1",{className:"text-2xl font-bold mb-5 text-slate-gray",children:"Booking Confirmation"}),(0,a.jsxs)(i,{children:[(0,a.jsx)(d,{children:(0,a.jsx)(m,{className:"h-6 w-3/4"})}),(0,a.jsxs)(c,{className:"space-y-3",children:[(0,a.jsx)(m,{className:"h-4 w-full"}),(0,a.jsx)(m,{className:"h-4 w-full"}),(0,a.jsx)(m,{className:"h-4 w-full"}),(0,a.jsx)(m,{className:"h-4 w-1/2"}),(0,a.jsx)(m,{className:"h-6 w-full mt-4 bg-green-100"})]})]})]}):v?(0,a.jsxs)("div",{className:"max-w-md mx-auto py-10",children:[(0,a.jsx)("h1",{className:"text-2xl font-bold mb-5 text-destructive",children:"Booking Confirmation Error"}),(0,a.jsxs)(u,{variant:"destructive",children:[(0,a.jsx)(p,{className:"h-4 w-4"}),(0,a.jsx)(f,{children:"Error"}),(0,a.jsx)(h,{children:v})]})]}):n&&"paid"===n.paymentStatus?(0,a.jsxs)("div",{className:"max-w-md mx-auto py-10",children:[(0,a.jsx)("h1",{className:"text-2xl font-bold mb-5 text-slate-gray",children:"Booking Confirmation"}),(0,a.jsxs)(i,{children:[(0,a.jsx)(d,{children:(0,a.jsx)(o,{children:"Reservation Details"})}),(0,a.jsxs)(c,{className:"space-y-2 text-sm text-slate-gray",children:[(0,a.jsxs)("p",{children:[(0,a.jsx)("span",{className:"font-semibold",children:"Entry Date:"})," ",n.entryDate||"N/A"]}),(0,a.jsxs)("p",{children:[(0,a.jsx)("span",{className:"font-semibold",children:"Exit Date:"})," ",n.exitDate||"N/A"]}),(0,a.jsxs)("p",{children:[(0,a.jsx)("span",{className:"font-semibold",children:"Duration:"})," ",n.duration||"N/A"," days"]}),(0,a.jsxs)("p",{children:[(0,a.jsx)("span",{className:"font-semibold",children:"Total Price:"})," $",null!==(s=null===(e=n.totalPrice)||void 0===e?void 0:e.toFixed(2))&&void 0!==s?s:"N/A"," ",n.currency.toUpperCase()]}),(0,a.jsxs)("p",{children:[(0,a.jsx)("span",{className:"font-semibold",children:"License Plate:"})," ",n.licensePlate||"N/A"]}),(0,a.jsxs)("p",{children:[(0,a.jsx)("span",{className:"font-semibold",children:"Truck Number:"})," ",n.truckNumber||"N/A"]}),(0,a.jsx)("p",{className:"text-sage-green font-semibold pt-4",children:"Payment Successful!"})]})]})]}):(0,a.jsxs)("div",{className:"max-w-md mx-auto py-10",children:[(0,a.jsx)("h1",{className:"text-2xl font-bold mb-5 text-slate-gray",children:"Booking Confirmation"}),(0,a.jsxs)(u,{variant:"destructive",children:[(0,a.jsx)(p,{className:"h-4 w-4"}),(0,a.jsx)(f,{children:"Payment Not Completed"}),(0,a.jsx)(h,{children:"The payment for this session was not successful or the details could not be retrieved. Please try booking again or contact support."})]})]})};function N(){return(0,a.jsx)(r.Suspense,{fallback:(0,a.jsx)("p",{children:"Loading confirmation..."}),children:(0,a.jsx)(j,{})})}},3863:(e,s,t)=>{Promise.resolve().then(t.bind(t,133))},9434:(e,s,t)=>{"use strict";t.d(s,{cn:()=>l});var a=t(2596),r=t(9688);function l(){for(var e=arguments.length,s=Array(e),t=0;t<e;t++)s[t]=arguments[t];return(0,r.QP)((0,a.$)(s))}}},e=>{var s=s=>e(e.s=s);e.O(0,[511,441,684,358],()=>s(3863)),_N_E=e.O()}]);