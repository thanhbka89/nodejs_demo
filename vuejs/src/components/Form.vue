<template>
  <div>
    <h1>{{ price }}</h1>
    <button @click="clicking()">Change Value</button>
    <hr>
    <div class="form-group">
      <input
        type="text"
        v-model.lazy="message"
        class="form-control"
        placeholder="Nhập cái gì đó vào đây đi ông bạn!"
      >
      <textarea
        v-model="message"
        class="form-control"
        placeholder="Nhập cái gì đó vào đây đi ông bạn!"
        rows="5"
        cols="70"
      ></textarea>
    </div>
    <p>Mesage = {{ message }}</p>
    <input type="checkbox" v-model="checked1">
    <label>{{ checked1 }}</label>
    <hr>
    <input type="checkbox" id="php" value="PHP" v-model="checked">
    <label for="php">PHP</label>
    <input type="checkbox" id="js" value="JS" v-model="checked">
    <label for="js">JS</label>
    <input type="checkbox" id="nodejs" value="Node.js" v-model="checked">
    <label for="nodejs">Node.js</label>
    <p>Các input đã check: {{ checked }}</p>
    <hr>
    <input type="radio" id="php" name="language" value="PHP" v-model="rad_checked">
    <label for="php">PHP</label>
    <input type="radio" id="js" name="language" value="JS" v-model="rad_checked">
    <label for="js">JS</label>
    <input type="radio" id="nodejs" name="language" value="Node.js" v-model="rad_checked">
    <label for="nodejs">Node.js</label>
    <p>Radio đã check: {{ rad_checked }}</p>
    <hr>
    <select name="language" v-model="selected">
      <option value disabled="true" selected>Chọn...</option>
      <option value="PHP">PHP</option>
      <option value="JS">JS</option>
      <option value="Node.js">Node.js</option>
      <option value="Vue.js">Vue.js</option>
    </select>
    <p>Select đã chọn: {{ selected }}</p>
    <hr />
    <select name="language" v-model="mul_selected" multiple>
        <option value="" disabled="true" selected>Chọn...</option>
        <option value="PHP">PHP</option>
        <option value="JS">JS</option>
        <option value="Node.js">Node.js</option>
        <option value="Vue.js">Vue.js</option>
    </select>
    <p>Select đã chọn: {{ mul_selected }}</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      price: 200,
      message: null,
      checked1: false,
      checked: [],
      rad_checked: null,
      selected: '',
      mul_selected: []
    };
  },
  methods: {
    clicking() {
      this.price = this.price + 100;
    }
  }
};
</script>