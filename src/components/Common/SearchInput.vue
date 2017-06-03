<template>
  <div class="search-input">
    <input type="text"
      v-model="keyword"
      :placeholder="placeholder"
      @keyup.enter="handleSearch">
    <yam-button icon="search"
      @click="handleSearch">搜索</yam-button>
  </div>
</template>

<script>

import {
  YamButton
} from '@xhs/yam-layout'

export default {
  name: 'SearchInput',
  components: {
    YamButton
  },
  props: {
    placeholder: String
  },
  data: () => ({
    keyword: ''
  }),
  methods: {
    handleSearch() {
      this.$emit('change', this.keyword)
    }
  }
}
</script>

<style lang="stylus" scoped>
.search-input
  display inline-block
  input
    vertical-align middle
    width 360px
    height 34px
</style>
