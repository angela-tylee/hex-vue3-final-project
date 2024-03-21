<template>
  <div class="container">
    <div class="row content bg-secondary-subtle">
      <h2>Checkout</h2>
      <div class="contact-info col-8">
        <h3>Contact Information</h3>
        <div class="my-5 row justify-content-center">
          <v-form ref="form">
            <div class="mb-3">
              <label for="email" class="form-label">Email</label>
              <v-field id="email" name="email" type="email" class="form-control"
                placeholder="請輸入 Email" rules="email|required"></v-field>
            </div>
            <div class="mb-3">
              <label for="name" class="form-label">收件人姓名</label>
              <v-field id="name" name="姓名" type="text" class="form-control"
                placeholder="請輸入姓名" rules="required"></v-field>
            </div>
            <div class="mb-3">
              <label for="tel" class="form-label">收件人電話</label>
              <v-field id="tel" name="電話" type="text" class="form-control"
                placeholder="請輸入電話" rules="required|min:8|max:10"></v-field>
            </div>
            <div class="mb-3">
              <label for="address" class="form-label">收件人地址</label>
              <v-field id="address" name="地址" type="text" class="form-control"
                placeholder="請輸入地址" rules="required"></v-field>
            </div>
            <div class="mb-3">
              <label for="message" class="form-label">留言</label>
              <textarea id="message" class="form-control" cols="30" rows="10"></textarea>
            </div>
            <div class="text-end">
              <button type="submit" class="btn btn-primary">送出訂單</button>
            </div>
          </v-form>
        </div>
      </div>
      <div class="order-info col-4">
        <h3>Order Detail</h3>
        <div class="order-detail">
          <div class="row row-cols-2">
            <div class="col-6 mt-4">Total Quantity:</div>
            <div class="col-6 mt-4 text-end"></div>
            <div class="col-6 mt-4">Subtotal:</div>
            <div class="col-6 mt-4 text-end"></div>
            <div class="col-6 mt-4 fs-5 fw-semibold">Total:</div>
            <div class="col-6 mt-4 text-end fs-5 fw-semibold">
              $ price</div>
          </div>
        </div>
      </div>
    </div>
    <!-- <div class="my-5 row justify-content-center">
        <v-form ref="form" class="col-md-6" v-slot="{ errors }" @submit="createOrder">
          <div class="mb-3">
            <label for="email" class="form-label">Email</label>
            <v-field id="email" name="email" type="email" class="form-control"
            :class="{'is-invalid': errors['email'] }"
              placeholder="請輸入 Email" rules="email|required" v-model="form.user.email"></v-field>
            <error-message name="email" class="invalid-feedback"></error-message>
          </div>
          <div class="mb-3">
            <label for="name" class="form-label">收件人姓名</label>
            <v-field id="name" name="姓名" type="text" class="form-control"
            :class="{'is-invalid': errors['姓名'] }"
              placeholder="請輸入姓名" rules="required" v-model="form.user.name"></v-field>
            <error-message name="姓名" class="invalid-feedback"></error-message>
          </div>
          <div class="mb-3">
            <label for="tel" class="form-label">收件人電話</label>
            <v-field id="tel" name="電話" type="text" class="form-control"
            :class="{'is-invalid': errors['電話'] }"
              placeholder="請輸入電話" rules="required|min:8|max:10" v-model="form.user.tel"></v-field>
            <error-message name="電話" class="invalid-feedback"></error-message>
          </div>
          <div class="mb-3">
            <label for="address" class="form-label">收件人地址</label>
            <v-field id="address" name="地址" type="text" class="form-control"
            :class="{'is-invalid': errors['地址'] }"
              placeholder="請輸入地址" rules="required" v-model="form.user.address"></v-field>
            <error-message name="地址" class="invalid-feedback"></error-message>
          </div>
          <div class="mb-3">
            <label for="message" class="form-label">留言</label>
            <textarea id="message" class="form-control" cols="30" rows="10"
            v-model="form.message"></textarea>
          </div>
          <div class="text-end">
            <button type="submit" class="btn btn-danger">送出訂單</button>
          </div>
        </v-form>
      </div> -->
  </div>
  <RouterView></RouterView>
</template>

<script>

</script>

<style scoped>

.container {
    margin-block: 5em;
}

.content {
  padding: 2em;
  border-radius: 20px;
}

.contact-info {
  padding-right: 4em;
  h3 {
    margin-top: 1em;
  }
}

.order-info {
  h3 {
    margin-top: 1em;
  }
}

.order-detail {
  border: solid 1px;
  border-radius: 10px;
  padding: 2em;
}
</style>
