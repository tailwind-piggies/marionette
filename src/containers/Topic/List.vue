<template>
  <yam-page-layout name="Topic List">
    <yam-section>

      <yam-button class="new-btn" action="new" @click="handleClickNew">New</yam-button>

      <yam-data-table
        :data="topics"
        :columns="columns"
        :pagination="pagination"
        @row-action="handleRowAction"
      >
      </yam-data-table>

      <edit-modal
        v-model="data"
        v-if="showModal"
        :showModal="showModal"
        @cancel="handleCancel"
        @confirm="handleConfirm"
      ></edit-modal>

    </yam-section>
  </yam-page-layout>
</template>

<script>
  import moment from 'moment'

  /* services */
  import topicServices from '../../services/topic'

  /* yam components */
  import {
    YamPageLayout,
    YamSection,
    YamDataTable,
    YamButton
  } from '@xhs/yam-layout'

  import EditModal from '../../components/Topic/EditModal'

  export default {
    name: 'List',

    components: {
      YamDataTable,
      YamSection,
      YamPageLayout,
      YamButton,
      EditModal
    },
    data() {
      return {
        data: null,
        showModal: false,
        currentTopicId: '',
        columns: [{
          title: 'Title',
          key: 'title',
        }, {
          title: 'Create time',
          key: 'createTime'
        }, {
          title: 'Actions',
          is: 'buttons',
          props: {
            buttons: [{
              text: 'Edit',
              type: 'outline',
              icon: 'trash',
              action: 'edit',
              modifier: 'primary'
            }]
          }
        }, {
          title: 'Drop',
          is: 'buttons',
          props: {
            buttons: [{
              text: 'Delete',
              type: 'outline',
              icon: 'trash',
              action: 'delete',
              modifier: 'danger',
            }]
          }
        }],
        pagination: {
          total: 100,
          pageNo: 1,
          showPerPageOptions: false
        },
        topics: [],
      }
    },

    computed: {

    },

    methods: {
      getTopics() {
        topicServices.getTopics().then(data => {
          this.topics = data.topics.map(item => {
            return {
              id: item._id,
              title: item.title,
              content: item.content,
              createTime: moment(item.createTime).format('YYYY-MM-DD hh:mm:ss')
            }
          })
        })
      },
      handleClickNew() {
        this.showModal = true
        this.data = {}
      },
      handleRowAction(type, row) {
        if (type === 'edit') {
          this.currentTopicId = row.id
          this.showModal = true
          this.data = Object.assign({}, row.content, {
            title: row.title
          })
        } else if (type === 'delete') {
          this.$confirm('Confirm delete?').then(yes => {
            if (yes) {
              topicServices.deleteTopic({
                id: row.id
              }).then(() => {
                this.currentTopicId = ''
                this.$toast('Action success.')
                this.getTopics()
              })
            }
          })
        }
      },
      handleCancel() {
        this.showModal = false
      },
      handleConfirm(value) {
        if (this.currentTopicId) {
          topicServices.putTopic({
            id: this.currentTopicId,
            title: value.title,
            content: value
          }).then(() => {
            this.currentTopicId = ''
            this.showModal = false
            this.$toast('Action success.')
            this.getTopics()
          })
        } else {
          topicServices.postTopic({
            title: value.title,
            content: value
          }).then(() => {
            this.currentTopicId = ''
            this.showModal = false
            this.$toast('Action success.')
            this.getTopics()
          })
        }
      }
    },

    created() {
      this.getTopics()
    }
  }
</script>

<style lang="stylus" scoped>
  .new-btn
    margin-bottom 20px
</style>
