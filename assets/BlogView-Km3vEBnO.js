import{a as p}from"./axios-G2rPRu76.js";import{_ as b,c as n,a as t,b as a,w as r,t as i,k as m,F as h,r as _,o as d,e as u,p as f,f as v}from"./index-tVg_qlly.js";var I={VITE_API_URL:"https://ec-course-api.hexschool.io/v2",VITE_API_PATH:"angelalee",BASE_URL:"/hex-vue3-final-project/",MODE:"production",DEV:!1,PROD:!0,SSR:!1};const{VITE_API_URL:L,VITE_API_PATH:V}=I,x={data(){return{blog:{},status:{blogLoading:!1}}},methods:{getArticle(){const{id:e}=this.$route.params,l=`${L}/api/${V}/article/${e}`;this.status.blogLoading=!0,p.get(l).then(s=>{this.status.blogLoading=!1,console.log(s),this.blog=s.data.article}).catch(s=>{this.status.blogLoading=!1,alert(s.response.data.message)})}},mounted(){this.getArticle()}},A=e=>(f("data-v-b8f5057b"),e=e(),v(),e),R={class:"container"},T={"aria-label":"breadcrumb"},E={class:"breadcrumb"},P={class:"breadcrumb-item"},S={class:"breadcrumb-item"},k={class:"breadcrumb-item active text-primary","aria-current":"page"},w={key:0,class:"loading"},B=A(()=>t("div",{class:"spinner-border text-primary",role:"status"},null,-1)),H=[B],y={class:"blog-title"},D={class:"blog-img"},N=["src"],C=["innerHTML"];function M(e,l,s,U,o,F){const c=_("RouterLink"),g=_("RouterView");return d(),n(h,null,[t("div",R,[t("nav",T,[t("ol",E,[t("li",P,[a(c,{to:"/"},{default:r(()=>[u("Home")]),_:1})]),t("li",S,[a(c,{to:"/blogs"},{default:r(()=>[u("Blog")]),_:1})]),t("li",k,i(o.blog.title),1)])]),o.status.blogLoading?(d(),n("div",w,H)):m("",!0),t("div",y,[t("h1",null,i(o.blog.title),1),t("p",null,i(o.blog.description),1)]),t("div",D,[t("img",{src:o.blog.image,alt:""},null,8,N)]),t("div",{class:"blog-content",innerHTML:o.blog.content},null,8,C)]),a(g)],64)}const j=b(x,[["render",M],["__scopeId","data-v-b8f5057b"]]);export{j as default};