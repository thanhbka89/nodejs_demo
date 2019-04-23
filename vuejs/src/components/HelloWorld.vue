<template>
  <div class="hello">
    <language-picker></language-picker>
    <h1>{{ msg }} - {{ propertyComputed }} - {{ test_arr() }}</h1>
    <h2>Essential Links</h2>
    <ul>
      <li>
        <a href="https://vuejs.org" target="_blank">Core Docs</a>
      </li>
      <li>
        <router-link to="/contact">Contact</router-link>
      </li>
      <li>
        <router-link to="/news">News</router-link>
      </li>
    </ul>
    <h2>Form</h2>
    <ul>
      <li>
        <router-link to="/form">Form</router-link>
      </li>
      <li>
        <router-link to="/user">FormUser</router-link>
      </li>
    </ul>
    <!-- <p>A = {{ addA() }}</p>
    <p>B = {{ addB() }}</p>-->
    <p>A = {{ propertyA }}</p>
    <p>B = {{ propertyB }}</p>
    <p>{{ propertyComputed }}</p>
    <button v-on:click="a++">Thêm 1 vào a</button>
    <button v-on:click="b++">Thêm 1 vào b</button>
    <button @click="propertyA = 100">Gán a = 100</button>
    <p @click="show('Hello world!', $event)">
      <button>TEMP</button>
      <button @click.stop="show('Hello world!', $event)">Show MSG</button>
      </p>
  </div>
</template>

<script>
import languagePicker from "./languagePicker.vue";

export default {
  name: "HelloWorld",
  beforeCreate() {
    console.log("Không ai chạy trước mình đâu!");
  },
  data() {
    return {
      msg: "Welcome to Your Vue.js App",
      property: "Blank",
      a: 2,
      b: 0
    };
  },
  computed: {
    propertyComputed() {
      console.log("Thay đổi khi this.property thay đổi");
      return this.property;
    },
    propertyA: {
      get: function() {
        console.log("GET thuộc tính A");
        return this.a;
      },
      set: function(number) {
        console.log("SET thuộc tính A");
        this.a = number;
      }
    },
    propertyB: function() {
      console.log("Tính toán thuộc tính B");
      return this.b;
    }
  },
  created() {
    // set data to localStorage
    localStorage.setItem("username", "thanhnm" + new Date());
    console.log("Set item in localStorage!");

    this.property = "Giá trị property mới";
    console.log("propertyComputed sẽ update vì this.property đã thay đổi");
  },
  mounted() {
    console.log(this.$el.textContent); // text here
    this.m_test();
    console.log('####', this.propertyComputed);
     console.log('%%%', this.$data);
  },
  methods: {
    m_test() {
      console.log("Running...");
    },
    test_arr: () => console.log("Arrow function"),

    addA: function() {
      console.log("Gọi phương thức addA");
      return this.a;
    },
    addB: function() {
      console.log("Gọi phương thức addB");
      return this.b;
    },
    show: function(msg, event) {
      if (event){
        console.log(event);
        // event.stopPropagation();
        // event.preventDefault();
      }
      console.log('CALL METHOD', msg);
    }
  },
  watch: {
    a : function(newVal, oldVal) {
      console.log('WATCHED : ',oldVal, newVal, this.a)
    }
  },
  components: {
    languagePicker
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
h1,
h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
  li {
    display: inline-block;
    margin: 0 10px;
  }
}

a {
  color: #42b983;
}
</style>
