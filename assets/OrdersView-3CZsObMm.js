import{a as h}from"./axios-G2rPRu76.js";import{_ as u,c as o,a as t,F as n,f as c,b as _,d as r,o as l,t as s,r as p}from"./index-NdFvjf0J.js";var m={VITE_API_URL:"https://ec-course-api.hexschool.io/v2",VITE_API_PATH:"angelalee",BASE_URL:"/hex-vue3-final-project/",MODE:"production",DEV:!1,PROD:!0,SSR:!1};const{VITE_API_URL:x,VITE_API_PATH:f}=m,w={data(){return{orders:{},status:{addCartLoading:"",cartQtyLoading:""},form:{user:{name:"",email:"",tel:"",address:""},message:""}}},methods:{getOrder(){h.get(`${x}/api/${f}/admin/orders`).then(a=>{this.orders=a.data.orders}).catch(a=>{alert(a.response.data.message)})}},mounted(){this.getOrder(),console.log(this.orders)}},g={class:"row py-3"},V=t("h2",null,"訂單列表",-1),E={class:"table table-hover mt-4"},v=t("thead",null,[t("tr",null,[t("th",{width:"120px"},"訂單編號"),t("th",{width:"150px"},"品項"),t("th",{width:"50px"},"數量"),t("th",{width:"50px"},"金額"),t("th",{width:"100px"},"姓名"),t("th",{width:"120px"},"Email"),t("th",{width:"120px"},"電話"),t("th",{width:"150px"},"地址"),t("th",{width:"100px"},"編輯")])],-1),I=t("td",null,null,-1),A=t("p",null,[r("目前有 "),t("span"),r(" 項產品")],-1);function P(a,R,T,L,d,b){const i=p("RouterView");return l(),o(n,null,[t("div",g,[t("div",null,[V,t("table",E,[v,t("tbody",null,[(l(!0),o(n,null,c(d.orders,e=>(l(),o("tr",{key:e.id},[t("td",null,s(e.id),1),t("td",null,s(e.total),1),t("td",null,s(e.user.name),1),t("td",null,s(e.user.email),1),t("td",null,s(e.user.tel),1),t("td",null,s(e.user.address),1),I]))),128))])]),A])]),_(i)],64)}const $=u(w,[["render",P]]);export{$ as default};