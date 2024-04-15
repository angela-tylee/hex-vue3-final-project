import{_ as C,m as b,a as k,r as p,o as g,c as h,b as e,n as m,d as a,w as n,e as i,f,t as c,g as l,p as w,h as y}from"./index-niEC8eyb.js";import{c as v}from"./cartStore-oMkksvUW.js";import"./sweetalert2.all-3NlZ93nL.js";const M="/hex-vue3-final-project/assets/logo-cream-Nt2ZYj0U.png",z={data(){return{isMenuOpen:!1,isFixed:!1}},watch:{"this.carts":{handler(){this.getCartQty()}}},computed:{...b(v,["cartQty"])},methods:{toggleMenu(){this.isMenuOpen=!this.isMenuOpen},...k(v,["getCart","getCartQty","changeCartQty"]),toggleLanguage(){this.$i18n.locale==="zh-TW"?this.$i18n.locale="en":this.$i18n.locale="zh-TW"},fixNav(){window.scrollY>0?this.isFixed=!0:this.isFixed=!1}},mounted(){this.getCart(),this.nav=this.$refs.nav,window.addEventListener("scroll",this.fixNav)}},d=t=>(w("data-v-316ac235"),t=t(),y(),t),N={class:"wrapper"},V={class:"wrapper-header"},L={class:"container header-content"},S={class:"logo"},$=d(()=>e("img",{src:M,alt:"logo"},null,-1)),F={class:"nav-list"},Q={class:"cart-icon-container"},I=["value"],O={class:"language-icon-container",style:{"font-size":"10px","text-align":"center"}},R=d(()=>e("br",null,null,-1)),T={key:0,class:"text-cus-cream"},B={key:1,class:"text-cus-cream"},E=d(()=>e("i",{class:"bi bi-list text-cus-cream"},null,-1)),W=[E],j={class:"bg-primary"},Y={class:"container footer-content text-cus-cream"},A={class:"footer-nav"},D=d(()=>e("span",{class:"text-cus-cream"},"copyright@angelalee",-1)),U={class:"text-cus-cream mb-0"};function Z(t,r,q,G,_,s){const o=p("RouterLink"),x=p("RouterView");return g(),h("div",N,[e("div",V,[e("header",{class:m(["bg-primary",{"fixed-nav":_.isFixed}]),ref:"nav"},[e("div",L,[e("span",S,[a(o,{to:"/"},{default:n(()=>[$]),_:1})]),e("nav",{class:m(["nav-bar",{active:_.isMenuOpen}])},[e("ul",F,[e("li",null,[a(o,{to:"/products",class:"text-cus-cream text-decoration-none",onClick:i(s.toggleMenu,["prevent"])},{default:n(()=>[l(c(t.$t("header.products")),1)]),_:1},8,["onClick"])]),e("li",null,[a(o,{to:"/blogs",class:"text-cus-cream text-decoration-none",onClick:i(s.toggleMenu,["prevent"])},{default:n(()=>[l(c(t.$t("header.blogs")),1)]),_:1},8,["onClick"])]),e("li",null,[a(o,{to:"/about",class:"text-cus-cream text-decoration-none",onClick:i(s.toggleMenu,["prevent"])},{default:n(()=>[l(c(t.$t("header.about")),1)]),_:1},8,["onClick"])])]),e("ul",null,[e("li",Q,[a(o,{to:"/cart",class:"text-cus-cream",onClick:i(s.toggleMenu,["prevent"])},{default:n(()=>[e("i",{class:"bi bi-cart-fill text-cus-cream cart-icon",style:{"font-size":"25px"},value:t.cartQty},null,8,I)]),_:1},8,["onClick"])]),e("div",O,[e("i",{class:"bi bi-translate text-cus-cream language-icon",style:{"font-size":"20px"},onClick:r[0]||(r[0]=(...u)=>s.toggleLanguage&&s.toggleLanguage(...u))}),R,t.$i18n.locale==="en"?(g(),h("span",T,"English")):f("",!0),t.$i18n.locale==="zh-TW"?(g(),h("span",B,"繁體中文")):f("",!0)])])],2),e("div",{class:"mobile-menu",onClick:r[1]||(r[1]=i((...u)=>s.toggleMenu&&s.toggleMenu(...u),["prevent"]))},W)])],2),a(x)]),e("footer",j,[e("div",Y,[e("div",A,[a(o,{to:"/log-in",class:"text-cus-cream text-decoration-none"},{default:n(()=>[l(c(t.$t("footer.log-in"))+" | ",1)]),_:1}),a(o,{to:"/admin/products",class:"text-cus-cream text-decoration-none"},{default:n(()=>[l(c(t.$t("footer.admin")),1)]),_:1})]),D,e("p",U,c(t.$t("footer.for-learning")),1)])])])}const P=C(z,[["render",Z],["__scopeId","data-v-316ac235"]]);export{P as default};