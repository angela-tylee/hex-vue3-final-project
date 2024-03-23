<template>
  <div class="row py-3">
    <div>
      <h2>文章列表</h2>
      <div class="btn-group mt-3">
        <button type="button" class="btn btn-primary btn-sm"
        @click="openModal('new', blog)">
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
                @click="openModal('edit', blog)">
                編輯
                </button>
                <button type="button" class="btn btn-outline-danger btn-sm"
                @click="openModal('delete', blog)">
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
                <div>
                  <button class="btn btn-outline-primary btn-sm d-block w-100 mt-3"
                  @click="createImages">
                    新增圖片
                  </button>
                </div>
                <div>
                  <button class="btn btn-outline-danger btn-sm d-block w-100 mt-3"
                  @click="delImages">
                    刪除圖片
                  </button>
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
                    :true-value="1" :false-value="0"
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
        // title: '',
        // description: '',
        // image: '',
        // tag: [],
        // create_at: '',
        // author: '',
        // isPublic: false,
        // content: '',
      },
      isNew: false,
    };
  },
  methods: {
    getArticle() {
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
    openArticle(item) {
      this.temp = item;
    },
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
          this.getArticle();
        })
        .catch((error) => {
          alert(error.message);
          console.log(this.temp);
          // alert(error.data.message);
        });
    },
    openModal(isNew, item) {
      if (isNew === 'new') {
        this.temp = {
          imagesUrl: [],
        };
        this.isNew = true;
        articleModal.show();
      } else if (isNew === 'edit') {
        this.temp = { ...item };
        // 以展開 (spread) 進行淺拷貝（shallow copy)
        this.isNew = false;
        articleModal.show();
      } else if (isNew === 'delete') {
        this.temp = { ...item };
        // 以展開 (spread) 進行淺拷貝（shallow copy)
        delArticleModal.show();
      }
    },
    delArticle() {
      const url = `${VITE_API_URL}/api/${VITE_API_PATH}/admin/article/${this.temp.id}`;

      axios.delete(url)
        .then((response) => {
          alert(response.data.message);
          delArticleModal.hide();
          this.getArticle();
        })
        .catch((error) => {
          alert(error.data.message);
        });
    },
    createArticle() {
      const blog = {
        title: '探索法式鹹派的美味歷史',
        description: '法式鹹派以其酥脆的麵皮和滑嫩的蛋奶餡料，征服了世界各地美食愛好者的心和味蕾。這道美味佳餚有著數百年的悠久歷史，起源深遠，讓我們一同踏上烹飪之旅，探索鹹派的起源、演變和持久魅力。',
        image: '',
        tag: [],
        create_at: 1555459220,
        author: 'angela',
        isPublic: true,
        content:
        '<h3>鹹派的起源：</h3><p>鹹派的根源可以追溯到中世紀的德國，當時洛林王國（今日的洛林）的烘焙師傅創造了一種名為“庫琴（kuchen）”的鹹派。這種早期版本的鹹派由麵皮製成，填入蛋、奶油和當地的食材，如蔬菜、肉類和奶酪。</p><h3>法國的演變：</h3><p>鹹派在16世紀時開始在法國流行起來，成為洛林地區的一道標誌性菜餚。鹹派經過進一步的改良，添加了培根、洋蔥和格呂耶爾奶酪等食材。鹹派這個名詞本身來源於德語詞彙“kuchen”，意為蛋糕，在洛林方言中演變成“kische”，最終進入法國烹飪詞彙成為“quiche”。</p><p>鹹派開始與法國烹飪文化聯繫在一起，成為貴族和皇室豪華宴會上的必備佳餚。然而，直到19世紀，鹹派才在洛林以外地區廣受歡迎。烹飪食譜的出版以及巴黎咖啡館和小酒館的增加，推動著鹹派走向了烹飪的舞台，使其成為了法國乃至全世界喜愛的菜餚。</p><h3>全吸引力：</h3><p>在20世紀，鹹派在法國以外的地區迅速流行開來，其中一部分歸功於美國偶像廚師茱莉亞·克萊（Julia Child），她將法國烹飪技巧介紹給了全球觀眾。她的暢銷烹飪書《法國烹飪的藝術》中收錄了鹹派洛林的食譜，使數百萬家庭廚師接觸到了這道經典美食。</p><p>鹹派的多功能性和適應性進一步增加了其在全球的吸引力。從傳統的鹹派洛林到創意菜式，如菠菜、蘑菇和海鮮，鹹派已經成為了世界各地廚房的愛餐之選。</p><h3>持久的傳奇：</h3><p>如今，鹹派仍然是世界各地家庭、餐廳和咖啡館中珍愛的烹飪經典。其豐富的蛋奶餡料和酥脆的麵皮繼續著迷味蕾，帶來一種舒適和愉悅的感覺</p><p>無論是熱的還是冷的，作為主菜還是開胃菜，鹹派都體現了法國烹飪傳統的精髓，同時擁抱創新和創意。其持久的傳奇是對美食的永恆讚美，也是分享美味佳餚與親朋好友的共享歡樂。</p><p>總結，鹹派的歷史證明了其持久的吸引力和烹飪多樣性。從中世紀德國的起源到成為全球經典佳餚的地位，鹹派在世界烹飪文化中贏得了不朽的地位。所以，下次當你品嚐一口鹹派時，不僅要品味美味，還要感受這道經典佳餚背後豐富的歷史。祝您食慾大開！</p>',
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

    this.getArticle();

    articleModal = new bootstrap.Modal(document.getElementById('productModal'));
    delArticleModal = new bootstrap.Modal(document.getElementById('delProductModal'));
  },
};
</script>

<style></style>
