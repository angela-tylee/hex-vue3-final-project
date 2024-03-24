import{a as c}from"./axios-G2rPRu76.js";import{M as x}from"./bootstrap.esm-TTjMTX3M.js";import{_ as f,c as o,a as t,F as u,g as m,e as n,t as d,b as v,o as l,r as w}from"./index-CuQKNhZK.js";var y={VITE_API_URL:"https://ec-course-api.hexschool.io/v2",VITE_API_PATH:"angelalee",BASE_URL:"/hex-vue3-final-project/",MODE:"production",DEV:!1,PROD:!0,SSR:!1};const{VITE_API_URL:p,VITE_API_PATH:b}=y;let h="";const k={data(){return{orders:{},temp:{},isNew:!1,status:{addCartLoading:"",cartQtyLoading:""},form:{user:{name:"",email:"",tel:"",address:""},message:""}}},methods:{getOrders(){c.get(`${p}/api/${b}/admin/orders`).then(s=>{console.log(s),this.orders=s.data.orders}).catch(s=>{alert(s.response.data.message)})},openModal(s,a){s==="delete"&&(this.temp={...a},h.show())},delOrder(){const s=`${p}/api/${b}/admin/order/${this.temp.id}`;c.delete(s).then(a=>{alert(a.data.message),h.hide(),this.getOrders()}).catch(a=>{alert(a.data.message)})}},mounted(){const s=document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/,"$1");c.defaults.headers.common.Authorization=s,this.getOrders(),h=new x(document.getElementById("delProductModal"))}},P={class:"row py-3 list-container"},M=t("h2",null,"訂單列表",-1),V={class:"table table-hover mt-4"},E=t("thead",null,[t("tr",null,[t("th",{width:"120px"},"訂單編號"),t("th",{width:"100px"},"姓名"),t("th",{width:"150px"},"品項"),t("th",{width:"100px"},"金額"),t("th",{width:"120px"},"Email / 電話"),t("th",{width:"150px"},"地址"),t("th",{width:"150px"},"付款狀態"),t("th",{width:"100px"},"編輯")])],-1),O=t("br",null,null,-1),I={key:0,class:"text-success"},$={key:1,class:"text-danger"},A={class:"btn-group"},L=["onClick"],T=t("p",null,[n("目前有 "),t("span"),n(" 項產品")],-1),R={id:"delProductModal",ref:"delProductModal",class:"modal fade",tabindex:"-1","aria-labelledby":"delProductModalLabel","aria-hidden":"true"},C={class:"modal-dialog"},B={class:"modal-content border-0"},D=t("div",{class:"modal-header bg-danger text-white"},[t("h5",{id:"delProductModalLabel",class:"modal-title"},[t("span",{class:"text-white"},"刪除訂單")]),t("button",{type:"button",class:"btn-close","data-bs-dismiss":"modal","aria-label":"Close"})],-1),N={class:"modal-body"},S={class:"text-danger"},U={class:"modal-footer"},F=t("button",{type:"button",class:"btn btn-outline-secondary","data-bs-dismiss":"modal"}," 取消 ",-1);function H(s,a,j,q,_,r){const g=w("RouterView");return l(),o(u,null,[t("div",P,[t("div",null,[M,t("table",V,[E,t("tbody",null,[(l(!0),o(u,null,m(_.orders,e=>(l(),o("tr",{key:e.id},[t("td",null,d(e.id),1),t("td",null,d(e.user.name),1),t("td",null,[(l(!0),o(u,null,m(e.products,i=>(l(),o("div",{class:"text-black",key:i.id},d(i.product.title)+" x "+d(i.qty),1))),128))]),t("td",null,"$ "+d(e.total),1),t("td",null,[n(d(e.user.email),1),O,n(d(e.user.tel),1)]),t("td",null,d(e.user.address),1),e.is_paid?(l(),o("td",I,"已付款")):(l(),o("td",$,"未付款")),t("td",null,[t("div",A,[t("button",{type:"button",class:"btn btn-outline-danger btn-sm",onClick:i=>r.openModal("delete",e)}," 刪除 ",8,L)])])]))),128))])]),T])]),t("div",R,[t("div",C,[t("div",B,[D,t("div",N,[n(" 是否刪除 "),t("strong",S,d(_.temp.title),1),n(" 訂單(刪除後將無法恢復)。 ")]),t("div",U,[F,t("button",{type:"button",class:"btn btn-danger",onClick:a[0]||(a[0]=(...e)=>r.delOrder&&r.delOrder(...e))}," 確認刪除 ")])])]),n("- ")],512),v(g)],64)}const J=f(k,[["render",H]]);export{J as default};
