import{a as f}from"./axios-G2rPRu76.js";import{_ as w,c as o,a as e,b as i,w as _,F as l,f as h,g as D,v as I,n as g,h as b,e as V,r as k,o as r,d as x,t as n,p as L,i as P}from"./index-NdFvjf0J.js";var E={VITE_API_URL:"https://ec-course-api.hexschool.io/v2",VITE_API_PATH:"angelalee",BASE_URL:"/hex-vue3-final-project/",MODE:"production",DEV:!1,PROD:!0,SSR:!1};const{VITE_API_URL:R,VITE_API_PATH:S}=E,A={data(){return{products:[],temp:{},pages:{},categories:["蛋糕","起司蛋糕","派 / 塔","麵包","其他"],status:{productsLoading:!1}}},watch:{"$route.query":{handler(){this.getData()},deep:!0}},methods:{getData(a=1){const{category:d=""}=this.$route.query,m=`${R}/api/${S}/products?category=${d}&page=${a}`;this.status.productsLoading=!0,f.get(m).then(c=>{this.status.productsLoading=!1,this.products=c.data.products,this.pages=c.data.pagination}).catch(c=>{alert(c.response.data.message)})}},mounted(){this.getData();const a=document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/,"$1");f.defaults.headers.common.Authorization=a}},v=a=>(L("data-v-1eeb1d93"),a=a(),P(),a),C=v(()=>e("div",{class:"hero-img"},null,-1)),T={class:"container"},$=V('<nav aria-label="breadcrumb" data-v-1eeb1d93><ol class="breadcrumb" data-v-1eeb1d93><li class="breadcrumb-item" data-v-1eeb1d93><a href="#" data-v-1eeb1d93>Home</a></li><li class="breadcrumb-item" data-v-1eeb1d93><a href="#" data-v-1eeb1d93>Library</a></li><li class="breadcrumb-item active" aria-current="page" data-v-1eeb1d93>Data</li></ol></nav>',1),N={class:"row row-cols-2"},B={class:"col-3 category"},O={class:"accordion border border-bottom border-top-0 border-start-0 border-end-0 mb-3",id:"accordionExample"},U={class:"card border-0"},H=v(()=>e("div",{class:"card-header px-0 py-4 bg-white border border-bottom-0 border-top border-start-0 border-end-0 rounded-0",id:"headingOne","data-bs-toggle":"collapse","data-bs-target":"#collapseOne"},[e("div",{class:"d-flex justify-content-between align-items-center pe-1"},[e("h4",{class:"mb-0"}," Category ")])],-1)),j={class:"list-unstyled"},q={class:"col-9"},z={class:"loading"},F=v(()=>e("div",{class:"spinner-border text-primary",role:"status"},null,-1)),M=[F],G={class:"product-list"},J=["src"],K={"aria-label":"Page navigation example"},Q={class:"pagination"},W=["onClick"];function X(a,d,m,c,s,u){const p=k("RouterLink"),y=k("RouterView");return r(),o(l,null,[C,e("div",T,[$,e("div",N,[e("div",B,[e("div",O,[e("div",U,[H,e("div",null,[e("div",null,[e("ul",j,[e("li",null,[i(p,{to:"/products",class:"py-2 d-block text-muted"},{default:_(()=>[x("全部")]),_:1})]),(r(!0),o(l,null,h(s.categories,t=>(r(),o("li",{key:t},[i(p,{to:`/products?category=${t}`,class:"py-2 d-block text-muted"},{default:_(()=>[x(n(t),1)]),_:2},1032,["to"])]))),128))])])])])])]),e("div",q,[D(e("div",z,M,512),[[I,s.status.productsLoading]]),e("div",G,[(r(!0),o(l,null,h(s.products,t=>(r(),o("div",{class:"product-card border-cus-cream",key:t.id},[e("img",{src:t.imageUrl,alt:"product-img"},null,8,J),i(p,{to:`/product/${t.id}`},{default:_(()=>[e("h3",null,n(t.title),1)]),_:2},1032,["to"]),e("span",null,"$"+n(t.price),1)]))),128))]),e("nav",K,[e("ul",Q,[e("li",{class:g(["page-item",{disabled:!s.pages.has_pre}])},[e("a",{class:"page-link",href:"#",onClick:d[0]||(d[0]=b(t=>u.getData(s.pages.current_page-1),["prevent"]))}," Previous")],2),(r(!0),o(l,null,h(s.pages.total_pages,t=>(r(),o("li",{class:g(["page-item",{active:t===s.pages.current_page}]),key:t+123},[e("a",{class:"page-link",href:"#",onClick:b(Y=>u.getData(t),["prevent"])},n(t),9,W)],2))),128)),e("li",{class:g(["page-item",{disabled:!s.pages.has_next}])},[e("a",{class:"page-link",href:"#",onClick:d[1]||(d[1]=b(t=>u.getData(s.pages.current_page+1),["prevent"]))}," Next")],2)])])])])]),i(y)],64)}const te=w(A,[["render",X],["__scopeId","data-v-1eeb1d93"]]);export{te as default};