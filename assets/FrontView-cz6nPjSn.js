import{_ as m,c as g,a as e,b as t,w as s,n as x,d as c,r as u,o as f,e as a,p as h,f as v}from"./index-1cuggUX2.js";const k="/hex-vue3-final-project/assets/logo-cream-Nt2ZYj0U.png",C={data(){return{isMenuOpen:!1}},methods:{toggleMenu(){this.isMenuOpen=!this.isMenuOpen}}},l=i=>(h("data-v-8b4d1281"),i=i(),v(),i),b={class:"wrapper"},M={class:"bg-primary"},w={class:"logo"},V=l(()=>e("img",{src:k,alt:"logo"},null,-1)),y={class:"nav-list"},O=l(()=>e("i",{class:"bi bi-cart-fill text-cus-cream",style:{"font-size":"20px"}},null,-1)),B=l(()=>e("i",{class:"bi bi-list text-cus-cream"},null,-1)),I=[B],N={class:"bg-primary"},R={class:"container footer-content text-cus-cream"},S={class:"footer-nav"},j=l(()=>e("span",{class:"text-cus-cream"},"copyright@angelalee",-1)),z=l(()=>e("p",{class:"text-cus-cream"},"僅供學習使用，非商業用途",-1));function L(i,r,D,E,d,n){const o=u("RouterLink"),_=u("RouterView");return f(),g("div",b,[e("div",null,[e("header",M,[e("span",w,[t(o,{to:"/"},{default:s(()=>[V]),_:1})]),e("nav",{class:x(["nav-bar",{active:d.isMenuOpen}])},[e("ul",y,[e("li",null,[t(o,{to:"/",class:"text-cus-cream text-decoration-none",onClick:c(n.toggleMenu,["prevent"])},{default:s(()=>[a(" Home")]),_:1},8,["onClick"])]),e("li",null,[t(o,{to:"/products",class:"text-cus-cream text-decoration-none",onClick:c(n.toggleMenu,["prevent"])},{default:s(()=>[a(" Desserts")]),_:1},8,["onClick"])]),e("li",null,[t(o,{to:"/blogs",class:"text-cus-cream text-decoration-none",onClick:c(n.toggleMenu,["prevent"])},{default:s(()=>[a(" Blog")]),_:1},8,["onClick"])]),e("li",null,[t(o,{to:"/about",class:"text-cus-cream text-decoration-none",onClick:c(n.toggleMenu,["prevent"])},{default:s(()=>[a(" Our Story")]),_:1},8,["onClick"])])]),e("ul",null,[e("li",null,[t(o,{to:"/cart",class:"text-cus-cream text-decoration-none",onClick:c(n.toggleMenu,["prevent"])},{default:s(()=>[O]),_:1},8,["onClick"])])])],2),e("div",{class:"mobile-menu",onClick:r[0]||(r[0]=c((...p)=>n.toggleMenu&&n.toggleMenu(...p),["prevent"]))},I)]),t(_)]),e("footer",N,[e("div",R,[e("div",S,[t(o,{to:"/log-in",class:"text-cus-cream text-decoration-none"},{default:s(()=>[a(" 登入後台 | ")]),_:1}),t(o,{to:"/admin/products",class:"text-cus-cream text-decoration-none"},{default:s(()=>[a(" 後台頁面")]),_:1})]),j,z])])])}const H=m(C,[["render",L],["__scopeId","data-v-8b4d1281"]]);export{H as default};
