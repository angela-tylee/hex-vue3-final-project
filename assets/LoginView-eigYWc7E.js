import{a as c}from"./axios-G2rPRu76.js";import{_ as m,c as u,a as e,e as p,f as l,v as d,F as _,o as f}from"./index-gzJBYdi-.js";var h={VITE_API_URL:"https://ec-course-api.hexschool.io/v2",VITE_API_NAME:"angelalee",BASE_URL:"/hex-vue3-final-project/",MODE:"production",DEV:!1,PROD:!0,SSR:!1};const{VITE_API_URL:w}=h,g={data(){return{user:{username:"",password:""}}},methods:{login(){const n=`${w}/admin/signin`;c.post(n,this.user).then(s=>{const{token:r,expired:a}=s.data;document.cookie=`hexToken=${r}; expires=${new Date(a)}; path=/`,this.$router.push("/admin/products")}).catch(s=>{alert(s.data.message)})}}},v=e("h2",null,"登入頁面",-1),x={class:"container"},b={class:"row justify-content-center"},E=e("h1",{class:"h3 mb-3 font-weight-normal"}," 請先登入 ",-1),V={class:"col-8"},I={class:"form-floating mb-3"},P=e("label",{for:"username"},"Email address",-1),k={class:"form-floating"},y=e("label",{for:"password"},"Password",-1),A=e("button",{class:"btn btn-lg btn-primary w-100 mt-3",type:"submit"}," 登入 ",-1),D=e("p",{class:"mt-5 mb-3 text-muted"}," © 2021~∞ - 六角學院 ",-1);function R(n,s,r,a,t,i){return f(),u(_,null,[v,e("div",x,[e("div",b,[E,e("div",V,[e("form",{id:"form",class:"form-signin",onSubmit:s[2]||(s[2]=p((...o)=>i.login&&i.login(...o),["prevent"]))},[e("div",I,[l(e("input",{type:"email",class:"form-control",id:"username",placeholder:"name@example.com","onUpdate:modelValue":s[0]||(s[0]=o=>t.user.username=o),required:"",autofocus:""},null,512),[[d,t.user.username]]),P]),e("div",k,[l(e("input",{type:"password",class:"form-control",id:"password",placeholder:"Password","onUpdate:modelValue":s[1]||(s[1]=o=>t.user.password=o),required:""},null,512),[[d,t.user.password]]),y]),A],32)])]),D])],64)}const B=m(g,[["render",R]]);export{B as default};
