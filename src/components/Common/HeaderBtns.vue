<template>
  <div class="header-btns">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'HeaderBtns'
}
</script>

<style lang="stylus" scoped>
.header-btns
  float right
  padding 14px 20px

</style>
