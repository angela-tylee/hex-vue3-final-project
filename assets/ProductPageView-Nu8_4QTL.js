import{a as b,S as y}from"./sweetalert2.all-3NlZ93nL.js";import{_ as w,a as I,m as T,r as f,o as c,c as n,b as t,d as l,w as h,t as i,k as v,v as L,l as V,f as u,g as m,e as q,F as D,i as R,p as x,h as E}from"./index-DOaFCEPn.js";import{c as k}from"./cartStore-mmfBACbo.js";var U={VITE_API_URL:"https://ec-course-api.hexschool.io/v2",VITE_API_PATH:"angelalee",BASE_URL:"/hex-vue3-final-project/",MODE:"production",DEV:!1,PROD:!0,SSR:!1};const{VITE_API_URL:S,VITE_API_PATH:C}=U,A={data(){return{product:{},similarProducts:[],status:{pageLoading:!1},qty:1}},watch:{"$i18n.locale":{handler(){this.getData()},deep:!0}},methods:{getData(){const{id:e}=this.$route.params,o=`${S}/api/${C}/product/${e}`;this.status.pageLoading=!0,b.get(o).then(a=>{if(console.log(a.data.product),this.status.pageLoading=!1,this.product=a.data.product,this.$i18n.locale==="zh-TW")this.product=a.data.product;else if(this.$i18n.locale==="en"){const d=a.data.product;this.product={...d.en,id:d.id,imageUrl:d.imageUrl,price:d.price,origin_price:d.origin_price}}}).catch(a=>{this.status.pageLoading=!1,y.fire({title:a.response.data.message,confirmButtonColor:"var(--bs-danger)"})})},...I(k,["addToCart"]),changeQty(e){this.qty=e},getProducts(){const e=`${S}/api/${C}/products/all`;b.get(e).then(o=>{this.similarProducts=o.data.products}).catch(o=>{y.fire({title:o.response.data.message,confirmButtonColor:"var(--bs-danger)"})})}},computed:{...T(k,["storeStatus"]),filteredCake(){return this.similarProducts.filter(e=>e.category===this.product.category||e.en.category===this.product.category).slice(0,3)}},mounted(){this.getData(),this.getProducts()}},g=e=>(x("data-v-56b1e46d"),e=e(),E(),e),B={class:"container"},N={"aria-label":"breadcrumb"},O={class:"breadcrumb"},M={class:"breadcrumb-item"},Q={class:"breadcrumb-item"},z={class:"breadcrumb-item active","aria-current":"page"},F={class:"loading"},H=g(()=>t("div",{class:"spinner-border text-primary",role:"status"},null,-1)),W=[H],$={class:"product-grid"},j={class:"product-img"},G=["src"],J={class:"product-content"},K=g(()=>t("h5",{class:"text-primary mt-3"},"PRODUCT DESCRIPTION",-1)),X={class:"quantity-block"},Y={class:"input-group"},Z=["disabled"],tt={class:"price"},et={key:0,class:"small"},st=["disabled"],ot={key:0,class:"spinner-border text-white",style:{width:"1.2em",height:"1.2em"},role:"status"},it={class:"text-white"},rt={class:"similar-product-block"},at=g(()=>t("h2",{class:"text-left mb-5 similar-product-title"}," Similar Desserts ",-1)),ct={class:"product-cards"},nt={class:"img-container"},dt=["src"],lt={key:0,class:"mt-3 fs-20 text-center"},ut={key:1,class:"mt-3 fs-20 text-center"};function pt(e,o,a,d,s,p){const _=f("RouterLink"),P=f("RouterView");return c(),n("div",B,[t("nav",N,[t("ol",O,[t("li",M,[l(_,{to:"/"},{default:h(()=>[m(i(e.$t("header.home")),1)]),_:1})]),t("li",Q,[l(_,{to:"/products"},{default:h(()=>[m(i(e.$t("header.products")),1)]),_:1})]),t("li",z,i(s.product.title),1)])]),v(t("div",F,W,512),[[L,s.status.pageLoading]]),t("div",$,[t("div",j,[t("img",{src:s.product.imageUrl,alt:"product-img"},null,8,G)]),t("div",J,[t("div",null,[t("h2",null,i(s.product.title),1),t("span",null,i(s.product.category),1),K,t("p",null,i(s.product.description),1)]),t("div",null,[t("div",X,[t("div",Y,[t("button",{class:"btn btn-outline-secondary",type:"button",onClick:o[0]||(o[0]=r=>{s.qty--,p.changeQty(s.qty)}),disabled:s.qty===1}," - ",8,Z),v(t("input",{type:"text",class:"form-control text-center",value:"1","onUpdate:modelValue":o[1]||(o[1]=r=>s.qty=r),readonly:""},null,512),[[V,s.qty]]),t("button",{class:"btn btn-outline-secondary",type:"button",onClick:o[2]||(o[2]=r=>{s.qty++,p.changeQty(s.qty)})}," + ")]),t("span",tt,[s.product.origin_price!==s.product.price?(c(),n("del",et," $"+i(s.product.origin_price),1)):u("",!0),m(" $"+i(s.product.price),1)])]),t("button",{type:"button",class:"btn btn-primary add-to-cart",onClick:o[3]||(o[3]=q(r=>e.addToCart(s.product,s.qty),["prevent"])),disabled:e.storeStatus.addCartLoading},[e.storeStatus.addCartLoading?(c(),n("i",ot)):u("",!0),t("span",it,i(e.$t("button.add-to-cart")),1)],8,st)])])]),t("div",rt,[at,t("div",ct,[(c(!0),n(D,null,R(p.filteredCake,r=>(c(),n("div",{key:r.id},[l(_,{to:`/product/${r.id}`},{default:h(()=>[t("div",nt,[t("img",{src:r.imageUrl,alt:"blog-img"},null,8,dt)]),e.$i18n.locale==="zh-TW"?(c(),n("p",lt,i(r.title),1)):u("",!0),e.$i18n.locale==="en"?(c(),n("p",ut,i(r.en.title),1)):u("",!0)]),_:2},1032,["to"])]))),128))])]),l(P)])}const gt=w(A,[["render",pt],["__scopeId","data-v-56b1e46d"]]);export{gt as default};
