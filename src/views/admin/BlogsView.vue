<template>
  <div class="row py-3">
    <div>
      <h2>文章列表</h2>
      <div class="btn-group mt-3">
        <button type="button" class="btn btn-primary btn-sm"
        @click="openModal('new')">
        新增文章
        </button>
      </div>
      <table class="table table-hover mt-4">
        <thead>
          <tr>
            <th width="120px">標題</th>
            <th width="150px">ID</th>
            <th width="120px">是否發佈</th>
            <th width="120px">編輯</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="blog in blogs" :key="blog.id">
            <td>{{ blog.title }}</td>
            <td>{{ blog.id }}</td>
            <td>
              <span class="text-success" v-if="blog.isPublic">已發佈</span>
              <span v-else>未發佈</span>
            </td>
            <td>
              <div class="btn-group">
                <button type="button" class="btn btn-outline-primary btn-sm"
                @click="openModal('edit', blog.id)">
                編輯
                </button>
                <button type="button" class="btn btn-outline-danger btn-sm"
                @click="openModal('delete', blog.id)">
                刪除
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <p>目前有 <span>{{ blogs.length }}</span> 篇文章</p>
    </div>
  </div>

    <!-- Modal -->
    <!-- editProductModal -->
    <div id="productModal" ref="productModal" class="modal fade"
  tabindex="-1" aria-labelledby="productModalLabel"
      aria-hidden="true">
      <div class="modal-dialog modal-xl">
        <div class="modal-content border-0">
          <div class="modal-header bg-dark text-white">
            <h5 id="productModalLabel" class="modal-title">
              <span class="text-white">編輯文章</span>
            </h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal"
            aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <div class="row">
              <div class="col-sm-4">
                <div class="mb-2">
                  <div class="mb-3">
                    <label for="imageUrl" class="form-label">輸入圖片網址</label>
                    <input type="text" class="form-control" placeholder="請輸入圖片連結"
                    v-model="temp.image">
                  </div>
                  <img class="img-fluid" :src="temp.image" alt="">
                </div>
              </div>
              <div class="col-sm-8">
                <div class="mb-3">
                  <label for="title" class="form-label">標題</label>
                  <input id="title" type="text" class="form-control" placeholder="請輸入標題"
                  v-model="temp.title">
                </div>

                <div class="row">
                  <div class="mb-3 col-md-6">
                    <label for="author" class="form-label">作者</label>
                    <input id="author" type="text" class="form-control" placeholder="請輸入作者"
                    v-model="temp.author">
                  </div>
                </div>

                <div class="row">
                  <div class="mb-3 col-md-12">
                    <label for="description" class="form-label">簡介</label>
                    <textarea id="description" type="text"
                    class="form-control" placeholder="請輸入簡介"
                    v-model="temp.description">
                    </textarea>
                  </div>
                </div>
                <hr>

                <div class="mb-3">
                  <label for="content" class="form-label">內容</label>
                  <textarea id="content" type="text" class="form-control" placeholder="請輸入文章內容"
                    v-model="temp.content">
                    </textarea>
                </div>
                <div class="mb-3">
                  <div class="form-check">
                    <input id="isPublic" class="form-check-input" type="checkbox"
                    :true-value="true" :false-value="false"
                      v-model="temp.isPublic">
                    <label class="form-check-label" for="isPublic">是否發布</label>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">
              取消
            </button>
            <button type="button" class="btn btn-primary" @click="updateArticle">
              確認
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- delProductModal -->
    <div id="delProductModal" ref="delProductModal" class="modal fade" tabindex="-1"
      aria-labelledby="delProductModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content border-0">
          <div class="modal-header bg-danger text-white">
            <h5 id="delProductModalLabel" class="modal-title">
              <span class="text-white">刪除產品</span>
            </h5>
            <button type="button" class="btn-close"
            data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            是否刪除
            <strong class="text-danger">{{ temp.title }}</strong> 商品(刪除後將無法恢復)。
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">
              取消
            </button>
            <button type="button" class="btn btn-danger" @click="delArticle">
              確認刪除
            </button>
          </div>
        </div>
      </div>-
    </div>
    <!-- Modal -->

  <RouterView></RouterView>
</template>

<script>
import axios from 'axios';
import * as bootstrap from 'bootstrap';

const { VITE_API_URL, VITE_API_PATH } = import.meta.env;

let articleModal = '';
let delArticleModal = '';

export default {
  data() {
    return {
      blogs: [],
      temp: {
      },
      isNew: false,
    };
  },
  methods: {
    getArticles() {
      const url = `${VITE_API_URL}/api/${VITE_API_PATH}/admin/articles`;
      axios.get(url)
        .then((response) => {
          console.log(response.data.articles);
          this.blogs = response.data.articles;
        })
        .catch((err) => {
          alert(err.response.data.message);
        });
    },
    // openArticle(item) {
    //   this.temp = item;
    // },
    getArticle(id) {
      const url = `${VITE_API_URL}/api/${VITE_API_PATH}/admin/article/${id}`;
      axios.get(url)
        .then((response) => {
          console.log(response);
          this.temp = response.data.article;
        })
        .catch((err) => {
          alert(err.response.data.message);
        });
    },
    openModal(isNew, id) {
      if (isNew === 'new') {
        this.isNew = true;
        this.temp = {
          create_at: Date.now(),
        };
        articleModal.show();
      } else if (isNew === 'edit') {
        this.getArticle(id);
        this.isNew = false;
        articleModal.show();
      } else if (isNew === 'delete') {
        delArticleModal.show();
      }
    },
    // openModal(isNew, item) {
    //   if (isNew === 'new') {
    //     this.temp = {
    //       // imagesUrl: [],
    //       content: '',
    //     };
    //     this.isNew = true;
    //     articleModal.show();
    //   } else if (isNew === 'edit') {
    //     this.temp = { ...item };
    //     // 以展開 (spread) 進行淺拷貝（shallow copy)
    //     this.isNew = false;
    //     articleModal.show();
    //   } else if (isNew === 'delete') {
    //     this.temp = { ...item };
    //     // 以展開 (spread) 進行淺拷貝（shallow copy)
    //     delArticleModal.show();
    //   }
    // },
    updateArticle() {
      let url = `${VITE_API_URL}/api/${VITE_API_PATH}/admin/article`;
      let http = 'post'; // 根據資料是否已存在會對資料做不同的操作，因此 http verb 儲存在一個可重新賦值的變數中

      // 如果這筆資料 isNew = true，則直接更新 (put)
      if (!this.isNew) {
        url = `${VITE_API_URL}/api/${VITE_API_PATH}/admin/article/${this.temp.id}`;
        http = 'put';
      }

      // method = 括弧記法 []，將變數 'http' 包起來，根據資料狀態動態調整操作資料的方式 （post / put)
      axios[http](url, { data: this.temp })
        .then((response) => {
          alert(response.data.message);
          console.log(response);
          articleModal.hide();
          this.getArticles();
        })
        .catch((error) => {
          alert(error.response.data.message);
          console.log(error);
          // alert(error.data.message);
        });
    },
    delArticle() {
      const url = `${VITE_API_URL}/api/${VITE_API_PATH}/admin/article/${this.temp.id}`;

      axios.delete(url)
        .then((response) => {
          alert(response.data.message);
          delArticleModal.hide();
          this.getArticles();
        })
        .catch((error) => {
          alert(error.data.message);
        });
    },
    createArticle() {
      const blog = {
        title: '成功的秘訣：打造完美的塔皮',
        description: '要打造完美的塔皮底，掌握細節至關重要。從選擇合適的材料到完美烘焙，每一個步驟都在實現塔皮完美上扮演關鍵角色。在這個指南中，我們將深入探討一些重要的技巧，幫助您提升塔皮水準，打造出酥脆、奶香、美味的塔皮底。',
        image: '',
        tag: [],
        create_at: 1555459220,
        author: 'angela',
        isPublic: true,
        content:
        '<p>踏上打造完美塔皮的旅程，就像是打開糕點大師的秘密一樣。這是一場精密和技巧的微妙舞蹈，在其中每一個成分和步驟都擁有將麵粉和奶油的簡單混合物變成卓越烹飪美味的潛力。在這個指南中，我們邀請您加入我們，探索關鍵的技巧和技巧，這將讓您能夠創造出塔皮，這是您烹飪技藝的證明。</p><h4>選用冷藏材料：</h4><p>使用冷藏的材料，尤其是牛油，是實現鬆軟、酥脆塔皮的關鍵。冷藏的牛油在烘焙過程中會釋放蒸汽，使得塔皮質地更輕盈。請確保您的牛油是從冰箱拿出來的，並將其切成小丁再加入麵糰中。</p><h4>溫柔手工處理麵糰：</h4><p>過度揉捏麵糰會導致塔皮變得硬而緊密。盡量少碰麵糰，不要過度揉捏。僅需輕輕揉捏麵糰使其結合即可。記住，目標是製作出嫩滑而細膩的底部。</p><h4>充分冷藏：</h4><p>在形成麵糰後，將其休息並放入冰箱冷藏是非常重要的。這一步能讓麵糰的筋力得到放鬆，牛油變得更硬，使得麵糰更易處理，塔皮更鬆脆。在擠壓麵糰前，請至少冷藏 30 分鐘。</p><h4>適度撒粉：</h4><p>在擠壓麵糰時，只需使用足夠的麵粉防止黏附即可。過多的麵粉會使麵糰變得更硬，所以要輕手輕腳，麵糰表面輕輕撒上一層薄麵粉。您也可以使用矽膠烘焙墊或烘焙紙防止黏附而不需過多麵粉。</p><h4>盲烤獲得酥脆口感：</h4><p>對於某些撻食譜，盲烤底部是必要的，以確保它保持酥脆，尤其是在使用濕潤餡料時。進行盲烤時，請在餡料上蓋上烘焙紙或錫箔紙，填滿派餡料或乾豆，烘烤至淡金黃色。這一步可以在塔皮和餡料之間形成屏障，防止變得濕潤。</p><h4>嘗試不同的口味：</h4><p>不要害怕在塔皮底中添加創意！考慮加入一點香草提取物、柑橘皮屑或香料如肉桂或肉荳蔻，增添口味的深度。嘗試使用不同的麵粉，如全麥麵粉或杏仁粉，也可以獲得獨特而美味的效果。</p><h4>忍耐等待：</h4><p>耐心是實現塔皮完美的關鍵。在添加任何餡料之前，請讓烘焙好的塔皮完全冷卻。這確保塔皮保持酥脆的質地，不會因餡料的潮濕而變得潮濕。</p><p>有了這些技巧，您就有了成功製作完美塔皮底的利器。從冷藏材料開始，溫柔處理麵糰，掌握冷藏和盲烤的技巧，您將能夠輕鬆打造出完美的塔皮底。所以，動手準備吧，充分發揮創意，準備好讓您的味蕾每次都感動不已，享受到完美塔皮底的美味！</p>',
      };
      console.log(blog);
      // const url = `${VITE_API_URL}/api/${VITE_API_PATH}/admin/article`;
      // axios.post(url, { data: blog })
      //   .then((response) => {
      //     console.log(response);
      //   })
      //   .catch((err) => {
      //     alert(err.response.data.message);
      //   });
    },
  },
  mounted() {
    // 取出 token
    const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/, '$1');
    axios.defaults.headers.common.Authorization = token;

    this.getArticles();
    // this.createArticle();

    articleModal = new bootstrap.Modal(document.getElementById('productModal'));
    delArticleModal = new bootstrap.Modal(document.getElementById('delProductModal'));
  },
};
</script>

<style></style>
