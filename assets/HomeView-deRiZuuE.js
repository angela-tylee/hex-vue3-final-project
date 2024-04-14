import{a as g,S as f}from"./sweetalert2.all-3NlZ93nL.js";import{_ as b,r as $,o as i,c as n,b as t,t as s,F as d,i as m,d as h,w as _,f as c,p as k,h as y}from"./index-wTFFeIzK.js";var D={VITE_API_URL:"https://ec-course-api.hexschool.io/v2",VITE_API_PATH:"angelalee",BASE_URL:"/hex-vue3-final-project/",MODE:"production",DEV:!1,PROD:!0,SSR:!1};const{VITE_API_URL:p,VITE_API_PATH:v}=D,w={data(){return{products:[],blogs:[],status:{productsLoading:!1,blogsLoading:!1}}},watch:{"$i18n.locale":{handler(){this.getData(),this.getArticle()},deep:!0}},methods:{getData(){const e=`${p}/api/${v}/products/all`;this.status.productsLoading=!0,g.get(e).then(a=>{this.status.productsLoading=!1,this.products=a.data.products}).catch(a=>{f.fire({title:a.response.data.message,confirmButtonColor:"var(--bs-danger)"})})},getArticle(){this.status.blogsLoading=!0;const e=`${p}/api/${v}/articles`;g.get(e).then(a=>{this.status.blogsLoading=!1,this.blogs=a.data.articles}).catch(a=>{this.status.blogsLoading=!1,f.fire({title:a.response.data.message,confirmButtonColor:"var(--bs-danger)"})})}},computed:{filteredCake(){return this.products.filter(e=>e.category==="起司蛋糕").slice(0,3)},filteredTart(){return this.products.filter(e=>e.category==="派 / 塔").slice(0,3)},filteredBlog(){return this.blogs.slice(0,2)}},mounted(){this.getData(),this.getArticle()}},l=e=>(k("data-v-e86b668c"),e=e(),y(),e),A={class:"hero"},B={class:"hero-content container"},L={class:"text-cus-cream"},H={class:"text-cus-cream"},I={class:"container"},T={class:"intro homepage-block"},V={class:"intro-block"},x={class:"intro-content"},M=l(()=>t("div",{class:"intro-img-container"},[t("img",{src:"https://images.unsplash.com/photo-1549590143-d5855148a9d5?q=80&w=2564&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",alt:"intro-img"})],-1)),S={class:"intro-block"},C=l(()=>t("div",{class:"intro-img-container"},[t("img",{src:"https://images.unsplash.com/photo-1588467850695-a898367ce465?q=80&w=2535&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",alt:"intro-img"})],-1)),E={class:"intro-content"},P={class:"intro-block"},R={class:"intro-content"},G=l(()=>t("div",{class:"intro-img-container"},[t("img",{src:"https://images.unsplash.com/photo-1465808883813-7d2959af2252?q=80&w=2488&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",alt:"intro-img"})],-1)),W={class:"service homepage-block"},z={class:"service-1"},U=l(()=>t("i",{class:"bi bi-calendar-check-fill",style:{"font-size":"40px"}},null,-1)),j={class:"service-2"},q=l(()=>t("i",{class:"bi bi-truck",style:{"font-size":"40px"}},null,-1)),N={class:"recommendation homepage-block block-title"},Y={class:"text-center"},F=l(()=>t("h3",{class:"mt-5"},"Cake",-1)),O={class:"recommendation-cards"},J={class:"img-container"},K=["src"],Q={key:0},X={key:1},Z=l(()=>t("h3",{class:"mt-5"},"Tart",-1)),tt={class:"recommendation-cards"},et={class:"img-container"},st=["src"],ot={key:0},it={key:1},nt={class:"blog homepage-block"},at={class:"text-center block-title"},lt={class:"blog-cards"},ct={class:"img-container"},rt=["src"],dt={key:0},ht={key:1};function _t(e,a,ut,mt,gt,u){const r=$("RouterLink");return i(),n(d,null,[t("div",A,[t("div",B,[t("h1",L,s(e.$t("home.slogan")),1),t("p",H,s(e.$t("home.subheading")),1)])]),t("div",I,[t("div",T,[t("div",V,[t("div",x,[t("h2",null,s(e.$t("home.intro-1")),1),t("p",null,s(e.$t("home.intro-content-1")),1)]),M]),t("div",S,[C,t("div",E,[t("h2",null,s(e.$t("home.intro-2")),1),t("p",null,s(e.$t("home.intro-content-2")),1)])]),t("div",P,[t("div",R,[t("h2",null,s(e.$t("home.intro-3")),1),t("p",null,s(e.$t("home.intro-content-3")),1)]),G])]),t("div",W,[t("div",z,[U,t("h3",null,s(e.$t("home.reservation")),1),t("p",null,s(e.$t("home.reservation-content")),1)]),t("div",j,[q,t("h3",null,s(e.$t("home.delivery")),1),t("p",null,s(e.$t("home.delivery-content")),1)])]),t("div",N,[t("h2",Y,[t("span",null,s(e.$t("home.recommendation")),1)]),t("div",null,[F,t("div",O,[(i(!0),n(d,null,m(u.filteredCake,o=>(i(),n("div",{key:o.id},[h(r,{to:`/product/${o.id}`},{default:_(()=>[t("div",J,[t("img",{src:o.imageUrl,alt:"product-img"},null,8,K)]),e.$i18n.locale==="zh-TW"?(i(),n("h5",Q,s(o.title),1)):c("",!0),e.$i18n.locale==="en"?(i(),n("h5",X,s(o.en.title),1)):c("",!0)]),_:2},1032,["to"])]))),128))])]),t("div",null,[Z,t("div",tt,[(i(!0),n(d,null,m(u.filteredTart,o=>(i(),n("div",{key:o.id},[h(r,{to:`/product/${o.id}`},{default:_(()=>[t("div",et,[t("img",{src:o.imageUrl,alt:"product-img"},null,8,st)]),e.$i18n.locale==="zh-TW"?(i(),n("h5",ot,s(o.title),1)):c("",!0),e.$i18n.locale==="en"?(i(),n("h5",it,s(o.en.title),1)):c("",!0)]),_:2},1032,["to"])]))),128))])])]),t("div",nt,[t("h2",at,[h(r,{to:"/blogs"},{default:_(()=>[t("span",null,s(e.$t("home.blog")),1)]),_:1})]),t("div",lt,[(i(!0),n(d,null,m(u.filteredBlog,o=>(i(),n("div",{key:o.id},[h(r,{to:`/blog/${o.id}`},{default:_(()=>[t("div",ct,[t("img",{src:o.image,alt:"blog-img"},null,8,rt)]),e.$i18n.locale==="zh-TW"?(i(),n("h5",dt,s(o.title),1)):c("",!0),e.$i18n.locale==="en"?(i(),n("h5",ht,s(o.en.title),1)):c("",!0)]),_:2},1032,["to"])]))),128))])])])],64)}const vt=b(w,[["render",_t],["__scopeId","data-v-e86b668c"]]);export{vt as default};
