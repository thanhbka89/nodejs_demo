
<template>
  <div class="vsm-dropdown">
    <button>{{ $t('language_picker_helper') }}</button>
    <div class="vsm-dropdown-content">
      <a
        v-for="(lang, index) in languages"
        :key="`lang${index}`"
        v-on:click="changeLanguage(lang)"
      >{{ lang.title }}</a>
    </div>
  </div>
</template>
<script>
export default {
  name: "LanguagePicker",
  data() {
    return {
      languages: [
        {
          title: this.$t("languages.vietnam"),
          value: "vi"
        },
        {
          title: this.$t("languages.english"),
          value: "en"
        },
        {
          title: this.$t("languages.norwegian"),
          value: "nb"
        }
      ]
    };
  },
  methods: {
    changeLanguage(lang) {
      debugger
      this.$i18n.locale = lang.value;
      this.$store.dispatch("language/setLanguage", lang.value);
    }
  }
};
</script>
<style lang="scss" scoped>
.vsm-dropdown {
  float: right;
  overflow: hidden;
  .dropbtn {
    font-size: 16px;
    border: none;
    outline: none;
    color: white;
    padding: 14px 16px;
    background-color: inherit;
    font-family: inherit;
    margin: 0;
  }
}

.vsm-dropdown-content {
  display: none;
  position: absolute;
  background-color: #f9f9f9;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
  a {
    float: none;
    color: black;
    padding: 12px 16px;
    text-decoration: none;
    display: block;
    text-align: left;
  }
  a:hover {
    background-color: #ddd;
  }
}

.vsm-dropdown:hover .vsm-dropdown-content {
  display: block;
}
</style>