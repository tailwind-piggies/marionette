<template>
  <yam-modal
    :show="showModal"
    :width="'720px'"
    @confirm="handleConfirm"
    @cancel="$emit('cancel')"
  >
    <div slot="body" class="group-edit">
      <yam-form ref="form" v-model="model">
        <title
          :node="{ required: true, label: '标题' }"
          :component="{ is: 'input' }"
        >
        </title>
        <input-area
          :node="{ required: true, label: '内容' }"
          :component="{ is: 'input' }"
        >
        </input-area>
      </yam-form>
    </div>
  </yam-modal>
</template>

<script>
  import {
    YamModal
  } from '@xhs/yam-layout'

  import {
    YamInputBase,
    YamForm
  } from '@xhs/yam-form'

  export default {
    name: 'EditModal',
    extends: YamInputBase,
    components: {
      YamModal,
      YamForm
    },
    data() {
      return {
        validationList: {
          checkVolumePeople(value) {
            if (parseInt(value) == value && value >= 0) {
              return Promise.resolve()
            } else {
              return Promise.reject('请输入大于 0 的整数')
            }
          },
          checkVolumePercent(value) {
            if (typeof parseInt(value) === 'number' && value >= 0 && value <= 1) {
              return Promise.resolve()
            } else {
              return Promise.reject('请输入 0 ~ 1 之间数')
            }
          }
        }
      }
    },
    props: {
      showModal: {
        type: Boolean,
        default: false
      }
    },
    methods: {
      handleConfirm() {
        this.$refs.form.validate().then(() => {
          this.$emit('confirm', this.model)
        }).catch(() => {
          this.$alert('请检查表单')
        })
      }
    },
    created() {
    }
  }
</script>

<style lang="stylus" scoped>
  .yam-modal
    .yam-modal__content
      width 720px
  .group-edit
    width 70%
</style>
