import{a as r}from"./axios-G2rPRu76.js";import{_,c as u,a as e,b as o,w as a,F as p,r as i,o as h,e as c,p as m,f}from"./index-PCKLP3Xs.js";const g="/hex-vue3-final-project/assets/logo-dashboard-cream-yt_dn05Q.png";var x={VITE_API_URL:"https://ec-course-api.hexschool.io/v2",VITE_API_PATH:"angelalee",BASE_URL:"/hex-vue3-final-project/",MODE:"production",DEV:!1,PROD:!0,SSR:!1};const{VITE_API_URL:b}=x,k={methods:{checkAdmin(){const s=`${b}/api/user/check`;r.post(s).then(()=>{}).catch(l=>{alert(l.response.data.message),this.$router.push("/log-in")})}},mounted(){const s=document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/,"$1");r.defaults.headers.common.Authorization=s,this.checkAdmin()}},n=s=>(m("data-v-033c1c1b"),s=s(),f(),s),v={class:"sidebar bg-cus-brown"},I=n(()=>e("span",{class:"logo-dashboard"},[e("img",{src:g,alt:"logo"})],-1)),V={class:"content"},R=n(()=>e("header",{class:"bg-cus-brown"},null,-1)),$={class:"container"},w=n(()=>e("footer",{class:"copyright"},[e("span",null,"copyright@angelalee"),e("br"),e("span",null,"僅供學習使用，非商業用途")],-1));function A(s,l,E,S,T,L){const t=i("RouterLink"),d=i("RouterView");return h(),u(p,null,[e("aside",v,[I,e("ul",null,[e("li",null,[o(t,{to:"/admin/products",class:"text-cus-cream"},{default:a(()=>[c("產品列表")]),_:1})]),e("li",null,[o(t,{to:"/admin/orders",class:"text-cus-cream"},{default:a(()=>[c("訂單列表")]),_:1})]),e("li",null,[o(t,{to:"/admin/blogs",class:"text-cus-cream"},{default:a(()=>[c("文章列表")]),_:1})]),e("li",null,[o(t,{to:"/",class:"text-cus-cream"},{default:a(()=>[c("回到前台")]),_:1})])])]),e("div",V,[R,e("div",$,[o(d)]),w])],64)}const D=_(k,[["render",A],["__scopeId","data-v-033c1c1b"]]);export{D as default};