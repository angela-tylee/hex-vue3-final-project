import{a as n}from"./axios-G2rPRu76.js";import{_ as h,c as a,a as t,k as m,F as r,g as f,b as l,o as c,w as b,t as d,p as v,f as I,r as _}from"./index-CuQKNhZK.js";var L={VITE_API_URL:"https://ec-course-api.hexschool.io/v2",VITE_API_PATH:"angelalee",BASE_URL:"/hex-vue3-final-project/",MODE:"production",DEV:!1,PROD:!0,SSR:!1};const{VITE_API_URL:V,VITE_API_PATH:k}=L,A={data(){return{blogs:[],status:{blogsLoading:!1}}},methods:{getArticle(){this.status.blogsLoading=!0;const s=`${V}/api/${k}/articles`;n.get(s).then(e=>{this.status.blogsLoading=!1,console.log(e.data.articles),this.blogs=e.data.articles}).catch(e=>{this.status.blogsLoading=!1,alert(e.response.data.message)})}},mounted(){this.getArticle();const s=document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/,"$1");n.defaults.headers.common.Authorization=s}},u=s=>(v("data-v-cadd5e9c"),s=s(),I(),s),x={class:"container"},R=u(()=>t("h1",{class:"border-primary"},"Blog",-1)),E={key:0,class:"loading"},$=u(()=>t("div",{class:"spinner-border text-primary",role:"status"},null,-1)),P=[$],S={class:"blog-list"},T={class:"blog-card-content"},w={class:"blog-card-img"},B=["src"];function y(s,e,D,C,i,N){const p=_("RouterLink"),g=_("RouterView");return c(),a(r,null,[t("div",x,[R,i.status.blogsLoading?(c(),a("div",E,P)):m("",!0),t("div",S,[(c(!0),a(r,null,f(i.blogs,o=>(c(),a("div",{class:"blog-card border-cus-cream",key:o.id},[t("div",T,[l(p,{to:`/blog/${o.id}`},{default:b(()=>[t("h3",null,d(o.title),1)]),_:2},1032,["to"]),t("p",null,d(o.description),1)]),t("div",w,[t("img",{src:o.image,alt:"blog-img"},null,8,B)])]))),128))])]),l(g)],64)}const H=h(A,[["render",y],["__scopeId","data-v-cadd5e9c"]]);export{H as default};
