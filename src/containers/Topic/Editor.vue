<template>
  <yam-page-layout :breadcrumbs="breadcrumbs">
    <yam-section :status="pageStatus">
      <yam-form
        ref="form"
        :config="formConfig"
        v-model="content">

      </yam-form>

      <yam-footer-bar
        @submit="handleSubmit"
        @cancel="handleCancel"
      ></yam-footer-bar>

    </yam-section>
  </yam-page-layout>
</template>

<script>
/* yam mixins */
import { baseFormContainer } from '@xhs/yam-container-mixin'

/* yam components */
import {
  YamPageLayout,
  YamButton,
  YamSection,
  YamFooterBar
} from '@xhs/yam-layout'

import {
  YamForm,
  YamDatepicker
} from '@xhs/yam-form'

/* utils */

import {
  timeRangeValidation,
  maxLenValidation
} from '@xhs/yam-validations'


export default {
  name: 'MultiNoteList',

  extends: baseFormContainer({
    fetchMethod: 'fetchPageData',
    formRef: 'form'
  }),

  components: {
    YamPageLayout,
    YamButton,
    YamSection,
    YamFooterBar,
    YamForm
  },

  data: function () {
    return {
      breadcrumbs: [{
        name: '笔记列表',
        route: {
          name: 'NoteList'
        }
      }, {
        name: '笔记'
      }],

      pageId: this.$route.params.id,

      content: null
    }
  },


  computed: {
    formConfig() {
      return {
        children: [
          {
            name: 'name',
            node: {
              label: '场次名称',
              required: true
            },
            component: {
              is: 'input',
              props: {
                validation: maxLenValidation(12)
              }
            }
          },
          {
            name: 'category',
            node: {
              label: '场次分类',
              required: true
            },
            component: {
              is: 'select',
              props: {
                list: [
                  {
                    name: '类别1',
                    value: 'category1'
                  },
                  {
                    name: '类别2',
                    value: 'category2'
                  }
                ]
              }
            }
          },
          {
            name: 'startDate',
            node: {
              label: '上线时间',
              required: true
            },
            component: {
              is: YamDatepicker,
              props: {
                range: true,
                viewTimePick: true,
                isTimestamp: true,
                defaultHours: [10, 9],
                defaultMinutes: [0, 0],
                maxRange: 30,
                validation: timeRangeValidation(30)
              }
            }
          }
        ]
      }
    }
  },


  methods: {
    handleSubmit() {
      // submit() is defined on baseFormContainer, which will call postModel() automatically
      this.submit()
    },

    handleCancel() {
      // cancel() is defined on baseFormContainer, which will check dirty
      this.cancel().then(yes => {
        if (yes) {
          this.back()
        }
      })
    },

    /* ---------------------------------------- */
    back() {
      this.$router.back()
    },

    postModel() {
      // mock send data to server
      return new Promise(resolve => setTimeout(resolve, 1000))
    },

    /* ---------------------------------------- */

    fetchContent() {
      return new Promise(resolve => setTimeout(() => {
        const content = {
          name: '测试标题',
          category: 'category1'
        }

        this.content = content

        this.breadcrumbs[1].name = this.content.name
        resolve()
      }, 1000))
    },

    fetchPageData() {
      return Promise.all([
        this.fetchContent()
      ])
    }
  },
  created() {
    this.fetchPageData()
  }
}

/* DO NOT ADD ANY STYLE IN CONTAINER. CONTAINER SHOULD ONLY FOCUS ON DATA & SERVICE */
</script>

